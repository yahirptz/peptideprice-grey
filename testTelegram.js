const TELEGRAM_BOT_TOKEN = "8225655083:AAFgeUEZFUz6iSV46gYtqtVfXtLvKBPuJms";
const TELEGRAM_CHAT_ID = "7697655102";

const message = `
🛍️ *TEST MESSAGE*

This is a test from your order system.
If you see this, Telegram notifications are working!
`;

fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    chat_id: TELEGRAM_CHAT_ID,
    text: message,
    parse_mode: 'Markdown',
  }),
})
.then(res => res.json())
.then(data => console.log('Telegram response:', data))
.catch(err => console.error('Error:', err));