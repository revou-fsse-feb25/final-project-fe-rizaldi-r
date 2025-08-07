import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "./Footer";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Navbar />
      <main className="flex flex-col gap-6.5 my-10">{children}</main>
      <Footer />
    </>
  );
}
