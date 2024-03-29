import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import Modal from "../Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as apiClient from "../../apiClient";
import { toast } from "react-toastify";

type Id = {
  id: string;
};

export default function DeleteProduct({ id }: Id) {
  const [show, setShow] = useState<boolean>(false);
  const openModal = () => {
    setShow(!show);
  };
  const queryClient = useQueryClient();

  const DeleteMutation = useMutation({
    mutationFn: apiClient.deletedProduct,
    onSuccess: async () => {
      toast.success("Mahsulot o'chirib yuborildi");
      await queryClient.invalidateQueries({ queryKey: ["Products"] });
    },
    onError: () => {
      toast.error("Mahsulotni o'chirshda xatolik");
    },
  });

  const deleteCategory = () => {
    DeleteMutation.mutate(id);
    setShow(false);
  };
  return (
    <div>
      <button
        className="p-1.5 rounded-full bg-red-500 text-white text-lg"
        onClick={() => openModal()}
      >
        <FaRegTrashAlt />
      </button>
      {show && (
        <Modal close={() => openModal()}>
          <div className="flex flex-col gap-4 p-4">
            <h1 className="text-black text-lg font-semibold">
              Rostdanham ushbu mahsulotni o'chirmoqchimisiz
            </h1>
            <div className="flex gap-4 items-center">
              <button
                className="bg-green-500 rounded-lg border text-lg text-white py-2 px-4"
                onClick={() => deleteCategory()}
              >
                Ha
              </button>
              <button
                className="bg-red-500 rounded-lg border text-lg text-white py-2 px-4"
                onClick={() => openModal()}
              >
                Yo'q
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
