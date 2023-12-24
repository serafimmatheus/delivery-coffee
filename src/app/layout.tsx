import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import HeaderDesktop from "@/components/headerDesktop";
import { ProviderCoffee } from "@/provider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Coffee Delivery",
  description: "Venha tomar um café com a gente!",
  keywords: "coffee, delivery, café, entrega",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={`${roboto.className} bg-gray-100 text-gray-900`}>
        <ProviderCoffee>
          <HeaderDesktop />

          {children}
        </ProviderCoffee>
      </body>
    </html>
  );
}
