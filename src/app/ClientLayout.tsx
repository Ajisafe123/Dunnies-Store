"use client";
import CookieConsent from "@/components/layout/CookieConsent";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main>{children}</main>
      <CookieConsent />
    </>
  );
}
