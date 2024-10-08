import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TopNav } from "./_components/topnav";
import StoreProvider from "./StoreProvider";

import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Just Do",
  description: "created by Ronit",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>
          <StoreProvider>
            <div className="grid h-screen grid-rows-[auto,1fr]">
              <TopNav />
              <main className="background">{children}</main>
            </div>
            <Toaster />
          </StoreProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
