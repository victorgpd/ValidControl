// src/hooks/useRealtimeDocuments.ts
import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import { WhereFilterOp } from "firebase/firestore";
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore";

export function useRealtimeDocuments<T = any>(collectionName: string, conditions: { field: string; op: WhereFilterOp; value: any }[] = [], orderField?: string) {
  const [documents, setDocuments] = useState<T>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let q = query(collection(db, collectionName));

    conditions.forEach(({ field, op, value }) => {
      q = query(q, where(field, op, value));
    });

    if (orderField) {
      q = query(q, orderBy(orderField));
    }

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as T[];
        setDocuments(docs[0]);
        setLoading(false);
      },
      (err) => {
        console.error(err.message);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [collectionName, JSON.stringify(conditions), orderField]);

  return { documents, loading, error };
}
