import { useQuery } from "@tanstack/react-query";
import * as apiClient from "../../apiClient";
import RestoreProduct from "./RestoreProduct";
import { useState } from "react";

type CategoryTypes = {
  _id: string;
  title: string;
};

type ProductTypes = {
  _id: string;
  title: string;
  price_received: number;
  expense: number;
  price: number;
  imei: number;
  percent_of_battery: string;
  category: CategoryTypes;
  sold: boolean;
};

const ReadIncomes = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["SoldProducts"],
    queryFn: apiClient.getSoldProducts,
  });
  const [searchValue, setSearchValue] = useState<string>("");

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const incomes: ProductTypes[] = data;

  const searchProducts = (searchValue: string) => {
    return incomes.filter((product) => {
      return (
        product.imei.toString().includes(searchValue) ||
        product.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    });
  };

  const filteredProducts = searchValue ? searchProducts(searchValue) : incomes;
  return (
    <div className="flex flex-col gap-4 items-start">
      <div className="flex justify-end w-full">
        <label htmlFor="search" className="flex items-center gap-4 text-lg font-semibold">
          Izlash
          <input
            type="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="rounded-full border-2 focus:border-main-color focus:outline-none py-2 px-3 text-base"
          />
        </label>
      </div>
      <div className="flex flex-col border rounded-lg shadow-lg w-full">
        <div className="grid grid-cols-8 divide-x-2 text-center">
          <div className="col-span-1 text-lg font-semibold p-2">
            Mahsulot nomi
          </div>
          <div className="col-span-1 text-lg font-semibold p-2">
            Olingan narx
          </div>
          <div className="col-span-1 text-lg font-semibold p-2">Xarajat</div>
          <div className="col-span-1 text-lg font-semibold p-2">Narx</div>
          <div className="col-span-1 text-lg font-semibold p-2">IMEI</div>
          <div className="col-span-1 text-lg font-semibold p-2">
            Battarey foizi
          </div>
          <div className="col-span-1 text-lg font-semibold p-2">Bo'limi</div>
          <div className="col-span-1 text-lg font-semibold p-2">Xarakat</div>
        </div>
        {filteredProducts.map((item) => (
          <div className="grid grid-cols-8 text-center" key={item._id}>
            <div className="col-span-1 border-t-2 p-2">{item.title}</div>
            <div className="col-span-1 border-t-2 p-2">
              {item.price_received}
            </div>
            <div className="col-span-1 border-t-2 p-2">{item.expense}</div>
            <div className="col-span-1 border-t-2 p-2">{item.price}</div>
            <div className="col-span-1 border-t-2 p-2">{item.imei}</div>
            <div className="col-span-1 border-t-2 p-2">
              {item.percent_of_battery}
            </div>
            <div className="col-span-1 border-t-2 p-2">
              {item.category.title}
            </div>
            <div className="col-span-1 border-t-2 p-2 flex items-center gap-3">
              <RestoreProduct {...item} category={item.category._id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadIncomes;
