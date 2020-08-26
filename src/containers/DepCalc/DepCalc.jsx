import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserData from '../../components/UserData/UserData';
import Results from '../../components/Results/Results';
import './DepCalc.scss';

const DepCalc = (props) => {
  const {
    value,
    currentResult,
    rate,
    showResult
  } = props;
  return (
    <div className='dep-calc'>
      <UserData />
      {
        showResult
          ? <Results value={value} currentResult={currentResult} rate={rate} />
          : null
      }
    </div>
  );
};

function mapStateToProps(state) {
  return {
    value: state.sum.value,
    rate: state.results.rate,
    currentResult: state.results.currentResult,
    showResult: state.results.showResult
  };
}

export default connect(
  mapStateToProps
)(DepCalc);

DepCalc.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]).isRequired,
  currentResult: PropTypes.string,
  rate: PropTypes.number,
  showResult: PropTypes.bool
};
