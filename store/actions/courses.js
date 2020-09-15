import Courses from '../../src/models/courses';

export const ADD_WISHLIST = 'ADD_WHISHLIST';
export const REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST';
export const LAST_SEEN = 'LAST_SEEN';
export const RATE_COURSE = 'RATE_COURSE';
export const TAKEN_COURSE = 'TAKEN_COURSE';
export const UNENROLL_COURSE = 'UNENROLL_COURSE';
export const SET_COURSE = 'SET_COURSE';

export const fetchCourses = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        'https://sakashimura-chat-app.firebaseio.com/courses.json',
      );
      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const resData = await response.json();
      const loadedCourses = [];
      console.log(resData);

      for (const key in resData) {
        loadedCourses.push(
          new Courses(
            key,
            resData[key].uid,
            resData[key].title,
            resData[key].subtitle,
            resData[key].category,
            resData[key].totalLesson,
            resData[key].price,
            resData[key].images,
            resData[key].description,
            resData[key].rating,
            resData[key].ratingSum,
          ),
        );
      }
      console.log(loadedCourses);

      dispatch({type: SET_COURSE, courses: loadedCourses});
    } catch (err) {
      throw err;
    }
  };
};

export const addWIshlist = (id) => {
  return {type: ADD_WISHLIST, courseId: id};
};

export const removeFromCart = (courseId) => {
  return {type: REMOVE_FROM_WISHLIST, cid: courseId};
};

export const lastSeen = (courseId) => {
  return {type: LAST_SEEN, cid: courseId};
};

export const rateCourse = (id, ratingSum) => {
  return async (dispatch) => {
    try {
      const responseCourse = await fetch(
        `https://sakashimura-chat-app.firebaseio.com/courses/${id}.json`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ratingSum,
          }),
        },
      );
      const resCourseData = await responseCourse.json();
      console.log(resCourseData);

      dispatch({
        type: RATE_COURSE,
        ratingSum,
      });
    } catch (err) {
      throw err;
    }
  };
  // return {
  //   type: RATE_COURSE,
  //   cid: courseId,
  //   courseData: {
  //     rating,
  //   },
  // };
};

export const takenCourse = (courseId) => {
  return {
    type: TAKEN_COURSE,
    cid: courseId,
  };
};

export const unEnrollCourse = (courseId) => {
  return {
    type: UNENROLL_COURSE,
    cid: courseId,
  };
};
