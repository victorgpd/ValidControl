import { db } from "../firebase/config";
import { useEffect, useState, useCallback } from "react";
import { WhereFilterOp } from "firebase/firestore";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";

type WithId<T> = T & { id: string };

export function useFetchDocumentsOnce<T = any>(collectionName: string, conditions: { field: string; op: WhereFilterOp; value: any }[] = [], orderField?: string) {
  const [document, setDocument] = useState<WithId<T> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDocument = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let q = query(collection(db, collectionName));

      conditions.forEach(({ field, op, value }) => {
        q = query(q, where(field, op, value));
      });

      if (orderField) {
        q = query(q, orderBy(orderField));
      }

      q = query(q, limit(1));

      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const firstDoc = snapshot.docs[0];
        setDocument({ id: firstDoc.id, ...firstDoc.data() } as WithId<T>);
      } else {
        setDocument(null);
      }
    } catch (err: any) {
      console.error(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [collectionName, JSON.stringify(conditions), orderField]);

  useEffect(() => {
    fetchDocument(); // chama automaticamente na primeira vez
  }, [fetchDocument]);

  return { document, loading, error, fetchDocument };
}
