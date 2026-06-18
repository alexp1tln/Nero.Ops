import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

// Ensure the SDK is properly configured with the Gemini API Key
// process.env.GEMINI_API_KEY must be set in your .env file
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY });

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Add JSON body parser for API requests
  app.use(express.json());

  // API routes
  app.post('/api/chat', async (req, res) => {
    try {
      const { messages, text, systemInstruction } = req.body;
      
      const contents = messages.map((msg: any) => ({
        role: msg.role === 'bot' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));
      contents.push({ role: 'user', parts: [{ text }] });

      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Transfer-Encoding', 'chunked');

      const responseStream = await ai.models.generateContentStream({
        model: 'gemini-2.5-flash',
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
        }
      });

      for await (const chunk of responseStream) {
        if (chunk.text) {
          res.write(chunk.text);
        }
      }

      res.end();
    } catch (error: any) {
      console.error('Gemini API Error:', error);
      
      let errorMessage = 'Внутренняя ошибка сервера. Возможно, проблема с доступом к Gemini API.';
      
      try {
        // Try parsing assuming error.message might be a stringified JSON (from ApiError)
        let parsed = error.message;
        if (typeof error.message === 'string' && error.message.includes('"code": 429') && error.message.includes('"status": "RESOURCE_EXHAUSTED"')) {
            errorMessage = 'Лимит бесплатных запросов к Gemini API исчерпан. Пожалуйста, подождите немного или проверьте ваш тарифный план Cloudflare/Gemini.';
        } else if (error.status === 429) {
            errorMessage = 'Лимит бесплатных запросов к Gemini API исчерпан. Пожалуйста, подождите немного.';
        } else if (typeof error.message === 'string' && error.message.includes('"code": 503') && error.message.includes('"status": "UNAVAILABLE"')) {
            errorMessage = 'Модель временно недоступна из-за высокой нагрузки. Пожалуйста, повторите попытку позже.';
        } else if (error.status === 503) {
            errorMessage = 'Модель временно недоступна из-за высокой нагрузки. Пожалуйста, перезайдите или повторите попытку позже.';
        } else if (error.message) {
            errorMessage = error.message;
            const parsedJson = JSON.parse(error.message);
            if (parsedJson?.error?.message) {
               errorMessage = parsedJson.error.message;
            }
        }
      } catch(e) {}
      
      // If headers are already sent, res.status().json() will fail.
      if (!res.headersSent) {
          res.status(500).json({ error: errorMessage });
      } else {
          res.end(`\n\n[Ошибка: ${errorMessage}]`);
      }
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
