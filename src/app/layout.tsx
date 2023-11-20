import "~/styles/globals.css";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "OAOS deploys history",
  description: "Historique des différents déploiements de OAOS",
  icons: [{ rel: "shortcut icon", url: "/favicon.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} bg-gray-100 py-16`}>
        <div className="flex items-center justify-center lg:h-screen">
          <div className="w-11/12 rounded-lg bg-white p-6 shadow-sm sm:w-11/12 md:w-8/12 lg:w-6/12">
            <div className="flex w-full items-center justify-between p-3">
              <h1 className="text-xl font-semibold">OAOS deploys history</h1>
            </div>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
