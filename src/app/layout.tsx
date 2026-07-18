import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import { AppProvider } from "@/context/AppContext";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Elite Fitness Club | Transform Your Body, Transform Your Life",
  description: "Experience luxury fitness at Elite Fitness Club. State-of-the-art equipment, elite personal trainers, personalized nutrition, and AI-powered trackers.",
  keywords: "luxury gym, fitness club, personal trainer, bodybuilding, weight loss, crossfit, cardio, workout plan, diet planner, fitness dashboard",
  openGraph: {
    title: "Elite Fitness Club - Luxury & Modern Fitness",
    description: "Transform your body, build your future. Join the elite community of fitness professionals and trainers.",
    type: "website",
    url: "https://elitefitness.club",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Elite Fitness Club",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elite Fitness Club | Premium Gym & Fitness",
    description: "Transform your body, build your future.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} h-full w-full max-w-full overflow-x-hidden scroll-smooth`}
    >
      <body className="min-h-full w-full max-w-full overflow-x-hidden bg-brand-bg text-brand-text antialiased">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
