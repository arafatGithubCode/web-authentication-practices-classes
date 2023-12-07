import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios("http://localhost:3000/profile", {
      headers: {
        Authorization: token,
      },
    })
      .then(() => navigate("/profile"))
      .catch((err) => {
        navigate("/login");
        console.log(err.message);
      });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/login", { username, password })
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
      <h1>Log-In</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter name"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          />
        </div>
        <button type="submit">Log-In</button>
      </form>
    </>
  );
};

export default LogIn;
