// src/hooks/useDocument.ts
import { useState, useCallback } from "react";
import { db } from "../firebase/config";
import { addDoc, collection, doc, updateDoc, Timestamp } from "firebase/firestore";

interface UseDocumentResult<T> {
  insertDocument: (doc: T) => Promise<void>;
  updateDocument: (id: string, data: Partial<T>) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function useDocument<T = any>(collectionName: string): UseDocumentResult<T> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const insertDocument = useCallback(
    async (doc: T) => {
      setLoading(true);
      setError(null);
      try {
        await addDoc(collection(db, collectionName), {
          ...doc,
          createdAt: Timestamp.now(),
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [collectionName]
  );

  const updateDocument = useCallback(
    async (id: string, data: Partial<T>) => {
      setLoading(true);
      setError(null);
      try {
        const docRef = doc(db, collectionName, id);
        await updateDoc(docRef, {
          ...data,
          updatedAt: Timestamp.now(),
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [collectionName]
  );

  return { insertDocument, updateDocument, loading, error };
}
