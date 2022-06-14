import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/NavBar/Navbar.component";
import ProtectedRoute from "./components/protectedRoutes/ProtectedRoute.component";
import ProtectedUserRoute from "./components/protectedRoutes/ProtectedUserRoute.component";
import { onAuthStateChangeListener } from "./firebase/firebase";
import ForgotPassword from "./Routes/forgot-password/ForgotPassword.component";
import Homepage from "./Routes/HomePage/Homepage.component";
import Login from "./Routes/Login/Login.component";
import MockTest from "./Routes/MockTest/MockTest.component";
import Study from "./Routes/Study/Study.component";
import { login, logout } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangeListener((user) => {
      if (user) {
        //logged in
        dispatch(
          login({
            email: user.email,
            uid: user.uid,
            displayName: user.displayName,
            photoUrl: user.photoURL,
          })
        );
      } else {
        //logged out
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Homepage />} />
          <Route path="Login" element={<Login />} />
          <Route path="forgot-password" element={<ProtectedUserRoute />}>
            <Route index element={<ForgotPassword />} />
          </Route>

          <Route path="mocktest" element={<ProtectedRoute />}>
            <Route index element={<MockTest />} />
          </Route>
          <Route path="study" element={<ProtectedRoute />}>
            <Route index element={<Study itemsPerPage={10} />} />
          </Route>
          <Route path="*" element={<Homepage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
