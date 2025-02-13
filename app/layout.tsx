import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import NavBar from "./Components/Nav/NavBar";
import Footer from "./Components/footer/Footer";
import CartProvider from "@/providers/CartProvider";
import { Toaster } from "react-hot-toast";


const poppins = Poppins({ subsets: ["latin"], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: "E-shop",
  description: "Ecommerce-app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} text-slate-700`}>
<Toaster toastOptions={{
  style: {
    background:"rgb(51 65 85)",
    color: "#fff"
  },
}}/>

    <CartProvider>

  <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow "> {children}</main>
      <Footer/>
    </div>
    </CartProvider>
  </body>
</html>
  );
}


