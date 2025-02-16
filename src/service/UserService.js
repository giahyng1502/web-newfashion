import axios from "./axios";

const login = async (user) => {
  const res =await axios.post("/users/login", {
    email: user.email,
    password: user.password,
  });
  return res.token;
};

export { login };
