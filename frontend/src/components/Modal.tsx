import React from "react";
import { IoMdClose } from "react-icons/io";

type ModalType = {
  children: React.ReactNode;
  close: () => void;
};

export default function Modal({ children, close }: ModalType) {
  return (
    <div className="fixed left-0 top-0 h-screen w-screen bg-black/30 flex items-center justify-center">
      <div className="p-4 bg-white border rounded-lg">
        <div className="flex justify-end items-center">
          <IoMdClose
            className="text-lg text-black cursor-pointer"
            onClick={close}
          />
        </div>
        {children}
      </div>
    </div>
  );
}
