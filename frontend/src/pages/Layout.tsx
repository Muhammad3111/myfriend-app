import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import TopHeader from "../components/TopHeader";

export default function Layout() {
  return (
    <div className="flex">
      <div className="flex-1">
        <Sidebar />
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
