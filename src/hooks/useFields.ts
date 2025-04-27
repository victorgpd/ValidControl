import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useCallback, useState } from "react";
import { db } from "../firebase/config";
import { useAppSelector } from "./store";

export const useFields = (collectionName: string) => {
  const { user, loja } = useAppSelector((state) => state.globalReducer);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addItemToArray = useCallback(
    async (docId: string, field: string, itemToAdd: any | any[]) => {
      let fieldValue;

      if (field === "products") {
        fieldValue = "Produtos";
      } else if (field === "validitys") {
        fieldValue = "Validades";
      } else if (field === "access") {
        fieldValue = "Usuários";
      }

      setLoading(true);
      setError(null);
      try {
        const docRef = doc(db, collectionName, docId);
        await updateDoc(docRef, {
          [field]: Array.isArray(itemToAdd) ? arrayUnion(...itemToAdd) : arrayUnion(itemToAdd),
          logs: arrayUnion({
            id: loja?.logs?.length ? loja.logs[loja.logs.length - 1].id + 1 : 1,
            user: user?.email,
            date: new Date().toLocaleString(),
            action: `Cadastro de ${fieldValue}`,
            data: itemToAdd,
          }),
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [collectionName]
  );

  const updateFieldValue = useCallback(
    async (docId: string, field: string, newValue: any[], editField: any) => {
      let fieldValue;

      if (field === "products") {
        fieldValue = "Produtos";
      } else if (field === "validitys") {
        fieldValue = "Validades";
      } else if (field === "access") {
        fieldValue = "Usuários";
      }

      setLoading(true);
      setError(null);
      try {
        const docRef = doc(db, collectionName, docId);
        await updateDoc(docRef, {
          [field]: newValue,
          logs: arrayUnion({
            id: loja?.logs?.length ? loja.logs[loja.logs.length - 1].id + 1 : 1,
            user: user?.email,
            date: new Date().toLocaleString(),
            action: `Edição de ${fieldValue}`,
            data: editField,
          }),
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [collectionName]
  );

  const removeItemFromArray = useCallback(
    async (docId: string, field: string, itemToRemove: any) => {
      let fieldValue;

      if (field === "products") {
        fieldValue = "Produtos";
      } else if (field === "validitys") {
        fieldValue = "Validades";
      } else if (field === "access") {
        fieldValue = "Usuários";
      }

      setLoading(true);
      setError(null);
      try {
        const docRef = doc(db, collectionName, docId);
        await updateDoc(docRef, {
          [field]: arrayRemove(itemToRemove),
          logs: arrayUnion({
            id: loja?.logs?.length ? loja.logs[loja.logs.length - 1].id + 1 : 1,
            user: user?.email,
            date: new Date().toLocaleString(),
            action: `Remocão de ${fieldValue}`,
            data: itemToRemove,
          }),
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [collectionName]
  );

  return { removeItemFromArray, addItemToArray, updateFieldValue, loading, error };
};
