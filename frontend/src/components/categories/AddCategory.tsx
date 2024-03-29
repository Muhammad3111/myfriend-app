import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as apiClient from "../../apiClient";
import { toast } from "react-toastify";

export type CategoryTypes = {
  title: string;
};

const AddCategory = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryTypes>();
  const queryClient = useQueryClient();
  const categoryMutation = useMutation({
    mutationFn: apiClient.addCategory,
    onSuccess: async () => {
      toast.success("Bo'lim qo'shildi");
      await queryClient.invalidateQueries({ queryKey: ["Categories"] });
    },
    onError: () => {
      toast.error("Bo'lim qo'shishda xatolik yuz berdi");
    },
  });

  const onSubmit = handleSubmit((data) => {
    categoryMutation.mutate(data);
    reset();
  });

  return (
    <div className="flex flex-col w-full px-4">
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <label htmlFor="title" className="flex flex-col gap-1">
          Bo'lim nomini yozing
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

export default AddCategory;
