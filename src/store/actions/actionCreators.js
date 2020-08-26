import {
  SET_CURRENT_DEP_INDEX,
  SET_SUM_VALUE,
  SET_PERIOD_VALUE,
  SET_PERIOD_VALIDATION,
  SET_SUM_VALIDATION,
  SET_RESULTS,
  SET_CURRENT_PERIOD_INDEX,
  SET_CURRENT_SUM_INDEX,
  SET_SHOW_RESULT
} from './actionTypes';

export function setCurrentDepIndex(currentDepIndex) {
  return {
    type: SET_CURRENT_DEP_INDEX,
    currentDepIndex
  };
}

export function setSumValue(sumValue) {
  return {
    type: SET_SUM_VALUE,
    sumValue,
    isTouched: true
  };
}

export function setPeriodValue(periodValue) {
  return {
    type: SET_PERIOD_VALUE,
    periodValue,
    isTouched: true
  };
}

export function setPeriodValidation(isValid, errorMessage) {
  return {
    type: SET_PERIOD_VALIDATION,
    isValid,
    errorMessage
  };
}

export function setSumValidation(isValid, errorMessage) {
  return {
    type: SET_SUM_VALIDATION,
    isValid,
    errorMessage
  };
}

export function setCurrentPeriodIndex(currentPeriodIndex) {
  return {
    type: SET_CURRENT_PERIOD_INDEX,
    currentPeriodIndex
  };
}

export function setCurrentSumIndex(currentSumIndex) {
  return {
    type: SET_CURRENT_SUM_INDEX,
    currentSumIndex
  };
}

export function setResults(rate, currentResult) {
  return {
    type: SET_RESULTS,
    rate,
    currentResult
  };
}

export function setShowResult(showResult) {
  return {
    type: SET_SHOW_RESULT,
    showResult
  };
}
