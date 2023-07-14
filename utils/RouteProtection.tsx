import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import UserContext from "../context/UserContext";
import { useRouter } from "next/router";

export function ProtectedRoute() {
  const { push } = useRouter();
  const { user } = useContext(AuthContext);
  if (!user) {
    return push("/login");
  }
}


export function AdminRoute() {
  const { push } = useRouter();
  const { user } = useContext(AuthContext);
  const { profile } = useContext(UserContext);
  if (!user) {
    return push("/login");
  }
  if (profile) {
    if (!profile.admin) {
      return push("/");
    }
  }
}
