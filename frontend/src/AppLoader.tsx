import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCourses } from "./store/coursesReducer";
import { mockCourses } from "./mockData";
import App from "./App";

export default function AppLoader() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCourses(mockCourses));
  }, []);

  return <App />; // твои маршруты
}
