import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MONTHS, YEARS } from '../constants';

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Filters = ({ selectedYear, onYearChange, selectedMonth, onMonthChange }) => {
  return (
    <Container>
      <div>
        <label>Year: </label>
        <Select value={selectedYear} onChange={(e) => onYearChange(parseInt(e.target.value))}>
          {YEARS.map(year => <option key={year} value={year}>{year}</option>)}
        </Select>
      </div>
      <div>
        <label>Month: </label>
        <Select value={selectedMonth || ''} onChange={(e) => onMonthChange(e.target.value || null)}>
          <option value="">All Months</option>
          {MONTHS.map(month => <option key={month} value={month}>{month}</option>)}
        </Select>
      </div>
    </Container>
  );
};

Filters.propTypes = {
  selectedYear: PropTypes.number.isRequired,
  onYearChange: PropTypes.func.isRequired,
  selectedMonth: PropTypes.string,
  onMonthChange: PropTypes.func.isRequired,
};

export default Filters;