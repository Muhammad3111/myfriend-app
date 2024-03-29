import { useState } from "react";
import Modal from "../Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../../apiClient";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

type UpdateProductTypes = {
  _id: string;
  title: string;
  price_received: number;
  expense: number;
  price: number;
  imei: number;
  percent_of_battery: string;
  category: string;
  sold: boolean;
};

const RestoreProduct = ({ ...restProps }: UpdateProductTypes) => {
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
      sold: false,
    },
  });

  const UpdateProduct = useMutation({
    mutationFn: apiClient.updateProduct,
    onSuccess: async () => {
      toast.success("Mahsulot qaytarildi");
      await queryClient.invalidateQueries({
        queryKey: ["Products"],
      });
      await queryClient.invalidateQueries({ queryKey: ["SoldProducts"] });
    },
    onError: () => {
      toast.error("Mahsulot qaytarishda xatolik yuz berdi");
    },
  });

  const openModal = () => setShow(!show);

  const onSubmit = handleSubmit((data) => {
    UpdateProduct.mutate(data);
    openModal();
  });

  return (
    <div>
      <button
        className="p-1 rounded-xl bg-green-500 text-white text-base"
        onClick={() => openModal()}
      >
        Qaytarish
      </button>
      {show && (
        <Modal close={() => openModal()}>
          <form className="grid grid-cols-2 gap-2" onSubmit={onSubmit}>
            <label htmlFor="price" className="flex flex-col gap-1 col-span-2">
              Mahsulot Narxi
              <input
                type="number"
                id="price"
                className="rounded-lg border py-2 px-3 text-md focus:border-main-color focus:outline-none w-full"
                {...register("price", { required: false })}
              />
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

export default RestoreProduct;
