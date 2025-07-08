import React from "react";
import Navbar from "../navbar/Navbar";
import Footer from "./Footer";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
