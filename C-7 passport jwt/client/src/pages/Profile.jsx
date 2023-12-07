import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios("http://localhost:3000/profile", {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => console.log(res))
      .catch((err) => {
        navigate("/login");
        console.log(err.message);
      });
  }, []);

  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
};

export default Profile;
