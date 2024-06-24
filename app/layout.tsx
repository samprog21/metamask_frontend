import '@rainbow-me/rainbowkit/styles.css';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { gs,g3,f1 } from "./fonts";
import "./globals.css";
import { ThemeProvider } from "./provider";
import { StoreProvider } from "@/app/StoreProvider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SessionsProvider from "./SessionsProvider";
import { Navbar } from "@/components/ui/Navbar";
import { W3ContextProvider } from "@/context/MetaMaskContext";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "metamask interview task",
  description: "user landing page",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="" sizes="any" />
      </head>
      <body className={` ${inter.className} ${g3.variable} ${gs.variable} ${f1.variable}  `}>
        <StoreProvider>
          <SessionsProvider>
            <W3ContextProvider>
            <Navbar />

            {children}
            </W3ContextProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <ToastContainer theme="dark" />
            </ThemeProvider>
          </SessionsProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
