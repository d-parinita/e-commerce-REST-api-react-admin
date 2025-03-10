import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import { LoaderProvider } from "./context/LoaderContext";
import Loader from "./Components/Loader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ecommerce admin",
  description: "Ecommerce admin website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LoaderProvider>
          <Loader/>
          <ToastContainer 
            position="top-right"
            theme="dark"
          />
          {children}
        </LoaderProvider>
      </body>
    </html>
  );
}
