import { combineReducers } from "redux";
import authReducer from "./auth.reducers";
import coursesReducer from "./courses.reducer";
import programCourseReducer from "./programCourse.reducer";
import programsReducer from "./programs.reducer";
import semestersReducer from "./semesters.reducer";
import subCategoryReducer from "./subCategory.reducer";
import subCategorycourseReducer from "./subCategorycourse.reducer";
import subjectsReducer from "./subjects.reducer";
import subsubCategoryReducer from "./subsubCategory.reducer";

// eslint-disable-next-line no-undef
const rootReducer = combineReducers({
  auth: authReducer,
  programs: programsReducer,
  courses: coursesReducer,
  subcategories: subCategoryReducer,
  subjects: subjectsReducer,
  semesters: semestersReducer,
  subcategorylinks: subsubCategoryReducer,
  courseLinks: subCategorycourseReducer,
  programLinks: programCourseReducer,
});

export default rootReducer;
