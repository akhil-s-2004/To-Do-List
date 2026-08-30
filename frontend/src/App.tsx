import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import TasksPage from "./pages/TasksPage";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<LandingPage />}
      />

      <Route
        path="/signin"
        element={<SignInPage />}
      />

      <Route
        path="/signup"
        element={<SignUpPage />}
      />

      <Route
        path="/tasks"
        element={<TasksPage />}
      />

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />
    </Routes>
  );
}