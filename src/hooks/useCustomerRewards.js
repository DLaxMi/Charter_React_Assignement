import { useMemo } from 'react';
import { calculatePoints } from '../utils/rewards';

export const useCustomerRewards = (transactions, customer, selectedYear, selectedMonth) => {
  // Memoize computed customer reward summaries to avoid repeated recalculation.
  return useMemo(() => {
    if (!customer) {
      return {
        pointsPerMonth: {},
        totalPoints: 0,
        filteredTransactions: [],
      };
    }

    const customerTransactions = transactions.filter((item) => {
      return item.customerId === customer && item.parsedDate.getFullYear() === selectedYear;
    });

    const pointsPerMonth = customerTransactions.reduce((summary, item) => {
      const monthName = item.parsedDate.toLocaleString('default', { month: 'long' });
      summary[monthName] = (summary[monthName] || 0) + calculatePoints(item.amount);
      return summary;
    }, {});

    const filteredTransactions = selectedMonth
      ? customerTransactions.filter((item) => {
          return item.parsedDate.toLocaleString('default', { month: 'long' }) === selectedMonth;
        })
      : [];

    const totalPoints = Object.values(pointsPerMonth).reduce((sum, value) => sum + value, 0);

    return {
      pointsPerMonth,
      totalPoints,
      filteredTransactions,
    };
  }, [transactions, customer, selectedYear, selectedMonth]);
};
