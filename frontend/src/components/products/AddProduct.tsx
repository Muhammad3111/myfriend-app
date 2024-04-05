import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../../apiClient";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type CategoryTypes = {
  _id: string;
  title: string;
};

export type ProductTypes = {
  title: string;
  price_received: number;
  expense: number;
  price: number;
  imei: number;
  percent_of_battery: string;
  category: CategoryTypes;
};

function AddProduct() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductTypes>();
  const { data, isLoading } = useQuery({
    queryKey: ["Categories"],
    queryFn: apiClient.getCategory,
  });
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const ProductMutation = useMutation({
    mutationFn: apiClient.addProduct,
    onSuccess: async () => {
      toast.success("Mahsulot qo'shildi");
      await queryClient.invalidateQueries({ queryKey: ["Products"] });
    },
    onError: () => {
      toast.error("Mahsulot qo'shishda xatolik yuz berdi");
    },
  });

  const onSubmit = handleSubmit((data) => {
    ProductMutation.mutate(data);
    reset();
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const categories: CategoryTypes[] = data;
  return (
    <div className="flex flex-col gap-4 sx:pb-16">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Mahsulot qo'shish</h1>
        <button
          onClick={() => navigate("/products")}
          className="rounded-lg bg-gray-200 border py-2 px-4 text-lg text-red-500 font-semibold col-span-2"
        >
          Orqaga
        </button>
      </div>
      <form
        className="grid grid-cols-2 gap-2 w-1/2 sx:w-full sx:grid-cols-1"
        onSubmit={onSubmit}
      >
        <label htmlFor="title" className="flex flex-col gap-1 col-span-1">
          Mahsulot nomini yozing
          <input
            type="text"
            id="title"
            className="rounded-lg border py-2 px-3 text-md focus:border-main-color focus:outline-none w-full"
            {...register("title", {
              required: "Iltimos mahsulot nomini kiriting",
            })}
          />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title.message}</span>
          )}
        </label>
        <label
          htmlFor="price_received"
          className="flex flex-col gap-1 col-span-1"
        >
          Sotib olingan narx
          <input
            type="text"
            id="price_received"
            className="rounded-lg border py-2 px-3 text-md focus:border-main-color focus:outline-none w-full"
            {...register("price_received", {
              required: "Iltimos sotib olingan narxni kriting",
            })}
          />
          {errors.price_received && (
            <span className="text-red-500 text-sm">
              {errors.price_received.message}
            </span>
          )}
        </label>
        <label htmlFor="expense" className="flex flex-col gap-1 col-span-1">
          Xarajat
          <input
            type="text"
            id="expense"
            className="rounded-lg border py-2 px-3 text-md focus:border-main-color focus:outline-none w-full"
            {...register("expense", { required: false })}
          />
        </label>
        <label htmlFor="imei" className="flex flex-col gap-1 col-span-1">
          IMEI yoki Shtrix raqami
          <input
            type="text"
            id="imei"
            className="rounded-lg border py-2 px-3 text-md focus:border-main-color focus:outline-none w-full"
            {...register("imei", {
              required: "Iltimos mahsulot imei yoki shtrix raqamini yozing",
            })}
          />
          {errors.imei && (
            <span className="text-red-500 text-sm">{errors.imei.message}</span>
          )}
        </label>
        <label
          htmlFor="percent_of_battery"
          className="flex flex-col gap-1 col-span-1"
        >
          Battareyka foizi
          <input
            type="text"
            id="percent_of_battery"
            className="rounded-lg border py-2 px-3 text-md focus:border-main-color focus:outline-none w-full"
            {...register("percent_of_battery", { required: false })}
          />
        </label>
        <label htmlFor="category" className="flex flex-col gap-1 col-span-1">
          Bo'lim nomi
          <select
            id="category"
            className="rounded-lg border py-2 px-3 text-md focus:border-main-color focus:outline-none w-full"
            {...register("category", {
              required: "Iltimos bo'lim nomini tanlang",
            })}
          >
            <option value="none">Hech Qanday</option>
            {categories.map((item) => (
              <option value={item._id} key={item._id}>
                {item.title}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="text-red-500 text-sm">
              {errors.category.message}
            </span>
          )}
        </label>
        <button
          type="submit"
          className="rounded-lg bg-main-color border p-2 text-lg w-full text-white font-semibold col-span-2 sx:col-span-1"
        >
          Qo'shish
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
