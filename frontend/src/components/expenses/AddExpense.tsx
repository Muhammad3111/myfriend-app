import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as apiClient from "../../apiClient";
import { toast } from "react-toastify";

export type ExpenseTypes = {
  _id: string;
  title: string;
  amount: number;
};

const AddExpense = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExpenseTypes>();
  const queryClient = useQueryClient();
  const expenseMutation = useMutation({
    mutationFn: apiClient.addExpense,
    onSuccess: async () => {
      toast.success("Chiqim qo'shildi");
      await queryClient.invalidateQueries({ queryKey: ["Expenses"] });
    },
    onError: () => {
      toast.error("Chiqim qo'shishda xatolik yuz berdi");
    },
  });

  const onSubmit = handleSubmit((data) => {
    expenseMutation.mutate(data);
    reset();
  });

  return (
    <div className="flex flex-col w-full px-4">
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <label htmlFor="title" className="flex flex-col gap-1">
          Chiqim nomini yozing
          <input
            type="text"
            id="title"
            className="rounded-lg border py-2 px-3 text-md focus:border-main-color focus:outline-none w-full"
            {...register("title", {
              required: "Iltimos bo'lim nomini kiriting",
            })}
          />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title.message}</span>
          )}
        </label>
        <label htmlFor="amount" className="flex flex-col gap-1">
          Chiqim miqdorini
          <input
            type="number"
            id="amount"
            className="rounded-lg border py-2 px-3 text-md focus:border-main-color focus:outline-none w-full"
            {...register("amount", {
              required: "Iltimos chiqim qiymatini kiriting",
            })}
          />
          {errors.amount && (
            <span className="text-red-500 text-sm">
              {errors.amount.message}
            </span>
          )}
        </label>
        <button
          type="submit"
          className="rounded-lg bg-main-color border p-2 text-lg w-full text-white font-semibold"
        >
          Qo'shish
        </button>
      </form>
    </div>
  );
};

export default AddExpense;
