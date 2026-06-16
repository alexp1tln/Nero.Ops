import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order, Service, User } from '../types';
import { auth, googleProvider, db } from '../lib/firebase';
import { signInWithPopup, signOut as firebaseSignOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { collection, query, where, onSnapshot, doc, setDoc, getDocs, updateDoc } from 'firebase/firestore';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

interface AppState {
  user: User | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  orders: Order[];
  placeOrder: (service: Service) => Promise<void>;
  updateOrderStatus: (orderId: string, status: Order['status']) => Promise<void>;
  loading: boolean;
  isNavHidden: boolean;
  setIsNavHidden: (hidden: boolean) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isNavHidden, setIsNavHidden] = useState(false);

  useEffect(() => {
    let unsubscribeOrders: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          name: firebaseUser.displayName || firebaseUser.phoneNumber || firebaseUser.email?.split('@')[0] || 'Пользователь',
          email: firebaseUser.email || firebaseUser.phoneNumber || '',
        });

        // Fetch orders
        const q = query(collection(db, 'orders'), where('userId', '==', firebaseUser.uid));
        unsubscribeOrders = onSnapshot(q, (snapshot) => {
          const fetchedOrders: Order[] = [];
          snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            fetchedOrders.push({
              id: docSnap.id,
              serviceId: data.serviceId,
              serviceTitle: data.serviceTitle,
              status: data.status,
              date: data.date,
            });
          });
          // Sort by date descending
          fetchedOrders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          setOrders(fetchedOrders);
          setLoading(false);
        }, (error) => {
          handleFirestoreError(error, OperationType.GET, 'orders');
          setLoading(false);
        });

      } else {
        setUser(null);
        setOrders([]);
        if (unsubscribeOrders) {
          unsubscribeOrders();
        }
        setLoading(false);
      }
    });
    return () => {
      unsubscribeAuth();
      if (unsubscribeOrders) {
        unsubscribeOrders();
      }
    };
  }, []);

  const login = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Ошибка авторизации", error);
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Ошибка выхода", error);
    }
  };
  
  const placeOrder = async (service: Service) => {
    if (!auth.currentUser) return;
    
    const orderId = Math.random().toString(36).substring(2, 9).toUpperCase();
    const newOrder = {
      serviceId: service.id,
      serviceTitle: service.title,
      status: 'pending',
      date: new Date().toISOString(),
      userId: auth.currentUser.uid,
    };

    try {
      await setDoc(doc(db, 'orders', orderId), newOrder);
      // Optional: optimistically update UI
      // But onSnapshot will handle it.
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `orders/${orderId}`);
    }
  };

  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    if (!auth.currentUser) return;
    try {
      await updateDoc(doc(db, 'orders', orderId), { status });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `orders/${orderId}`);
    }
  };

  return (
    <AppContext.Provider value={{ user, login, logout, orders, placeOrder, updateOrderStatus, loading, isNavHidden, setIsNavHidden }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
