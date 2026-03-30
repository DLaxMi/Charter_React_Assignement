import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Filters from './components/Filters';
import CustomerSelect from './components/CustomerSelect';
import CustomerDetails from './components/CustomerDetails';
import { useTransactions } from './hooks/useTransactions';
import { DEFAULT_YEAR } from './constants';

// Main application container for rewards dashboard.

const PageWrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Header = styled.header`
  margin-bottom: 24px;
  text-align: center;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2rem;
  color: #1f2937;
`;

const PageControls = styled.div`
  display: grid;
  gap: 20px;
  margin-bottom: 32px;

  @media (min-width: 720px) {
    grid-template-columns: 1fr 1fr;
  }
`;

function App() {
  const { transactions, customers, loading, error } = useTransactions();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedYear, setSelectedYear] = useState(DEFAULT_YEAR);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const handleCustomerSelect = useCallback((customer) => {
    setSelectedCustomer(customer);
  }, []);

  // Reset month and customer selection when the year changes.
  const handleYearChange = useCallback((year) => {
    setSelectedYear(year);
    setSelectedMonth(null);
    setSelectedCustomer(null);
  }, []);

  const handleMonthChange = useCallback((month) => {
    setSelectedMonth(month);
  }, []);

  if (loading) {
    return <PageWrapper>Loading rewards data…</PageWrapper>;
  }

  if (error) {
    return <PageWrapper>Error loading data: {error}</PageWrapper>;
  }

  return (
    <PageWrapper>
      <Header>
        <Title>Rewards Program Dashboard</Title>
        <p>Choose a year, month, and customer to inspect reward points and transaction history.</p>
      </Header>

      <PageControls>
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
      </PageControls>

      <CustomerDetails
        customer={selectedCustomer}
        transactions={transactions}
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
      />
    </PageWrapper>
  );
}

export default App;
