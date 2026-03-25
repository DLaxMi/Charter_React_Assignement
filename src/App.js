import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Filters from './components/Filters';
import CustomerSelect from './components/CustomerSelect';
import CustomerDetails from './components/CustomerDetails';
import { fetchTransactions } from './services/api';
import { DEFAULT_YEAR } from './constants';

const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedYear, setSelectedYear] = useState(DEFAULT_YEAR);
  const [selectedMonth, setSelectedMonth] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTransactions();
        setTransactions(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const customers = [...new Set(transactions.map(t => t.customerId))].sort();

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
    console.log('Selected customer:', customer);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setSelectedMonth(null);
    setSelectedCustomer(null);
    console.log('Year changed to:', year);
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    console.log('Month changed to:', month);
  };

  if (loading) return <Container>Loading...</Container>;
  if (error) return <Container>Error: {error}</Container>;

  return (
    <Container>
      <h1>Rewards Program</h1>
      <Filters
        selectedYear={selectedYear}
        onYearChange={handleYearChange}
        selectedMonth={selectedMonth}
        onMonthChange={handleMonthChange}
      />
      <CustomerSelect
        customers={customers}
        selectedCustomer={selectedCustomer}
        onCustomerSelect={handleCustomerSelect}
      />
      <CustomerDetails
        customer={selectedCustomer}
        transactions={transactions}
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
      />
    </Container>
  );
}

export default App;
