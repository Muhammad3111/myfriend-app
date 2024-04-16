import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import LoginIMG from "../assets/fon.svg";
import * as apiClient from "../apiClient";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AuthContext";

export type FormTypes = {
  email: string;
  password: string;
};

function LoginForm() {
  const [showPassowrd, setShowPassword] = useState<boolean>(false);
  const { setToken } = useAppContext();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormTypes>();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: apiClient.signIn,
    onSuccess: async (data) => {
      toast.success("Kirish bajarildi");
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      navigate("/dashboard");
      setToken(data?.secretKey);
    },
    onError: () => {
      toast.error("Kirish bajarilmadi");
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="bg-white rounded-3xl flex shadow-lg overflow-hidden border">
      <div className="flex flex-col gap-4 p-20 sx:p-10">
        <h1 className="text-black text-4xl text-center font-bold">
          Xush kelibsiz
        </h1>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <label htmlFor="email" className="flex flex-col gap-1">
            Elektron pochta
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Elektron pochta yozishilishi shart!!!",
              })}
              className="border rounded-md p-3 text-md text-black focus:outline-main-color w-full bg-gray-100"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </label>
          <label htmlFor="passowrd" className="relative select-none">
            Parol
            {showPassowrd ? (
              <FiEye
                className="absolute top-10 right-3 text-lg cursor-pointer z-10"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FiEyeOff
                className="absolute top-10 right-3 text-lg cursor-pointer z-10"
                onClick={() => setShowPassword(true)}
              />
            )}
            <input
              type={showPassowrd ? "text" : "password"}
              id="password"
              {...register("password", { required: "Parol yozilishi shart" })}
              className="border rounded-md p-3 text-md text-black focus:outline-main-color w-full bg-gray-100"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </label>
          <button
            type="submit"
            className="border rounded-md p-3 text-md text-white bg-main-color w-full"
          >
            Kirish
          </button>
        </form>
      </div>
      <div className="bg-gray-100 p-20 sx:hidden">
        <img src={LoginIMG} alt="login-img" className="w-full h-full" />
      </div>
    </div>
  );
}

export default LoginForm;
