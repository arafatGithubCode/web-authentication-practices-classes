import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/profile", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        navigate("/profile");
        console.log(res);
      })
      .catch((err) => {
        navigate("/login");
        console.log(err.message);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/login", { username, password })
      .then((user) => {
        localStorage.setItem("token", user.data.token);
        console.log(user);
        console.log("user is logged in");
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err.message);
        navigate("/login");
      });
  };

  return (
    <>
      <h1>Log-In page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">User name: </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <br />
        <button type="submit">Log-In</button>
      </form>
    </>
  );
};

export default Login;
