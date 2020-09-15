import Ratings from '../../src/models/ratings';

export const ADD_RATINGS = 'ADD_RATINGS';
export const SET_RATINGS = 'SET_RATINGS';
export const RATING_COURSE = 'RATING_COURSE';
const BASE_URL = 'https://sakashimura-chat-app.firebaseio.com/';

export const addCourseRating = (id, ratingSum) => {
  return async (dispatch) => {
    try {
      const responseCourse = await fetch(
        `https://sakashimura-chat-app.firebaseio.com/courses/${id}/rating.json`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ratingsSum,
          }),
        },
      );
      const resCourseData = await responseCourse.json();
      console.log(resCourseData);

      dispatch({
        type: RATING_COURSE,
        productData: {
          ratingSum,
        },
      });
    } catch (err) {
      throw err;
    }
  };
};

export const fetchRatings = (id, ratingUser) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://sakashimura-chat-app.firebaseio.com/courses/${id}/rating/${ratingUser}.json`,
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const resRatingData = await response.json();
      const loadedRatings = [resRatingData];

      // for (const key in resRatingData) {
      //   loadedRatings.push(
      //     new Ratings(
      //       id,
      //       ratingUser,
      //       resRatingData.ratingCount,
      //       resRatingData.ratingReview,
      //       resRatingData.date,
      //     ),
      //   );
      // }
      dispatch({type: SET_RATINGS, ratings: loadedRatings});
      // addCourseRating(resRatingData.ratingReview);
      // console.log(loadedRatings.length)
      // console.log(loadedRatings)
    } catch (err) {
      throw err;
    }
  };
};

export const addRatings = (id, ratingUser, ratingCount, ratingReview) => {
  return async (dispatch) => {
    const date = new Date();
    const response = await fetch(
      `${BASE_URL}/courses/${id}/rating/${ratingUser}.json`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ratingUser,
          ratingCount,
          ratingReview,
          date: date.toISOString(),
        }),
      },
    );
    if (!response.ok) {
      throw new Error('Something went wrong');
    }

    const resData = await response.json();

    dispatch({
      type: ADD_RATINGS,
      cid: id,
      CourseData: {
        rating: {
          ratingUser,
          ratingCount,
          ratingReview,
          date,
        },
      },
    });
  };
};
