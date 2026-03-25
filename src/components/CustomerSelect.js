import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  margin-bottom: 20px;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
`;

const CustomerSelect = ({ customers, selectedCustomer, onCustomerSelect }) => {
  return (
    <Container>
      <h2>Select Customer</h2>
      <Select value={selectedCustomer || ''} onChange={(e) => onCustomerSelect(e.target.value || null)}>
        <option value="">Select a customer</option>
        {customers.map(customer => (
          <option key={customer} value={customer}>{customer}</option>
        ))}
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