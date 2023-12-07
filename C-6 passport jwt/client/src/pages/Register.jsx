import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
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
        navigate("/register");
        console.log(err.message);
      });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/register", { username, password })
      .then(() => {
        console.log("user is registered");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.message);
        navigate("/register");
      });
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter your name"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Home;
