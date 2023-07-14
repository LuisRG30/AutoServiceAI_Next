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

export function VerifiedRoute() {
  const { push } = useRouter();
  const { user } = useContext(AuthContext);
  const { profile } = useContext(UserContext);
  if (!user) {
    return push("/login");
  }
  if (profile) {
    if (!profile.verified) {
      return push("/verify");
    }
  }
}

export function OnboardingRoute() {
  const { push } = useRouter();
  const { user } = useContext(AuthContext);
  const { profile } = useContext(UserContext);

  if (!user) {
    return push("/login");
  }
  if (profile) {
    if (!profile.verified) {
      return push("/verify");
    }
    if (!profile.onboarded) {
      return push("/onboarding");
    }
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
    if (!profile.verified) {
      return push("/verify");
    }
    if (!profile.admin) {
      return push("/");
    }
  }
}
