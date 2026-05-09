import API from "./api";

// =========================
// LOGIN
// =========================
export const loginUser = async (username, password, role) => {
  const response = await API.get("/users");

  const users = response.data;

  const foundUser = users.find(
    (user) =>
      user.username === username &&
      user.password === password &&
      user.role === role,
  );

  return foundUser;
};

// =========================
// REGISTER
// =========================
export const registerUser = async (newUser) => {
  const response = await API.post("/users", newUser);

  return response.data;
};
