import {SEARCH} from '../actions/searchbar';

const initialState = {contents: ['Learn', 'Food'], value: '', course: []};

const searchBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH: {
      const {value} = action;
      const course = state.contents((val) => val.includes(value));
      return {...state, value, course};
    }
    default:
      return state;
  }
};

export default searchBarReducer;
