import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.use(express.json());

// API: Contact Message Submission
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
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

    const dataDir = join(__dirname, 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const messagesFile = join(dataDir, 'messages.json');
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

    return res.status(200).json({ success: true, message: 'Message sent successfully!', id: contactMessage.id });
  } catch (err) {
    console.error('Contact submission error:', err);
    return res.status(500).json({ error: 'Failed to process contact message.' });
  }
});

// API: Get messages (for admin)
app.get('/api/contact', (req, res) => {
  const messagesFile = join(__dirname, 'data', 'messages.json');
  let messages = [];
  if (fs.existsSync(messagesFile)) {
    try {
      messages = JSON.parse(fs.readFileSync(messagesFile, 'utf-8'));
    } catch {
      messages = [];
    }
  }
  res.status(200).json({ messages });
});

// Serve built static assets if dist exists, otherwise serve root
const distPath = join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(join(distPath, 'index.html'));
  });
} else {
  app.use(express.static(__dirname));
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
  });
}

app.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});
