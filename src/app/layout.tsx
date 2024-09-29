import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";

const vazir = localFont({
  src: "./fonts/Vazir-Regular.ttf",
  variable: "--font-vazir",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "blueBye Blog",
  description: "By Navid Shirmohammadi",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body
      className={`${vazir.variable} antialiased`}
    >
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </body>
    </html>
  );
}
