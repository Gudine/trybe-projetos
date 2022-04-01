import { combineReducers } from "redux";
import { START_LOADING, STOP_LOADING } from "../actions";

const initialState = { counter: 0 };

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, counter: state.counter + 1 };
    case STOP_LOADING:
      return { ...state, counter: state.counter - 1 };
    default:
      return state;
  }
};

export default combineReducers({ loading: loadingReducer });
