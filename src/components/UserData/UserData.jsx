import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../../UI/Button/Button';
import Select from '../Select/Select';
import {
  setSumValue,
  setPeriodValue,
  setResults,
  setShowResult
} from '../../store/actions/actionCreators';
import './UserData.scss';
import SumInput from '../SumInput/SumInput';
import PeriodInput from '../PeriodInput/PeriodInput';

class UserData extends React.Component {
  setResultsHandler = () => {
    const {
      setResults,
      deposits,
      currentDepIndex,
      currentPeriodIndex,
      currentSumIndex,
      period,
      sum,
      setShowResult,
      setPeriodValue,
      setSumValue
    } = this.props;

    if (currentPeriodIndex !== -1 && currentSumIndex !== -1) {
      const currentRate = deposits[currentDepIndex]
        .param[currentPeriodIndex].summs_and_rate[currentSumIndex].rate;
      const currentResult = (sum.value * (currentRate / 100) * (period.value / 365)).toFixed(2);

      setResults(currentRate, Number(currentResult));
      setShowResult(true);
    } else {
      setPeriodValue('');
      setSumValue('');
    }
  }

  render() {
    const {
      setSumValue,
      setPeriodValue,
      sum,
      period
    } = this.props;
    return (
      <div className='user-data'>
        <form className='user-data__form'>
          <Select />
          <PeriodInput onChange={setPeriodValue} />
          <SumInput onChange={setSumValue} />
        </form>
        <Button
          text='Рассчитать'
          onClick={this.setResultsHandler}
          disabled={(sum.isTouched || period.isTouched) && (!sum.isValid || !period.isValid)}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    deposits: state.deposits,
    sum: state.sum,
    period: state.period,
    currentDepIndex: state.currentDepIndex,
    currentPeriodIndex: state.results.currentPeriodIndex,
    currentSumIndex: state.results.currentSumIndex,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSumValue: (value) => dispatch(setSumValue(value)),
    setPeriodValue: (value) => dispatch(setPeriodValue(value)),
    setResults: (rate, currentResult) => dispatch(setResults(rate, currentResult)),
    setShowResult: (showResult) => dispatch(setShowResult(showResult))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserData);

UserData.propTypes = {
  deposits: PropTypes.arrayOf(
    PropTypes.shape({
      param: PropTypes.arrayOf(
        PropTypes.shape({
          summs_and_rate: PropTypes.arrayOf(
            PropTypes.shape({
              rate: PropTypes.number
            })
          )
        })
      )
    })
  ).isRequired,
  sum: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    isTouched: PropTypes.bool.isRequired,
    isValid: PropTypes.bool.isRequired
  }).isRequired,
  period: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    isTouched: PropTypes.bool.isRequired,
    isValid: PropTypes.bool.isRequired
  }).isRequired,
  setSumValue: PropTypes.func.isRequired,
  setPeriodValue: PropTypes.func.isRequired,
  setResults: PropTypes.func.isRequired,
  setShowResult: PropTypes.func.isRequired,
  currentDepIndex: PropTypes.number.isRequired,
  currentPeriodIndex: PropTypes.number.isRequired,
  currentSumIndex: PropTypes.number.isRequired
};
