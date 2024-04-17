import { useState } from "react";
import { CiBoxes } from "react-icons/ci";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { IoLayersOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [selectedMenu, setSelectedMenu] = useState<number>(0);
  const navigate = useNavigate();
  const changeMenu = (id: number, link: string) => {
    setSelectedMenu(id);
    navigate(link);
  };

  const style = (id: number) => {
    const defaultStyle =
      "text-base font-semibold text-black p-4 cursor-pointer flex gap-4 items-center rounded-tr-full rounded-br-full ";
    if (selectedMenu === id) {
      return defaultStyle + "bg-main-color text-white";
    } else {
      return defaultStyle;
    }
  };
  return (
    <div className="w-72 h-screen shadow-lg flex flex-col justify-between">
      <div className="flex flex-col gap-4">
        <div className="py-8">
          <h1 className="text-2xl text-gray-700 font-bold text-center">
            Dilmurod
          </h1>
        </div>
        <ul className="flex flex-col">
          <li className={style(0)} onClick={() => changeMenu(0, "/dashboard")}>
            <LuLayoutDashboard className="text-xl" />
            Bosh sahifa
          </li>
          <li className={style(1)} onClick={() => changeMenu(1, "categories")}>
            <IoLayersOutline className="text-xl" />
            Bo'limlar
          </li>
          <li className={style(2)} onClick={() => changeMenu(2, "products")}>
            <CiBoxes className="text-xl" />
            Mahsulotlar
          </li>
          <li className={style(3)} onClick={() => changeMenu(3, "/incomes")}>
            <GiReceiveMoney className="text-xl" />
            Sotilgan Mahsulotlar
          </li>
          <li className={style(4)} onClick={() => changeMenu(4, "/expenses")}>
            <GiPayMoney className="text-xl" />
            Xarajatlar
          </li>
          {/* <li className={style(5)} onClick={() => changeMenu(5, "sold-products")}>
          <CiBoxList className="text-xl" />
          Sotilgan mahsulotlar
        </li> */}
        </ul>
      </div>
    </div>
  );
}
