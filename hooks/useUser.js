import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { sessionChange } from "../firebase/services/auth";

export const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined,
  NOT_PROFILE: false,
};

// Hook que chequea si existe sesion, si no existe devuelve al usuario al inicio
export default function useUser() {
  const [user, setUser] = useState(USER_STATES.NOT_KNOWN);

  const router = useRouter();

  useEffect(() => {
    sessionChange(setUser);
  }, []);

  useEffect(() => {
    if (user === USER_STATES.NOT_LOGGED) {
      router.push("/");
    }
  }, [user]);

  return user;
}
