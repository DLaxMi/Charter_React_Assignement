export const fetchTransactions = async () => {
  try {
    const response = await fetch('/data/transactions.json');
    if (!response.ok) {
      throw new Error('Failed to fetch transactions');
    }
    const data = await response.json();
    console.log('Fetched transactions:', data);
    return data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};