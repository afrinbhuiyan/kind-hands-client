import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import TopNav from "../components/Headers/TopNav";
import Navbar from "../components/Headers/Navbar";

const MainLayout = () => {
  return (
    <div>
      <TopNav />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
