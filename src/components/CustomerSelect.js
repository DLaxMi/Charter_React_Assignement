import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 18px;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.08);
`;

const Title = styled.h2`
  margin: 0 0 12px;
  font-size: 1.05rem;
  color: #0f172a;
`;

const Select = styled.select`
  width: 100%;
  max-width: 320px;
  padding: 10px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  background: #f8fafc;
  color: #0f172a;
`;

const renderCustomerOptions = (customersList) => (
  customersList.map((customer) => (
    <option key={customer} value={customer}>
      {customer}
    </option>
  ))
);

const CustomerSelect = ({ customers, selectedCustomer, onCustomerSelect }) => {
  const handleChange = (event) => {
    onCustomerSelect(event.target.value || null);
  };

  return (
    <Container>
      <Title>Customer</Title>
      <Select value={selectedCustomer || ''} onChange={handleChange}>
        <option value="">Select a customer</option>
        {renderCustomerOptions(customers)}
      </Select>
    </Container>
  );
};

CustomerSelect.propTypes = {
  customers: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCustomer: PropTypes.string,
  onCustomerSelect: PropTypes.func.isRequired,
};

export default CustomerSelect;