export async function onRequestPost(context: any) {
  try {
    const { request, env } = context;
    const body = await request.json();
    const { messages, text, systemInstruction } = body;

    const apiKey = env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API Key is missing in Cloudflare deployment settings' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const contents = messages.map((msg: any) => ({
      role: msg.role === 'bot' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));
    contents.push({ role: 'user', parts: [{ text }] });

    // Use alt=sse to get a proper Server-Sent Events stream from Gemini
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?alt=sse&key=${apiKey}`;
    
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        systemInstruction: { parts: [{ text: systemInstruction }] }
      })
    });

    if (!res.ok) {
      const responseText = await res.text();
      let errData;
      try { errData = JSON.parse(responseText); } catch(e) {}
      
      let errorMessage = errData?.error?.message || errData?.message || responseText || 'Error from Gemini API';
      
      if (res.status === 429 || errorMessage.includes('429') || errorMessage.includes('quota')) {
         errorMessage = 'Лимит бесплатных запросов к Gemini API исчерпан. Пожалуйста, подождите немного.';
      } else if (res.status === 503 || errorMessage.includes('503') || errorMessage.includes('demand')) {
         errorMessage = 'Модель временно недоступна из-за высокой нагрузки. Пожалуйста, повторите попытку позже.';
      }
      
      return new Response(JSON.stringify({ error: `Gemini API Error: ${errorMessage}` }), {
        status: res.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Set up standard pass-through streaming
    const { readable, writable } = new TransformStream();
    
    // Process stream in the background
    (async () => {
      const writer = writable.getWriter();
      const reader = res.body?.getReader();
      const textDecoder = new TextDecoder();
      const textEncoder = new TextEncoder();

      if (!reader) {
        await writer.close();
        return;
      }

      let buffer = "";

      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          
          buffer += textDecoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          // Keep the last partial line in the buffer
          buffer = lines.pop() || "";
          
          for (const line of lines) {
            if (line.startsWith('data: ')) {
               const dataStr = line.slice(6).trim();
               if (dataStr === '[DONE]') continue;
               if (!dataStr) continue;
               
               try {
                 const data = JSON.parse(dataStr);
                 // Extract text from the candidate parts
                 const candidateTokens = data.candidates?.[0]?.content?.parts?.[0]?.text;
                 if (candidateTokens) {
                   await writer.write(textEncoder.encode(candidateTokens));
                 }
               } catch (e) {
                 console.error('Error parsing SSE data line', e);
               }
            }
          }
        }
      } catch (err) {
        console.error('Stream processing error:', err);
      } finally {
        await writer.close();
      }
    })();

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: `Server error: ${error.message}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
