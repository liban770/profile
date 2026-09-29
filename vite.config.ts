import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'api-contact-handler',
      configureServer(server) {
        server.middlewares.use('/api/contact', (req, res, next) => {
          if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', () => {
              try {
                const data = JSON.parse(body || '{}');
                const { name, email, subject, message } = data;

                if (!name || !email || !message) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'Name, email, and message are required.' }));
                  return;
                }

                // Simple email validation regex
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: 'Invalid email address.' }));
                  return;
                }

                const contactMessage = {
                  id: 'msg_' + Date.now(),
                  name: String(name).trim(),
                  email: String(email).trim(),
                  subject: subject ? String(subject).trim() : 'General Inquiry',
                  message: String(message).trim(),
                  createdAt: new Date().toISOString(),
                  read: false,
                };

                // Persist locally if data dir exists or create it
                const dataDir = path.resolve(process.cwd(), 'data');
                if (!fs.existsSync(dataDir)) {
                  fs.mkdirSync(dataDir, { recursive: true });
                }
                const messagesFile = path.join(dataDir, 'messages.json');
                let messages = [];
                if (fs.existsSync(messagesFile)) {
                  try {
                    messages = JSON.parse(fs.readFileSync(messagesFile, 'utf-8'));
                  } catch {
                    messages = [];
                  }
                }
                messages.unshift(contactMessage);
                fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2), 'utf-8');

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, message: 'Message sent successfully!', id: contactMessage.id }));
              } catch (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Failed to process message' }));
              }
            });
          } else if (req.method === 'GET') {
            const messagesFile = path.resolve(process.cwd(), 'data', 'messages.json');
            let messages = [];
            if (fs.existsSync(messagesFile)) {
              try {
                messages = JSON.parse(fs.readFileSync(messagesFile, 'utf-8'));
              } catch {
                messages = [];
              }
            }
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ messages }));
          } else {
            next();
          }
        });
      },
    },
  ],
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
});
