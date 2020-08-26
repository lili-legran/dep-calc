import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Button from '../../UI/Button/Button';
import './Results.scss';

const Results = (props) => {
  const { value, currentResult, rate } = props;
  return (
    <div className='results'>
      <h2>Результат</h2>
      <ul className='results__list'>
        <li className='results__field'>
          <span>Сумма вклада</span>
          <span>{`${value} руб.`}</span>
        </li>
        <li className='results__field'>
          <span>Процентная ставка</span>
          <span>{`${rate} %`}</span>
        </li>
        <li className='results__field'>
          <span>Начисленные проценты</span>
          <span>{`${currentResult} руб.`}</span>
        </li>
        <li className='results__field'>
          <span>Сумма вклада с процентами</span>
          <span>{`${value + currentResult} руб.`}</span>
        </li>
      </ul>
      <NavLink to='/pdf'>
        <Button disabled={false} text='Распечатать' />
      </NavLink>
    </div>
  );
};

export default Results;

Results.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired,
  currentResult: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired
};
