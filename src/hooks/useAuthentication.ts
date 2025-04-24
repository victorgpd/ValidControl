import { useEffect, useState } from "react";
import { app } from "../firebase/config";
import { AuthError, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { useAppDispatch } from "./store";
import { setUser } from "../redux/globalReducer/slice";
import { useNotification } from "./useNotification";
import { UserType } from "../types/types";

const useAuthentication = () => {
  const dispatch = useAppDispatch();
  const { showNotification } = useNotification();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth(app);

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  const login = async (email: string, password: string) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(null);

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      dispatch(setUser({ name: user.displayName, email: user.email, uid: user.uid }));
      showNotification("success", "Sucesso", "Login realizado com sucesso.");

      return true;
    } catch (erro: AuthError | any) {
      let systemErrorMessage: string;

      if (erro.message.includes("user-not-found")) {
        systemErrorMessage = "Usuário não encontrado.";
      } else if (erro.message.includes("auth/invalid-email")) {
        systemErrorMessage = "Email inválido.";
      } else if (erro.message.includes("auth/invalid-credential")) {
        systemErrorMessage = "Usuário não encontrado ou senha incorreta.";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tente novamente mais tarde.";
      }

      showNotification("error", "Erro", `${systemErrorMessage}`);
      setError(systemErrorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    checkIfIsCancelled();

    signOut(auth);
  };

  const register = async (user: UserType) => {
    checkIfIsCancelled();

    setLoading(true);

    try {
      const { user: data } = await createUserWithEmailAndPassword(auth, user.email, user.password);

      await updateProfile(data, {
        displayName: user.name,
      });

      dispatch(setUser({ name: data.displayName, email: data.email, uid: data.uid }));
      showNotification("success", "Sucesso", "Cadastro realizado com sucesso.");

      return true;
    } catch (erro: AuthError | any) {
      let systemErrorMessage;

      if (erro.message.includes("Password")) {
        systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
      } else if (erro.message.includes("email-already")) {
        systemErrorMessage = "E-mail já cadastrado.";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tente novamente mais tarde.";
      }

      showNotification("error", "Erro", `${systemErrorMessage}`);
      setError(systemErrorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    login,
    logout,
    register,

    error,
    loading,
  };
};

export default useAuthentication;
