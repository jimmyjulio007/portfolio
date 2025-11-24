type Locale = "en" | "fr" | "ja" | "zh" | "de" | "ar";

interface EmailTemplate {
  subject: string;
  greeting: string;
  intro: string;
  closing: string;
  signature: string;
}

const templates: Record<Locale, EmailTemplate> = {
  en: {
    subject: "New Contact Form Submission",
    greeting: "Hello Jimmy,",
    intro: "You have received a new message from your portfolio contact form:",
    closing: "Best regards,",
    signature: "Your Portfolio Contact System",
  },
  fr: {
    subject: "Nouvelle soumission du formulaire de contact",
    greeting: "Bonjour Jimmy,",
    intro: "Vous avez reçu un nouveau message depuis le formulaire de contact de votre portfolio :",
    closing: "Cordialement,",
    signature: "Votre Système de Contact Portfolio",
  },
  ja: {
    subject: "お問い合わせフォームからの新着メッセージ",
    greeting: "Jimmy様、",
    intro: "ポートフォリオのお問い合わせフォームから新しいメッセージが届きました：",
    closing: "よろしくお願いいたします、",
    signature: "ポートフォリオお問い合わせシステム",
  },
  zh: {
    subject: "联系表单新提交",
    greeting: "你好 Jimmy，",
    intro: "您的作品集联系表单收到一条新消息：",
    closing: "此致敬礼，",
    signature: "您的作品集联系系统",
  },
  de: {
    subject: "Neue Kontaktformular-Einreichung",
    greeting: "Hallo Jimmy,",
    intro: "Sie haben eine neue Nachricht über das Kontaktformular Ihres Portfolios erhalten:",
    closing: "Mit freundlichen Grüßen,",
    signature: "Ihr Portfolio-Kontaktsystem",
  },
  ar: {
    subject: "تقديم نموذج اتصال جديد",
    greeting: "مرحباً Jimmy،",
    intro: "لقد تلقيت رسالة جديدة من نموذج الاتصال الخاص بمحفظتك:",
    closing: "مع أطيب التحيات،",
    signature: "نظام الاتصال بمحفظتك",
  },
};

export function generateEmailHTML(
  locale: Locale,
  name: string,
  email: string,
  message: string
): { subject: string; html: string } {
  const t = templates[locale] || templates.en;

  const html = `
    <!DOCTYPE html>
    <html lang="${locale}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Courier New', monospace;
          background: #000000;
          padding: 40px 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: #050505;
          border: 2px solid #00f0ff;
          border-radius: 0;
          overflow: hidden;
          box-shadow: 0 0 40px rgba(0, 240, 255, 0.5), 0 0 80px rgba(0, 240, 255, 0.2);
        }
        .header {
          background: linear-gradient(135deg, #00f0ff 0%, #0099ff 100%);
          padding: 30px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100%;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.1) 2px,
            rgba(0, 0, 0, 0.1) 4px
          );
          pointer-events: none;
        }
        .header h1 {
          color: #000000;
          font-size: 20px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 3px;
          position: relative;
          z-index: 1;
        }
        .content {
          padding: 40px 30px;
          background: #0a0a0a;
        }
        .greeting {
          font-size: 18px;
          margin-bottom: 20px;
          color: #ccff00;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        .intro {
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 30px;
          color: #00f0ff;
        }
        .message-box {
          background: #000000;
          border: 2px solid #00f0ff;
          padding: 25px;
          margin: 20px 0;
          position: relative;
        }
        .message-box::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: repeating-linear-gradient(
            90deg,
            transparent,
            transparent 50px,
            rgba(0, 240, 255, 0.03) 50px,
            rgba(0, 240, 255, 0.03) 100px
          );
          pointer-events: none;
        }
        .label {
          color: #ccff00;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 8px;
          font-weight: 700;
          position: relative;
          z-index: 1;
        }
        .value {
          color: #ffffff;
          font-size: 16px;
          margin-bottom: 20px;
          word-wrap: break-word;
          position: relative;
          z-index: 1;
        }
        .message-text {
          color: #ffffff;
          font-size: 14px;
          line-height: 1.8;
          white-space: pre-wrap;
          position: relative;
          z-index: 1;
        }
        .footer {
          background: #000000;
          border-top: 2px solid #00f0ff;
          padding: 25px 30px;
          text-align: center;
        }
        .closing {
          margin-top: 30px;
          color: #888888;
          font-size: 13px;
        }
        .signature {
          color: #00f0ff;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 8px;
        }
        .divider {
          height: 2px;
          background: linear-gradient(90deg, transparent, #00f0ff, transparent);
          margin: 20px 0;
        }
        .footer-text {
          color: #666666;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .footer-year {
          color: #ccff00;
          font-size: 10px;
          margin-top: 8px;
          letter-spacing: 2px;
        }
        .scan-effect {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 240, 255, 0.03) 2px,
            rgba(0, 240, 255, 0.03) 4px
          );
          pointer-events: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>⚡ ${t.subject} ⚡</h1>
        </div>
        <div class="content">
          <div class="scan-effect"></div>
          <p class="greeting">// ${t.greeting}</p>
          <p class="intro">${t.intro}</p>
          
          <div class="message-box">
            <div class="label">👤 NAME / NOM</div>
            <div class="value">${name}</div>
            
            <div class="label">📧 EMAIL</div>
            <div class="value"><a href="mailto:${email}" style="color: #00f0ff; text-decoration: none;">${email}</a></div>
            
            <div class="divider"></div>
            
            <div class="label">💬 MESSAGE</div>
            <div class="message-text">${message}</div>
          </div>
          
          <p class="closing">${t.closing}</p>
          <p class="signature">${t.signature}</p>
        </div>
        <div class="footer">
          <p class="footer-text">SENT FROM PORTFOLIO CONTACT FORM</p>
          <p class="footer-year">© ${new Date().getFullYear()} JIMMY JULIO // SYSTEM ONLINE</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return {
    subject: `⚡ ${t.subject} - ${name}`,
    html,
  };
}
