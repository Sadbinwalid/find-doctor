import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import OnboardingModal from "@/components/OnboardingModal";

const hind = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "bengali"],
  variable: "--font-hind",
});

export const metadata: Metadata = {
  title: "DoctorBD — Find the Right Doctor in Bangladesh",
  description:
    "Search for qualified doctors across all divisions and districts of Bangladesh. Filter by specialty, location, and consultation fee.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${hind.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-gray-50">
        <LanguageProvider>
          <Navbar />
          <OnboardingModal />
          <main className="flex-1 pb-16 md:pb-0">{children}</main>
          <div className="hidden md:block"><Footer /></div>
          <BottomNav />
        </LanguageProvider>
      </body>
    </html>
  );
}
