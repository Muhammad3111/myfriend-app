import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopHeader from "../components/TopHeader";
import MobileMenu from "../components/MobileMenu";

export default function Layout() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWindowSize = () => {
      setIsMobile(window.innerWidth <= 768); // Misolga ko'ra 768 pikselda mobile qurilma
    };

    checkWindowSize(); // Boshlang'ich o'lchamni tekshirish
    window.addEventListener("resize", checkWindowSize); // O'lcham o'zgarishi sodir bo'lganda tekshirish
    return () => {
      window.removeEventListener("resize", checkWindowSize); // Olay yopilganda tekshirishni bekor qilish
    };
  }, []);

  return (
    <div className="flex">
      <div className={isMobile ? "fixed bottom-0 left-0 w-full z-10" : "flex-1"}>
        {isMobile ? <MobileMenu /> : <Sidebar />}
      </div>
      <div className="w-full">
        <TopHeader />
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
