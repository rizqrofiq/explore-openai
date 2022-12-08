import React from "react";
import Navbar from "./navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen  font-main">{children}</main>
    </>
  );
};

export default Layout;
