import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { calculatePoints } from '../utils/rewards';

const Container = styled.div`
  margin-bottom: 20px;
`;

const Summary = styled.div`
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

const CustomerDetails = ({ customer, transactions, selectedYear, selectedMonth }) => {
  if (!customer) return null;

  const customerTransactions = transactions.filter(t => t.customerId === customer && new Date(t.date).getFullYear() === selectedYear);

  const pointsPerMonth = customerTransactions.reduce((acc, t) => {
    const month = new Date(t.date).toLocaleString('default', { month: 'long' });
    const points = calculatePoints(t.amount);
    acc[month] = (acc[month] || 0) + points;
    return acc;
  }, {});

  const totalPoints = Object.values(pointsPerMonth).reduce((sum, p) => sum + p, 0);

  const filteredTransactions = selectedMonth ? customerTransactions.filter(t => new Date(t.date).toLocaleString('default', { month: 'long' }) === selectedMonth) : [];

  return (
    <Container>
      <h2>Customer {customer} Details</h2>
      <Summary>
        <h3>Reward Points Summary for {selectedYear}</h3>
        <ul>
          {Object.entries(pointsPerMonth).map(([month, points]) => (
            <li key={month}>{month}: {points} points</li>
          ))}
        </ul>
        <p><strong>Total Points: {totalPoints}</strong></p>
      </Summary>
      {selectedMonth && (
        <div>
          <h3>Transactions for {selectedMonth} {selectedYear}</h3>
          {filteredTransactions.length > 0 ? (
            <Table>
              <thead>
                <tr>
                  <Th>Transaction ID</Th>
                  <Th>Amount</Th>
                  <Th>Points</Th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map(t => (
                  <tr key={t.transactionId}>
                    <Td>{t.transactionId}</Td>
                    <Td>${t.amount.toFixed(2)}</Td>
                    <Td>{calculatePoints(t.amount)}</Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No transactions</p>
          )}
        </div>
      )}
    </Container>
  );
};

CustomerDetails.propTypes = {
  customer: PropTypes.string,
  transactions: PropTypes.arrayOf(PropTypes.shape({
    customerId: PropTypes.string.isRequired,
    transactionId: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
  })).isRequired,
  selectedYear: PropTypes.number.isRequired,
  selectedMonth: PropTypes.string,
};

export default CustomerDetails;