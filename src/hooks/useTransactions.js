import { useEffect, useMemo, useState } from 'react';
import { fetchTransactions } from '../services/api';

export const useTransactions = () => {
  // Load transaction data once and keep parsed dates ready for filters.
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadTransactions = async () => {
      try {
        const data = await fetchTransactions();

        if (!isMounted) {
          return;
        }

        const normalizedData = data.map((item) => ({
          ...item,
          parsedDate: new Date(item.date),
        }));

        setTransactions(normalizedData);
      } catch (fetchError) {
        if (!isMounted) {
          return;
        }

        setError(fetchError.message || 'Unable to load transactions');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadTransactions();

    return () => {
      isMounted = false;
    };
  }, []);

  const customers = useMemo(() => {
    return [...new Set(transactions.map(({ customerId }) => customerId))].sort();
  }, [transactions]);

  return {
    transactions,
    customers,
    loading,
    error,
  };
};
