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
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);
          padding: 40px 20px;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid #00f0ff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 0 40px rgba(0, 240, 255, 0.3);
        }
        .header {
          background: linear-gradient(135deg, #00f0ff 0%, #0077ff 100%);
          padding: 30px;
          text-align: center;
        }
        .header h1 {
          color: #ffffff;
          font-size: 24px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        .content {
          padding: 40px 30px;
          color: #ffffff;
        }
        .greeting {
          font-size: 18px;
          margin-bottom: 20px;
          color: #00f0ff;
        }
        .intro {
          font-size: 16px;
          line-height: 1.6;
          margin-bottom: 30px;
          color: #e0e0e0;
        }
        .message-box {
          background: rgba(0, 240, 255, 0.1);
          border-left: 4px solid #00f0ff;
          padding: 20px;
          margin: 20px 0;
          border-radius: 4px;
        }
        .label {
          color: #00f0ff;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
          font-weight: 600;
        }
        .value {
          color: #ffffff;
          font-size: 16px;
          margin-bottom: 20px;
          word-wrap: break-word;
        }
        .message-text {
          color: #ffffff;
          font-size: 15px;
          line-height: 1.7;
          white-space: pre-wrap;
        }
        .footer {
          background: rgba(0, 0, 0, 0.3);
          padding: 20px 30px;
          text-align: center;
          color: #888;
          font-size: 14px;
        }
        .signature {
          color: #00f0ff;
          font-weight: 600;
        }
        .divider {
          height: 2px;
          background: linear-gradient(90deg, transparent, #00f0ff, transparent);
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>⚡ ${t.subject} ⚡</h1>
        </div>
        <div class="content">
          <p class="greeting">${t.greeting}</p>
          <p class="intro">${t.intro}</p>
          
          <div class="message-box">
            <div class="label">👤 Name / Nom</div>
            <div class="value">${name}</div>
            
            <div class="label">📧 Email</div>
            <div class="value">${email}</div>
            
            <div class="divider"></div>
            
            <div class="label">💬 Message</div>
            <div class="message-text">${message}</div>
          </div>
          
          <p style="margin-top: 30px; color: #e0e0e0;">${t.closing}</p>
          <p class="signature">${t.signature}</p>
        </div>
        <div class="footer">
          <p>Sent from Portfolio Contact Form</p>
          <p style="font-size: 12px; margin-top: 8px;">© ${new Date().getFullYear()} Jimmy Julio</p>
        </div>
      </div>
    </body>
    </html>
  `;

    return {
        subject: `${t.subject} - ${name}`,
        html,
    };
}
