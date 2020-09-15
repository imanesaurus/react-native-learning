import {ADD_RATINGS, RATING_COURSE, SET_RATINGS} from '../actions/ratings';
import Ratings from '../../src/models/ratings';
import Courses from '../../src/models/courses';

const initialState = {
  ratings: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_RATINGS:
      return {
        ...state,
        ratings: action.ratings,
      };
    case ADD_RATINGS:
      const newRating = new Ratings(
        action.ratingUser,
        action.ratingCount,
        action.ratingReview,
        action.date,
      );
      return {
          ...state,
          ratings: state.ratings.concat(newRating)
      }
  }
  return state;
};
