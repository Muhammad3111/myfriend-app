import React, { useState } from "react";
import Modal from "../Modal";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../../apiClient";
import { toast } from "react-toastify";

export type UpdateCategoryTypes = {
  _id: string;
  title: string;
};

const UpdateCategory = ({ _id, title }: UpdateCategoryTypes) => {
  const [show, setShow] = useState<boolean>(false);
  const [updateTitle, setUpdateTitle] = useState(title);
  const queryClient = useQueryClient();

  const UpdateMutation = useMutation({
    mutationFn: apiClient.updateCategory,
    onSuccess: async () => {
      toast.success("Bo'lim nomi o'zgartirildi");
      await queryClient.invalidateQueries({ queryKey: ["Categories"] });
    },
    onError: () => {
      toast.error("Bo'lim nomini o'zgartirishda xatolik yuz berdi");
    },
  });

  const openModal = () => setShow(!show);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    UpdateMutation.mutate({ _id, title: updateTitle });
    openModal();
  };

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
              Bo'lim nomini yozing
              <input
                type="text"
                value={updateTitle}
                id="title"
                className="rounded-lg border py-2 px-3 text-md focus:border-main-color focus:outline-none w-full"
                onChange={(e) => setUpdateTitle(e.target.value)}
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

export default UpdateCategory;
