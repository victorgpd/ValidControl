import { useEffect, useState } from "react";
import { app } from "../firebase/config";
import { AuthError, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { useAppDispatch } from "./store";
import { setUser } from "../redux/globalReducer/slice";
import { useNotification } from "./useNotification";
import { UserType } from "../types/types";
import { redirect } from "react-router-dom";
import { useDocument } from "./useDocument";
import { Timestamp } from "firebase/firestore";

const useAuthentication = () => {
  const dispatch = useAppDispatch();

  const { insertDocument } = useDocument("lojas");
  const { showNotification } = useNotification();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [cancelled, setCancelled] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const auth = getAuth(app);

  const login = async (email: string, password: string) => {
    if (cancelled) return;

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

      switch (erro.code) {
        case "auth/user-not-found":
          systemErrorMessage = "Usuário não encontrado.";
          break;
        case "auth/invalid-email":
          systemErrorMessage = "Email inválido.";
          break;
        case "auth/wrong-password":
          systemErrorMessage = "Senha incorreta.";
          break;
        case "auth/invalid-credential":
          systemErrorMessage = "Usuário ou senha incorretos.";
          break;
        default:
          systemErrorMessage = "Ocorreu um erro, por favor tente novamente mais tarde.";
      }

      showNotification("error", "Erro", systemErrorMessage);
      setError(systemErrorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    if (cancelled) return;

    dispatch(setUser({ name: null, email: null, uid: null }));
    signOut(auth);
  };

  const register = async (user: UserType) => {
    if (cancelled) return;

    setLoading(true);

    try {
      const { user: data } = await createUserWithEmailAndPassword(auth, user.email, user.password);

      await updateProfile(data, {
        displayName: user.name,
      });

      await insertDocument({
        store: user.nameStore,
        name: user.name,
        uid: data.uid,
        createdAt: Timestamp.now(),
        createdBy: user.email,
        products: [],
        validitys: [],
        access: [user.email],
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

      showNotification("error", "Erro", systemErrorMessage);
      setError(systemErrorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const watchAuthState = (navigate?: (path: string) => void) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({ name: user.displayName, email: user.email, uid: user.uid }));
        if (navigate) navigate("/");
      } else {
        dispatch(setUser({ name: null, email: null, uid: null }));
      }
    });

    return unsubscribe;
  };

  const verifyLoggedIn = async () => {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe(); // evitar múltiplas chamadas
        if (user) {
          dispatch(setUser({ name: user.displayName, email: user.email, uid: user.uid }));
          resolve(null); // deixa o loader continuar
        } else {
          dispatch(setUser({ name: null, email: null, uid: null }));
          resolve(redirect("/login")); // redireciona
        }
      });
    });
  };

  const verifyLogged = () => {
    setIsCheckingAuth(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({ name: user.displayName, email: user.email, uid: user.uid }));
      } else {
        dispatch(setUser({ name: null, email: null, uid: null }));
      }
      setIsCheckingAuth(false);
    });

    return null;
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return {
    login,
    logout,
    register,
    verifyLogged,
    verifyLoggedIn,
    watchAuthState,

    error,
    loading,
    isCheckingAuth,
  };
};

export default useAuthentication;
