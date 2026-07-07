import { Metadata } from "next";
import { LandingPage } from "@/components/landing/LandingPage";

export const metadata: Metadata = {
  title: "NexHeal | Intelligent Enterprise Healthcare Ecosystem",
  description: "NexHeal replaces fragmented legacy systems with a unified, modern architecture. Connect patients, doctors, hospitals, and emergency responders in a single AI-powered platform.",
  keywords: ["Healthcare", "Telemedicine", "SaaS", "Medical Records", "AI Copilot", "Emergency SOS"],
  authors: [{ name: "NexHeal Engineering" }],
  creator: "NexHeal Inc.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nexheal.com",
    title: "NexHeal | Intelligent Enterprise Healthcare Ecosystem",
    description: "Connect patients, doctors, hospitals, and emergency responders in a single AI-powered platform.",
    siteName: "NexHeal",
  },
  twitter: {
    card: "summary_large_image",
    title: "NexHeal | Intelligent Enterprise Healthcare",
    description: "Connect patients, doctors, hospitals, and emergency responders in a single AI-powered platform.",
    creator: "@nexheal",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function Home() {
  return <LandingPage />;
}
