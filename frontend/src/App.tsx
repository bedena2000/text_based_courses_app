import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Public pages
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";

// Auth pages
import Login from "./pages/Login";
import Register from "./pages/Register";

// Student pages
import MyCourses from "./pages/MyCourses";
import Learn from "./pages/Learn";
import StepContent from "./pages/StepContent";
import StepResult from "./pages/StepResult";

// Instructor pages
import InstructorDashboard from "./pages/InstructorDashboard";
import FullCoursePage from "./pages/FullCoursePage";
import CreateCourse from "./pages/CreateCourse";

// Shared pages
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./routes/ProtectedRoutes";
import AuthOnlyRoutes from "./routes/AuthOnlyRoutes"; // Your existing component
import CoursesLayout from "./components/layouts/CoursesLayout";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* ================= PUBLIC ================= */}
        <Route path="/" element={<Home />} />

        {/* ================= GUEST ONLY (AUTH PAGES) =================== */}
        {/* If user is logged in, they will be redirected to "/" */}
        <Route element={<AuthOnlyRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* ================= PROTECTED ROUTES ================= */}
        <Route element={<ProtectedRoute />}>
          {/* Routes that use the standard Sidebar Layout */}
          <Route element={<CoursesLayout />}>
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:courseId" element={<CourseDetails />} />
            <Route path="/my-courses" element={<MyCourses />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-course" element={<CreateCourse />} />
            <Route path="/instructor" element={<InstructorDashboard />} />
          </Route>

          {/* Full-screen Generator (No App Sidebar) */}
          <Route
            path="/instructor/courses/:courseId"
            element={<FullCoursePage />}
          />

          {/* Learning Mode */}
          <Route path="/learn/:courseId" element={<Learn />}>
            <Route path="step/:stepIndex" element={<StepContent />} />
            <Route path="steps/:stepId/result" element={<StepResult />} />
          </Route>
        </Route>

        {/* ================= 404 ==================== */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
