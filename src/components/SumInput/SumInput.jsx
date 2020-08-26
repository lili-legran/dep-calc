import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setSumValidation, setCurrentSumIndex, setShowResult } from '../../store/actions/actionCreators';
import './SumInput.scss';

class SumInput extends React.Component {
  componentDidUpdate(prevProps) {
    const {
      currentDepIndex,
      value,
      showResult,
      isTouched,
      currentPeriodIndex,
      setShowResult
    } = this.props;

    if (prevProps.value !== value && showResult) {
      setShowResult(false);
    }
    if (isTouched
      && (prevProps.currentDepIndex !== currentDepIndex
        || prevProps.currentPeriodIndex !== currentPeriodIndex)
    ) {
      this.validationСheckHandler(value);
    }
  }

  setCurrentSumIndexHandler = (inputValue) => {
    const {
      deposits,
      currentDepIndex,
      setCurrentSumIndex,
      currentPeriodIndex
    } = this.props;

    if (currentPeriodIndex > -1) {
      const currentDepType = deposits[currentDepIndex];
      const currentParams = currentDepType.param;

      const currentPeriodParams = currentParams[currentPeriodIndex];
      const surrentSummsAndRate = currentPeriodParams.summs_and_rate;
      const currentSumValue = inputValue;

      let currentSumIndex;

      for (let i = surrentSummsAndRate.length - 1; i >= 0; i -= 1) {
        if (currentSumValue >= surrentSummsAndRate[i].summ_from) {
          currentSumIndex = i;
          break;
        }
      }

      setCurrentSumIndex(currentSumIndex);
    }
  }

  validationСheckHandler = (inputValue) => {
    const {
      deposits,
      currentDepIndex,
      setSumValidation,
      results
    } = this.props;

    const currentPeriodIndex = results.currentPeriodIndex > -1
      ? results.currentPeriodIndex
      : 0;
    const minSumValue = deposits[currentDepIndex]
      .param[currentPeriodIndex].summs_and_rate[0].summ_from;

    if (inputValue < minSumValue) {
      if (results.currentPeriodIndex === -1) {
        setSumValidation(false, '');
      } else {
        setSumValidation(false, `Сумма не может быть меньше ${minSumValue}`);
      }
    } else {
      setSumValidation(true);

      this.setCurrentSumIndexHandler(inputValue);
    }
  }

  changeHandler = (e) => {
    const { onChange } = this.props;
    const inputValue = e.target.value;
    const isNumber = inputValue.match(/^\d*$/);
    if (isNumber) {
      onChange(Number(inputValue));
      this.validationСheckHandler(Number(inputValue));
    }
  }

  render() {
    const {
      label,
      value,
      isValid,
      errorMessage,
      isTouched
    } = this.props;
    const inputType = 'sumFrom';
    return (
      <div className='field'>
        <label htmlFor={inputType} className='field__label'>{label}</label>
        <input
          type='text'
          className={`field__input ${!isValid && isTouched ? 'field__error-input' : null}`}
          id={inputType}
          value={value}
          onChange={this.changeHandler}
        />
        {
          !isValid
            ? <p className='field__error-message'>{errorMessage}</p>
            : null
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    deposits: state.deposits,
    currentDepIndex: state.currentDepIndex,
    results: state.results,
    period: state.period,
    currentPeriodIndex: state.results.currentPeriodIndex,
    sum: state.sum,
    value: state.sum.value,
    label: state.sum.label,
    errorMessage: state.sum.errorMessage,
    isValid: state.sum.isValid,
    showResult: state.sum.showResult,
    isTouched: state.sum.isTouched
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSumValidation: (isValid, errorMessage) => dispatch(setSumValidation(isValid, errorMessage)),
    setCurrentSumIndex: (currentSumIndex) => dispatch(setCurrentSumIndex(currentSumIndex)),
    setShowResult: (showResult) => dispatch(setShowResult(showResult))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SumInput);

SumInput.propTypes = {
  deposits: PropTypes.arrayOf(
    PropTypes.shape({
      param: PropTypes.arrayOf(
        PropTypes.shape({
          summs_and_rate: PropTypes.arrayOf(
            PropTypes.shape({
              summ_from: PropTypes.number,
              rate: PropTypes.number
            })
          )
        })
      )
    })
  ).isRequired,
  currentDepIndex: PropTypes.number.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired,
  label: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  isValid: PropTypes.bool.isRequired,
  showResult: PropTypes.bool,
  isTouched: PropTypes.bool.isRequired,
  currentPeriodIndex: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  setShowResult: PropTypes.func.isRequired,
  setCurrentSumIndex: PropTypes.func.isRequired,
  setSumValidation: PropTypes.func.isRequired,
  results: PropTypes.shape({
    currentPeriodIndex: PropTypes.number
  }).isRequired,
};
