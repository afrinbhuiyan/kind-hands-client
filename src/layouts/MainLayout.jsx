import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="">
      <Navbar />

      <main className="">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
