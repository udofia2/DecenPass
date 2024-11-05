
import { Metadata } from "next";
import ScrollUp from "../components/Common/ScrollUp";
import Hero from "../components/Hero";

export const metadata: Metadata = {
  title: "Free Next.js Template for Startup and SaaS",
  description: "This is Home for Startup Nextjs Template",
  // other metadata
};

export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
    </>
  );
}
