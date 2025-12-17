import { Route, Routes, useNavigate } from "react-router";
import HomePage from "./components/pages/HomePage";
import Layout from "./components/Layout";
import RegistrationPage from "./components/pages/RegistrationPage";
import { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance, { setAccessToken } from "./api/axiosInstance";
import ProtectedRoute from "./components/HOCs/ProtectedRoute";
import LoginPage from "./components/pages/loginPage";

function App() {
 const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);

  const registerHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = Object.fromEntries(formData);
    console.log(data)
    const response = await axios.post("/api/auth/registration", data);
    console.log(response);
    setUser(response.data.user);
    setAccessToken(response.data.accessToken);

    // navigate("/");
  };

    const logoutHandler = async () => {
    await axios.get("/api/auth/logout");
    setUser(null);
    setAccessToken("");
  };

const loginHandler = async (e) => {
   e.preventDefault();

    const formData = new FormData(e.target);

    const data = Object.fromEntries(formData);
        const response = await axiosInstance.post("auth/login", data);
    setUser(response.data.user);
    setAccessToken(response.data.accessToken);
}

    useEffect(() => {
    axios
      .get("/api/auth/refresh")
      .then((res) => {
        setUser(res.data.user);
        setAccessToken(res.data.accessToken);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading){
    return (
      <div>загрузка</div>
    )
  }

  return (
       <Routes>
    <Route element={<Layout user={user} logoutHandler={logoutHandler} />}>
      <Route path="/" element={<HomePage user={user} />} />
      <Route
        path="/rega"
        element={
          <ProtectedRoute isAllowed={!user} redirectTo="/">
            <RegistrationPage registerHandler={registerHandler} />
          </ProtectedRoute>
        }
      />
       <Route
        path="/login"
        element={
          <ProtectedRoute isAllowed={!user} redirectTo="/">
            <LoginPage loginHandler={loginHandler} />
          </ProtectedRoute>
        }
      />
    </Route>
  </Routes>
  )
}

export default App
