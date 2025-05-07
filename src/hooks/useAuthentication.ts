import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { useAppDispatch } from "./store";
import { setUser } from "../redux/globalReducer/slice";
import { useNotification } from "./useNotification";
import { InformacoesType, UserType } from "../types/types";
import { redirect } from "react-router-dom";
import { useDocument } from "./useDocument";
import { Timestamp } from "firebase/firestore";
import { RoutesEnum } from "../enums/routes";
import { AuthError, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

const useAuthentication = () => {
  const dispatch = useAppDispatch();

  const { insertDocument: insertStore } = useDocument("lojas");
  const { showNotification } = useNotification();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [cancelled, setCancelled] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const login = async (email: string, password: string) => {
    if (cancelled) return;

    setLoading(true);
    setError(null);

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;

      dispatch(setUser({ name: user.displayName, email: user.email, uid: user.uid, image: user.photoURL }));
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

    dispatch(setUser({ name: null, email: null, uid: null, image: null }));
    signOut(auth);
  };

  const register = async (user: UserType) => {
    if (cancelled) return;

    setLoading(true);

    try {
      const { user: data } = await createUserWithEmailAndPassword(auth, user.email, user.password);

      await updateProfile(data, {
        displayName: user.name,
        photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name!)}`,
      });

      let loja: InformacoesType;
      if (user.name) {
        loja = {
          logs: [
            {
              id: 1,
              user: user.email,
              date: new Date().toLocaleString(),
              action: "Criação da loja",
              data: user.name,
            },
          ],
          products: [],
          validitys: [],
          name: user.name,
          lengthBarcode: 0,
          access: [user.email],
          createdBy: user.email,
          store: user.nameStore!,
          createdAt: Timestamp.now(),
          uid: data.uid,
        };
      } else {
        loja = {
          logs: [
            {
              id: 1,
              user: user.email,
              date: new Date().toLocaleString(),
              action: "Criação da loja",
              data: null,
            },
          ],
          name: null,
          products: [],
          validitys: [],
          uid: data.uid,
          lengthBarcode: 0,
          access: [user.email],
          createdBy: user.email,
          store: user.nameStore!,
          createdAt: Timestamp.now(),
        };
      }

      await insertStore(loja);

      dispatch(setUser({ name: data.displayName, email: data.email, uid: data.uid, image: null }));

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
        dispatch(setUser({ name: user.displayName, email: user.email, uid: user.uid, image: user.photoURL }));
        if (navigate) navigate(RoutesEnum.Home);
      } else {
        dispatch(setUser({ name: null, email: null, uid: null, image: null }));
      }
    });

    return unsubscribe;
  };

  const verifyLoggedIn = async () => {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        unsubscribe(); // evitar múltiplas chamadas
        if (user) {
          dispatch(setUser({ name: user.displayName, email: user.email, uid: user.uid, image: user.photoURL }));
          resolve(null); // deixa o loader continuar
        } else {
          dispatch(setUser({ name: null, email: null, uid: null, image: null }));
          resolve(redirect(RoutesEnum.Login)); // redireciona
        }
      });
    });
  };

  const verifyLogged = () => {
    setIsCheckingAuth(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser({ name: user.displayName, email: user.email, uid: user.uid, image: user.photoURL }));
      } else {
        dispatch(setUser({ name: null, email: null, uid: null, image: null }));
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
