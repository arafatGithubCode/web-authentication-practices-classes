import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
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
        navigate("/register");
        console.log(err.message);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/register", { username, password })
      .then(() => {
        console.log("user is created");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.message);
        navigate("/register");
      });
  };

  return (
    <>
      <h1>Register page</h1>
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
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
