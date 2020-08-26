import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setPeriodValidation, setCurrentPeriodIndex, setShowResult } from '../../store/actions/actionCreators';
import './PeriodInput.scss';

class PeriodInput extends React.Component {
  componentDidUpdate(prevProps) {
    const {
      currentDepIndex,
      value,
      showResult,
      isTouched,
      setShowResult
    } = this.props;
    if (prevProps.value !== value && showResult) {
      setShowResult(false);
    }
    if (isTouched && prevProps.currentDepIndex !== currentDepIndex) {
      this.validationСheckHandler(value);
    }
  }

  setCurrentPeriodIndexHandler = (inputValue) => {
    const {
      deposits,
      currentDepIndex,
      setCurrentPeriodIndex
    } = this.props;
    const currentDepType = deposits[currentDepIndex];
    const currentParams = currentDepType.param;
    const currentPeriodValue = inputValue;
    let currentPeriodIndex;

    for (let i = currentParams.length - 1; i >= 0; i -= 1) {
      if (currentPeriodValue >= currentParams[i].period_from) {
        currentPeriodIndex = i;
        break;
      }
    }

    setCurrentPeriodIndex(currentPeriodIndex);
  }

  validationСheckHandler = (inputValue) => {
    const {
      deposits,
      currentDepIndex,
      setPeriodValidation
    } = this.props;
    const minPeriodValue = deposits[currentDepIndex].param[0].period_from;
    if (inputValue < minPeriodValue) {
      setPeriodValidation(false, `Период не может быть меньше ${minPeriodValue}`);
    } else {
      setPeriodValidation(true);

      this.setCurrentPeriodIndexHandler(inputValue);
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
      errorMessage,
      isValid,
      isTouched
    } = this.props;
    const inputType = 'periodFrom';
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
    value: state.period.value,
    showResult: state.results.showResult,
    isTouched: state.period.isTouched,
    label: state.period.label,
    errorMessage: state.period.errorMessage,
    isValid: state.period.isValid
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setPeriodValidation:
      (isValid, errorMessage) => dispatch(setPeriodValidation(isValid, errorMessage)),
    setCurrentPeriodIndex:
      (currentPeriodIndex) => dispatch(setCurrentPeriodIndex(currentPeriodIndex)),
    setShowResult: (showResult) => dispatch(setShowResult(showResult))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PeriodInput);

PeriodInput.propTypes = {
  deposits: PropTypes.arrayOf(
    PropTypes.shape({
      param: PropTypes.arrayOf(
        PropTypes.shape({
          period_from: PropTypes.number
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
  isTouched: PropTypes.bool.isRequired,
  showResult: PropTypes.bool.isRequired,
  setShowResult: PropTypes.func.isRequired,
  setCurrentPeriodIndex: PropTypes.func.isRequired,
  setPeriodValidation: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,

};
