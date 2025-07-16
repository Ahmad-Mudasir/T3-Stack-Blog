import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { Navbar } from "./_components/navbar";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Social Department",
  description: "T3 stack project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.className} `}
          style={{
            backgroundColor: "",
            backgroundImage:
              "url(https://www.transparenttextures.com/patterns/concrete-wall-3.png)",
            backgroundAttachment: "fixed",
          }}
        >
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
