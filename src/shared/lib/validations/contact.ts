import { z } from "zod";

export type Locale = "en" | "fr" | "ja" | "zh" | "de" | "ar";

const validationMessages: Record<Locale, {
    nameMin: string;
    nameMax: string;
    emailInvalid: string;
    messageMin: string;
    messageMax: string;
}> = {
    en: {
        nameMin: "Name must be at least 2 characters",
        nameMax: "Name must not exceed 100 characters",
        emailInvalid: "Please enter a valid email address",
        messageMin: "Message must be at least 10 characters",
        messageMax: "Message must not exceed 1000 characters",
    },
    fr: {
        nameMin: "Le nom doit contenir au moins 2 caractères",
        nameMax: "Le nom ne doit pas dépasser 100 caractères",
        emailInvalid: "Veuillez saisir une adresse e-mail valide",
        messageMin: "Le message doit contenir au moins 10 caractères",
        messageMax: "Le message ne doit pas dépasser 1000 caractères",
    },
    ja: {
        nameMin: "名前は2文字以上である必要があります",
        nameMax: "名前は100文字を超えてはいけません",
        emailInvalid: "有効なメールアドレスを入力してください",
        messageMin: "メッセージは10文字以上である必要があります",
        messageMax: "メッセージは1000文字を超えてはいけません",
    },
    zh: {
        nameMin: "姓名至少需要2个字符",
        nameMax: "姓名不得超过100个字符",
        emailInvalid: "请输入有效的电子邮件地址",
        messageMin: "消息至少需要10个字符",
        messageMax: "消息不得超过1000个字符",
    },
    de: {
        nameMin: "Der Name muss mindestens 2 Zeichen lang sein",
        nameMax: "Der Name darf 100 Zeichen nicht überschreiten",
        emailInvalid: "Bitte geben Sie eine gültige E-Mail-Adresse ein",
        messageMin: "Die Nachricht muss mindestens 10 Zeichen lang sein",
        messageMax: "Die Nachricht darf 1000 Zeichen nicht überschreiten",
    },
    ar: {
        nameMin: "يجب أن يحتوي الاسم على حرفين على الأقل",
        nameMax: "يجب ألا يتجاوز الاسم 100 حرف",
        emailInvalid: "يرجى إدخال عنوان بريد إلكتروني صالح",
        messageMin: "يجب أن تحتوي الرسالة على 10 أحرف على الأقل",
        messageMax: "يجب ألا تتجاوز الرسالة 1000 حرف",
    },
};

export const getContactFormSchema = (locale: string = "en") => {
    const messages = validationMessages[(locale as Locale)] || validationMessages.en;

    return z.object({
        name: z
            .string()
            .min(2, messages.nameMin)
            .max(100, messages.nameMax),
        email: z
            .email(messages.emailInvalid),
        message: z
            .string()
            .min(10, messages.messageMin)
            .max(1000, messages.messageMax),
    });
};

// Default schema for backwards compatibility
export const contactFormSchema = getContactFormSchema("en");

export type ContactFormData = z.infer<typeof contactFormSchema>;
