import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  setCurrentDepIndex,
  setCurrentPeriodIndex,
  setCurrentSumIndex,
  setShowResult
} from '../../store/actions/actionCreators';
import './Select.scss';

class Select extends React.Component {
  componentDidUpdate(prevProps) {
    const { currentDepIndex, showResult, setShowResult } = this.props;
    if (prevProps.currentDepIndex !== currentDepIndex && showResult) {
      setShowResult(false);
    }
  }

  clickOptionHandler = (e) => {
    const {
      setCurrentDepIndex,
      deposits,
      setCurrentPeriodIndex,
      setCurrentSumIndex
    } = this.props;
    const currentDepIndex = deposits.findIndex((deposit) => deposit.name === e.target.value);
    setCurrentDepIndex(currentDepIndex);

    setCurrentPeriodIndex(-1);
    setCurrentSumIndex(-1);
  }

  render() {
    const { deposits, currentDepIndex } = this.props;
    const currentSelectValue = deposits[currentDepIndex].name;
    return (
      <div className='field'>
        <span className='field__select-label'>Выберите тип вклада</span>
        <select
          id='depTypes'
          className='field__select'
          value={currentSelectValue}
          onChange={this.clickOptionHandler}
        >
          {
            deposits.map((depositItem) => (
              <option
                className='field__option'
                value={depositItem.name}
                key={depositItem.code}
              >
                { depositItem.name }
              </option>
            ))
          }
        </select>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    deposits: state.deposits,
    currentDepIndex: state.currentDepIndex,
    results: state.results,
    showResult: state.results.showResult
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentDepIndex: (currentDepIndex) => dispatch(setCurrentDepIndex(currentDepIndex)),
    setCurrentPeriodIndex:
      (currentPeriodIndex) => dispatch(setCurrentPeriodIndex(currentPeriodIndex)),
    setCurrentSumIndex: (currentSumIndex) => dispatch(setCurrentSumIndex(currentSumIndex)),
    setShowResult: (showResult) => dispatch(setShowResult(showResult))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Select);

Select.propTypes = {
  deposits: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  setCurrentDepIndex: PropTypes.func.isRequired,
  currentDepIndex: PropTypes.number.isRequired,
  showResult: PropTypes.bool.isRequired,
  setShowResult: PropTypes.func.isRequired,
  setCurrentPeriodIndex: PropTypes.func.isRequired,
  setCurrentSumIndex: PropTypes.func.isRequired
};
