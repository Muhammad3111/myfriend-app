import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaRegUserCircle } from "react-icons/fa";
import * as apiClient from "../apiClient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function TopHeader() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const LogOutMutation = useMutation({
    mutationFn: apiClient.signOut,
    onSuccess: async () => {
      toast.success("Chiqish bajarildi");
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
    },
    onError: () => {
      toast.error("Chiqish bajarilmadi");
    },
  });

  const logOut = () => {
    LogOutMutation.mutate();
    navigate("/");
  };
  return (
    <div className="p-4 shadow-lg flex items-center justify-between">
      <div className="flex items-center gap-10">
        <button
          type="button"
          className="text-base rounded-lg border bg-red-500 text-white py-2 px-4"
          onClick={() => logOut()}
        >
          Chiqish
        </button>
      </div>
      <div className="flex items-center gap-4 relative">
        <h1 className="text-xl font-bold">Dilmurod</h1>
        <FaRegUserCircle className="text-4xl" />
      </div>
    </div>
  );
}
