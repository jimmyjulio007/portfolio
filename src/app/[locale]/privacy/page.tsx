import { PrivacyPolicyContent } from "@/features/PrivacyPolicyContent";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "Metadata" });

    return {
        title: `Privacy Policy | ${t("title")}`,
        description: "Privacy Policy and Data Protection Protocol",
    };
}

export default function PrivacyPage() {
    return <PrivacyPolicyContent />;
}
