import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "./context/AuthContext";
import { toast } from "react-toastify";

type PrivateRouteProps = {
  children: React.ReactNode;
};

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { isLoggedIn } = useAppContext();

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("Foydalanuvchi tizimga kirmagan");
    }
  }, [isLoggedIn]);
  // isLoggedIn false bo'lsa Login sahifasiga otadi
  return isLoggedIn ? children : <Navigate to="/" replace />;
}
