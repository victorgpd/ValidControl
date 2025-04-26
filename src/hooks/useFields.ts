import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useCallback, useState } from "react";
import { db } from "../firebase/config";
import { ProductType, ValidityType } from "../types/types";

export const useFields = (collectionName: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addItemToArray = useCallback(
    async (docId: string, field: string, itemToAdd: ProductType | ValidityType) => {
      setLoading(true);
      setError(null);
      try {
        const docRef = doc(db, collectionName, docId);
        await updateDoc(docRef, {
          [field]: arrayUnion(itemToAdd),
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
    async (docId: string, field: string, newValue: ProductType[] | ValidityType[]) => {
      setLoading(true);
      setError(null);
      try {
        const docRef = doc(db, collectionName, docId);
        await updateDoc(docRef, {
          [field]: newValue,
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
      setLoading(true);
      setError(null);
      try {
        const docRef = doc(db, collectionName, docId);
        await updateDoc(docRef, {
          [field]: arrayRemove(itemToRemove),
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
