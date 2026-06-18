export async function onRequestPost(context: any) {
  try {
    const { request, env } = context;
    const body = await request.json();
    const { messages, text, systemInstruction } = body;

    const apiKey = env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API Key is missing' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const contents = messages.map((msg: any) => ({
      role: msg.role === 'bot' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));
    contents.push({ role: 'user', parts: [{ text }] });

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:streamGenerateContent?key=${apiKey}`;
    
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        systemInstruction: { parts: [{ text: systemInstruction }] }
      })
    });

    if (!res.ok) {
      const err = await res.json();
      return new Response(JSON.stringify({ error: err.error?.message || 'Error from Gemini' }), {
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

      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          
          const chunkStr = textDecoder.decode(value, { stream: true });
          const textMatches = chunkStr.matchAll(/"text":\s*"([^"]+)"/g);
          
          let addedText = "";
          for (const match of textMatches) {
            try { 
              // Handle JSON escaped strings appropriately
              addedText += JSON.parse(`"${match[1]}"`); 
            } catch(e) { 
              addedText += match[1]; 
            }
          }

          if (addedText) {
            await writer.write(textEncoder.encode(addedText));
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
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
