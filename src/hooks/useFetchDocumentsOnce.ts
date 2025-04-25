import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import { WhereFilterOp } from "firebase/firestore";
import { collection, getDocs, query, where, orderBy, limit } from "firebase/firestore";

export function useFetchDocumentsOnce<T = any>(collectionName: string, conditions: { field: string; op: WhereFilterOp; value: any }[] = [], orderField?: string) {
  const [document, setDocument] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);

      try {
        let q = query(collection(db, collectionName));

        // Aplica filtros (where)
        conditions.forEach(({ field, op, value }) => {
          q = query(q, where(field, op, value));
        });

        // Aplica ordenação se necessário
        if (orderField) {
          q = query(q, orderBy(orderField));
        }

        // Limita a consulta para retornar apenas o primeiro documento encontrado
        q = query(q, limit(1));

        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          // Se houver documentos, pegue o primeiro
          const firstDoc = snapshot.docs[0];
          setDocument({ id: firstDoc.id, ...firstDoc.data() } as T);
        } else {
          // Se nenhum documento corresponder às condições
          setDocument(null);
        }
      } catch (err: any) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [collectionName, JSON.stringify(conditions), orderField]);

  return { document, loading, error };
}
