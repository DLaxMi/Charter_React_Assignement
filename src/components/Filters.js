import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { MONTHS, YEARS } from '../constants';

const Container = styled.div`
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 18px;
  display: grid;
  gap: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #334155;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  background: #ffffff;
  color: #0f172a;
`;

const controlOptions = (values) => values.map((value) => (
  <option key={value} value={value}>
    {value}
  </option>
));

const Filters = ({ selectedYear, onYearChange, selectedMonth, onMonthChange }) => {
  const handleYearChange = (event) => {
    onYearChange(parseInt(event.target.value, 10));
  };

  const handleMonthChange = (event) => {
    onMonthChange(event.target.value || null);
  };

  const renderYearOptions = () => controlOptions(YEARS);

  const renderMonthOptions = () => controlOptions(MONTHS);

  return (
    <Container>
      <div>
        <Label htmlFor="year-select">Year</Label>
        <Select id="year-select" value={selectedYear} onChange={handleYearChange}>
          {renderYearOptions()}
        </Select>
      </div>
      <div>
        <Label htmlFor="month-select">Month</Label>
        <Select id="month-select" value={selectedMonth || ''} onChange={handleMonthChange}>
          <option value="">All Months</option>
          {renderMonthOptions()}
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