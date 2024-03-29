import React, { useState } from "react";
import Modal from "../Modal";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../../apiClient";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

type CategoryTypes = {
  _id: string;
  title: string;
};

export type UpdateProductTypes = {
  _id: string;
  title: string;
  price_received: number;
  expense: number;
  price: number;
  imei: number;
  percent_of_battery: string;
  category: string;
};

const UpdateProduct = ({ ...restProps }: UpdateProductTypes) => {
  const [show, setShow] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm<UpdateProductTypes>({
    defaultValues: {
      _id: restProps._id,
      title: restProps.title,
      price_received: restProps.price_received,
      expense: restProps.expense,
      price: restProps.price,
      imei: restProps.imei,
      percent_of_battery: restProps.percent_of_battery,
      category: restProps.category,
    },
  });
  const { data, isLoading } = useQuery({
    queryKey: ["Categories"],
    queryFn: apiClient.getCategory,
  });

  const UpdateProduct = useMutation({
    mutationFn: apiClient.updateProduct,
    onSuccess: async () => {
      toast.success("Mahsulot nomi o'zgartirildi");
      await queryClient.invalidateQueries({ queryKey: ["Products"] });
    },
    onError: () => {
      toast.error("Mahsulot nomini o'zgartirishda xatolik yuz berdi");
    },
  });

  const openModal = () => setShow(!show);

  const onSubmit = handleSubmit((data) => {
    UpdateProduct.mutate(data);
    openModal();
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const categories: CategoryTypes[] = data;

  return (
    <div>
      <button
        className="p-1.5 rounded-full bg-blue-500 text-white text-lg"
        onClick={() => openModal()}
      >
        <MdOutlineModeEditOutline />
      </button>
      {show && (
        <Modal close={() => openModal()}>
          <form className="grid grid-cols-2 gap-2" onSubmit={onSubmit}>
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
            <label
              htmlFor="category"
              className="flex flex-col gap-1 col-span-1"
            >
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
            </label>
            <button
              type="submit"
              className="rounded-lg bg-main-color border p-2 text-lg w-full text-white font-semibold col-span-2"
            >
              Saqlash
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default UpdateProduct;
