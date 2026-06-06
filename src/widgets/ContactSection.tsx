"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { type UseFormRegisterReturn, useForm } from "react-hook-form";
import { SITE_CONFIG } from "@/shared/config/constants";
import {
  type ContactFormData,
  getContactFormSchema,
} from "@/shared/lib/validations/contact";
import { FuturisticToast } from "@/shared/ui/FuturisticToast";

interface FormFieldProps {
  register: UseFormRegisterReturn;
  error?: string;
  placeholder: string;
  disabled?: boolean;
  type?: string;
  isTextArea?: boolean;
}

function FormField({
  register,
  error,
  placeholder,
  disabled,
  type = "text",
  isTextArea,
}: FormFieldProps) {
  const Component = isTextArea ? "textarea" : "input";

  return (
    <div className="group relative w-full">
      <Component
        {...register}
        type={!isTextArea ? type : undefined}
        disabled={disabled}
        rows={isTextArea ? 6 : undefined}
        className={`
          w-full bg-transparent border-b-2 py-4 text-white
          placeholder-gray-600 focus:outline-none transition-all duration-300
          font-mono disabled:opacity-50 resize-none
          ${error ? "border-red-500" : "border-gray-800 focus:border-[#00f0ff]"}
        `}
        placeholder={placeholder}
        aria-invalid={error ? "true" : "false"}
      />
      {error && <p className="text-red-500 text-xs font-mono mt-2">{error}</p>}
      <div className="absolute -bottom-[2px] left-0 h-[2px] bg-[#00f0ff] w-0 group-focus-within:w-full transition-all duration-500" />
    </div>
  );
}

export function ContactSection() {
  const t = useTranslations("Contact");
  const locale = useLocale();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    show: boolean;
    type: "success" | "error" | "info";
    message: string;
  }>({ show: false, type: "info", message: "" });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ContactFormData>({
    resolver: zodResolver(getContactFormSchema(locale)),
  });

  const handleFormFill = useCallback(
    (e: Event) => {
      const { name, email, message } = (e as CustomEvent).detail;
      if (name) setValue("name", name, { shouldValidate: true });
      if (email) setValue("email", email, { shouldValidate: true });
      if (message)
        setValue("message", message.replace(/\\n/g, "\n"), {
          shouldValidate: true,
        });
    },
    [setValue],
  );

  useEffect(() => {
    window.addEventListener("fill-contact-form", handleFormFill);
    return () =>
      window.removeEventListener("fill-contact-form", handleFormFill);
  }, [handleFormFill]);

  const socialLinks = useMemo(
    () => [
      { label: t("socialGithub"), href: SITE_CONFIG.social.github },
      { label: t("socialLinkedin"), href: SITE_CONFIG.social.linkedin },
      { label: t("socialTwitter"), href: SITE_CONFIG.social.twitter },
    ],
    [t],
  );

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });

      if (!response.ok) throw new Error("Failed");

      setToast({ show: true, type: "success", message: t("toast.success") });
      reset();
    } catch {
      setToast({ show: true, type: "error", message: t("toast.error") });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-32 bg-[#050505] overflow-hidden"
    >
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[600px] h-[400px] bg-[#00f0ff]/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute right-[-100px] bottom-0 w-[350px] h-[350px] bg-[#ccff00]/4 blur-[120px] rounded-full pointer-events-none" />
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#ccff00] font-mono text-sm tracking-widest uppercase">
            {t("sectionLabel")}
          </span>
          <h2 className="text-6xl md:text-8xl font-bold text-white mt-4 font-migumono">
            {t("title")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#ccff00]">
              {t("titleHighlight")}
            </span>
          </h2>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <FormField
              register={register("name")}
              error={errors.name?.message}
              placeholder={t("namePlaceholder")}
              disabled={isSubmitting}
            />
            <FormField
              register={register("email")}
              error={errors.email?.message}
              placeholder={t("emailPlaceholder")}
              disabled={isSubmitting}
              type="email"
            />
          </div>

          <FormField
            register={register("message")}
            error={errors.message?.message}
            placeholder={t("messagePlaceholder")}
            disabled={isSubmitting}
            isTextArea
          />

          <div className="flex justify-center pt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                relative group px-12 py-4 bg-white text-black font-bold
                tracking-widest overflow-hidden
                transition-all duration-300 font-mono
                hover:bg-[#00f0ff] hover:scale-105
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
              `}
            >
              <span className="relative flex items-center gap-3">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {t("submitSending")}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {t("submitIdle")}
                  </>
                )}
              </span>
            </button>
          </div>
        </form>

        <div className="mt-20 flex flex-wrap justify-center gap-6 md:gap-12 border-t border-gray-900 pt-12">
          {socialLinks.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#ccff00] transition-colors duration-300 font-mono text-sm tracking-widest group relative"
            >
              {social.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#ccff00] group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>
      </div>

      {toast.show && (
        <FuturisticToast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
    </section>
  );
}
