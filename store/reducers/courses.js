import {COURSES, CATEGORIES} from '../../src/data/dummy-data';
import {
  ADD_WISHLIST,
  REMOVE_FROM_WISHLIST,
  LAST_SEEN,
  RATE_COURSE,
  TAKEN_COURSE,
  takenCourse,
  UNENROLL_COURSE,
  SET_COURSE,
} from '../actions/courses';
import Course from '../../src/models/courses';

const initialState = {
  courses: [],
  availableC: [COURSES],
  whishlistCourses: [],
  categoryList: CATEGORIES,
  lastSeenCourse: [],
  courseRating: '',
  takenCourse: [],
};

const coursesReducer = (state = initialState, action) => {
  const TakenCourseCheck = state.takenCourse.find(
    (course) => course.id === action.cid,
  );
  const updatedTakenCourse = [...state.takenCourse];
  switch (action.type) {
    case SET_COURSE:
      return {
        ...state,
        courses: action.courses,
      }
    case ADD_WISHLIST:
      const existingIndex = state.whishlistCourses.findIndex(
        (course) => course.id === action.courseId,
      );
      if (existingIndex >= 0) {
        const upddatedWishlist = [...state.whishlistCourses];
        upddatedWishlist.splice(existingIndex, 1);
        return {...state, whishlistCourses: upddatedWishlist};
      } else {
        const course = state.courses.find(
          (course) => course.id === action.courseId,
        );
        return {
          ...state,
          whishlistCourses: state.whishlistCourses.concat(course),
        };
      }
    case REMOVE_FROM_WISHLIST:
      const wishlistedItem = state.whishlistCourses.find(
        (wishlistedItem) => wishlistedItem.id === action.cid,
      );
      const updateWish = [...state.whishlistCourses];
      updateWish.splice(wishlistedItem, 1);
      return {
        ...state,
        whishlistCourses: updateWish,
      };
    case LAST_SEEN:
      const LastSeenIndex = state.lastSeenCourse.find(
        (LastSeenIndex) => LastSeenIndex.id === action.cid,
      );
      if (LastSeenIndex) {
        return state;
      } else {
        const course = state.courses.find((course) => course.id === action.cid);
        const updatedNewSeen = [...state.lastSeenCourse];
        const seen = updatedNewSeen.concat(course);
        // const uniqueSeen = seen.filter((item, pos) => seen.indexOf(item) === pos);
        let unique = [...new Set(seen)];
        return {
          ...state,
          lastSeenCourse: unique.reverse(),
        };
      }
    case RATE_COURSE:
      const coursetIndex = state.courses.findIndex(
        (prod) => prod.id === action.cid,
      );
      const newCourse = new Course(
        action.id,
        state.courses[coursetIndex].uid,
        state.courses[coursetIndex].title,
        state.courses[coursetIndex].subtitle,
        state.courses[coursetIndex].category,
        state.courses[coursetIndex].totalLesson,
        state.courses[coursetIndex].price,
        state.courses[coursetIndex].images,
        state.courses[coursetIndex].description,
        action.ratingSum,
      );

      // const updatedCourse = [...state.courses];
      // updatedCourse[coursetIndex] = newCourse;
      return {
        ...state,
        courses: state.courses.concat(newCourse),
        // courses: updatedCourse,
      };
    case TAKEN_COURSE:
      if (TakenCourseCheck) {
        return {
          state,
        };
      } else {
        const TakenCourseIndex = state.courses.find(
          (course) => course.id === action.cid,
        );
        const taken = updatedTakenCourse.concat(TakenCourseIndex);
        return {
          ...state,
          takenCourse: taken,
        };
      }
      case UNENROLL_COURSE:
        // const selectedEnrolled = updatedCourse[TakenCourseCheck], 
      // const unEnroll = updatedTakenCourse.splice(TakenCourseCheck, 1);
      updatedTakenCourse.splice(TakenCourseCheck, 1)
      return {
        ...state,
        takenCourse: updatedTakenCourse,
      }

    default:
      return state;
  }
};

export default coursesReducer;
