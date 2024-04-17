import { useQuery } from "@tanstack/react-query";
import { CiBoxes, CiBoxList } from "react-icons/ci";
import { GiMoneyStack, GiTakeMyMoney } from "react-icons/gi";
import { MdOutlineMoneyOff } from "react-icons/md";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import * as apiClient from "../apiClient";

type ReportTypes = {
  count: number;
  soldCount: number;
  totalProductPrice: number;
  totalSoldPrice: number;
  totalExpense: number;
  totalProfit: number;
};

export default function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["Report"],
    queryFn: apiClient.report,
  });

  if (isLoading) {
    return (
      <div
        className="grid grid-cols-3 gap-4 animate-pulse sx:grid-cols-1"
        role="status"
      >
        <div className="h-24 bg-gray-200 col-span-1 rounded-lg"></div>
        <div className="h-24 bg-gray-200 col-span-1 rounded-lg"></div>
        <div className="h-24 bg-gray-200 col-span-1 rounded-lg"></div>
        <div className="h-24 bg-gray-200 col-span-1 rounded-lg"></div>
        <div className="h-24 bg-gray-200 col-span-1 rounded-lg"></div>
        <div className="h-24 bg-gray-200 col-span-1 rounded-lg"></div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  const fetchData = (value: number, title: string) => {
    return (
      <div className="flex flex-col gap-1">
        <p>{title}</p>
        <h1 className="text-2xl font-semibold">
          {value} &nbsp;
          {title === "Mahsulotlar" || title === "Sotilgan Mahsulotlar"
            ? ""
            : "$"}
        </h1>
      </div>
    );
  };

  const reports: ReportTypes = data;

  return (
    <div className="grid grid-cols-3 sx:grid-cols-1 gap-4 sx:pb-16">
      <div className="col-span-1 rounded-lg shadow-lg p-4 flex items-center gap-4 border">
        <div className="bg-green-400/30 w-16 h-16 rounded-full flex items-center justify-center ">
          <CiBoxes className="text-5xl text-green-600" />
        </div>
        {fetchData(reports.count, "Mahsulotlar")}
      </div>
      <div className="col-span-1 rounded-lg shadow-lg p-4 flex items-center gap-4 border">
        <div className="bg-green-400/30 w-16 h-16 rounded-full flex items-center justify-center ">
          <CiBoxList className="text-5xl text-green-600" />
        </div>
        {fetchData(reports.soldCount, "Sotilgan Mahsulotlar")}
      </div>
      <div className="col-span-1 rounded-lg shadow-lg p-4 flex items-center gap-4 border">
        <div className="bg-green-400/30 w-16 h-16 rounded-full flex items-center justify-center ">
          <GiMoneyStack className="text-5xl text-green-600" />
        </div>
        {fetchData(reports.totalProductPrice, "Umumiy Mahsulotlar Narxi")}
      </div>
      <div className="col-span-1 rounded-lg shadow-lg p-4 flex items-center gap-4 border">
        <div className="bg-green-400/30 w-16 h-16 rounded-full flex items-center justify-center ">
          <GiTakeMyMoney className="text-5xl text-green-600" />
        </div>
        {fetchData(reports.totalSoldPrice, "Sotilgan Mahsulotlar Narxi")}
      </div>
      <div className="col-span-1 rounded-lg shadow-lg p-4 flex items-center gap-4 border">
        <div className="bg-green-400/30 w-16 h-16 rounded-full flex items-center justify-center ">
          <MdOutlineMoneyOff className="text-5xl text-green-600" />
        </div>
        {fetchData(reports.totalExpense, "Chiqimlar")}
      </div>
      <div className="col-span-1 rounded-lg shadow-lg p-4 flex items-center gap-4 border">
        <div className="bg-green-400/30 w-16 h-16 rounded-full flex items-center justify-center ">
          <RiMoneyDollarCircleLine className="text-5xl text-green-600" />
        </div>
        {fetchData(reports.totalProfit, "Sof Foyda")}
      </div>
    </div>
  );
}
