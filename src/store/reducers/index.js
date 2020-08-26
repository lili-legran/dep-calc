import { deposits } from '../../depcalc.json';
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
} from '../actions/actionTypes';

const initialState = {
  deposits,
  currentDepIndex: 0,
  sum: {
    value: '',
    minValue: null,
    isValid: false,
    isTouched: false,
    label: 'Сумма вклада (в рублях)',
    errorMessage: ''
  },
  period: {
    value: '',
    minValue: null,
    isValid: false,
    isTouched: false,
    label: 'Период вклада (в днях)',
    errorMessage: ''
  },
  results: {
    rate: null,
    currentResult: null,
    currentPeriodIndex: -1,
    currentSumIndex: -1,
    showResult: false
  }
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_DEP_INDEX:
      return {
        ...state,
        currentDepIndex: action.currentDepIndex
      };
    case SET_SUM_VALUE:
      return {
        ...state,
        sum: {
          ...state.sum,
          value: action.sumValue,
          isTouched: action.isTouched
        }
      };
    case SET_PERIOD_VALUE:
      return {
        ...state,
        period: {
          ...state.period,
          value: action.periodValue,
          isTouched: action.isTouched
        }
      };
    case SET_PERIOD_VALIDATION:
      return {
        ...state,
        period: {
          ...state.period,
          isValid: action.isValid,
          errorMessage: action.errorMessage
        }
      };
    case SET_SUM_VALIDATION:
      return {
        ...state,
        sum: {
          ...state.sum,
          isValid: action.isValid,
          errorMessage: action.errorMessage
        }
      };
    case SET_CURRENT_PERIOD_INDEX:
      return {
        ...state,
        results: {
          ...state.results,
          currentPeriodIndex: action.currentPeriodIndex
        }
      };
    case SET_CURRENT_SUM_INDEX:
      return {
        ...state,
        results: {
          ...state.results,
          currentSumIndex: action.currentSumIndex
        }
      };
    case SET_RESULTS:
      return {
        ...state,
        results: {
          ...state.results,
          rate: action.rate,
          currentResult: action.currentResult
        }
      };
    case SET_SHOW_RESULT:
      return {
        ...state,
        results: {
          ...state.results,
          showResult: action.showResult
        }
      };
    default:
      return state;
  }
}
