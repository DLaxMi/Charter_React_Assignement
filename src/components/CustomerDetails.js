import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { calculatePoints } from '../utils/rewards';
import { useCustomerRewards } from '../hooks/useCustomerRewards';

const Container = styled.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);
`;

const SectionTitle = styled.h2`
  margin-top: 0;
  color: #111827;
`;

const Summary = styled.div`
  margin-bottom: 24px;
`;

const SummaryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 12px;
`;

const SummaryItem = styled.li`
  margin-bottom: 8px;
  color: #334155;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 12px;
`;

const Th = styled.th`
  border-bottom: 2px solid #cbd5e1;
  padding: 10px;
  text-align: left;
  color: #1f2937;
`;

const Td = styled.td`
  border-bottom: 1px solid #e2e8f0;
  padding: 10px;
  color: #475569;
`;

const EmptyState = styled.p`
  margin: 0;
  color: #64748b;
`;

const CustomerDetails = ({ customer, transactions, selectedYear, selectedMonth }) => {
  if (!customer) {
    return null;
  }

  const { pointsPerMonth, totalPoints, filteredTransactions } = useCustomerRewards(
    transactions,
    customer,
    selectedYear,
    selectedMonth,
  );

  const renderSummaryItems = () => {
    return Object.entries(pointsPerMonth).map(([month, points]) => (
      <SummaryItem key={month}>
        {month}: {points} points
      </SummaryItem>
    ));
  };

  const renderTransactionRow = (transaction) => {
    const formattedDate = transaction.parsedDate.toLocaleDateString();
    const points = calculatePoints(transaction.amount);

    return (
      <tr key={transaction.transactionId}>
        <Td>{formattedDate}</Td>
        <Td>{transaction.transactionId}</Td>
        <Td>${transaction.amount.toFixed(2)}</Td>
        <Td>{points}</Td>
      </tr>
    );
  };

  const renderTransactions = () => {
    if (!selectedMonth) {
      return <EmptyState>Select a month to see detailed transactions.</EmptyState>;
    }

    if (filteredTransactions.length === 0) {
      return <EmptyState>No transactions found for {selectedMonth}.</EmptyState>;
    }

    return (
      <Table>
        <thead>
          <tr>
            <Th>Date</Th>
            <Th>Transaction ID</Th>
            <Th>Amount</Th>
            <Th>Points</Th>
          </tr>
        </thead>
        <tbody>{filteredTransactions.map(renderTransactionRow)}</tbody>
      </Table>
    );
  };

  return (
    <Container>
      <SectionTitle>Customer {customer} Details</SectionTitle>
      <Summary>
        <h3>Reward Points Summary for {selectedYear}</h3>
        <SummaryList>{renderSummaryItems()}</SummaryList>
        <p>
          <strong>Total Points: {totalPoints}</strong>
        </p>
      </Summary>
      <div>
        <h3>Transactions for {selectedMonth || 'Selected Month'}</h3>
        {renderTransactions()}
      </div>
    </Container>
  );
};

CustomerDetails.propTypes = {
  customer: PropTypes.string,
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      customerId: PropTypes.string.isRequired,
      transactionId: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      parsedDate: PropTypes.instanceOf(Date),
    }),
  ).isRequired,
  selectedYear: PropTypes.number.isRequired,
  selectedMonth: PropTypes.string,
};

export default CustomerDetails;