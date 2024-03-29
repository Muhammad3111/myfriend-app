import { useState } from "react";
import Modal from "../Modal";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../../apiClient";
import { toast } from "react-toastify";
import { ExpenseTypes } from "./AddExpense";
import { useForm } from "react-hook-form";

const UpdateExpense = ({ _id, title, amount }: ExpenseTypes) => {
  const [show, setShow] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<ExpenseTypes>({
    defaultValues: {
      _id,
      title,
      amount,
    },
  });
  const queryClient = useQueryClient();

  const UpdateMutation = useMutation({
    mutationFn: apiClient.updateExpense,
    onSuccess: async () => {
      toast.success("Chiqim nomi o'zgartirildi");
      await queryClient.invalidateQueries({ queryKey: ["Expenses"] });
    },
    onError: () => {
      toast.error("Chiqim nomini o'zgartirishda xatolik yuz berdi");
    },
  });

  const openModal = () => setShow(!show);

  const onSubmit = handleSubmit((data) => {
    UpdateMutation.mutate(data);
    openModal();
  });

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
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <label htmlFor="title" className="flex flex-col gap-1">
              Chiqim nomini yozing
              <input
                type="text"
                id="title"
                className="rounded-lg border py-2 px-3 text-md focus:border-main-color focus:outline-none w-full"
                {...register("title", { required: false })}
              />
            </label>
            <label htmlFor="title" className="flex flex-col gap-1">
              Chiqim miqdori
              <input
                type="text"
                id="title"
                className="rounded-lg border py-2 px-3 text-md focus:border-main-color focus:outline-none w-full"
                {...register("amount", { required: false })}
              />
            </label>
            <button
              type="submit"
              className="rounded-lg bg-main-color border p-2 text-lg w-full text-white font-semibold"
            >
              Saqlash
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default UpdateExpense;
