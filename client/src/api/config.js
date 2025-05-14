// api/config.js
const API_BASE_URL = "http://localhost:5000/api";

export const loginUser = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }

  return await response.json();
};

export const verifyToken = async (token) => {
  const response = await fetch(`${API_BASE_URL}/auth/verify`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Invalid token");
  }

  return await response.json();
};

export const logoutUser = async (token) => {
  await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchCurrentUser = async (token) => {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};

export const resetPassword = async (email) => {
  await fetch(`${API_BASE_URL}/auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
};

export const changePassword = async (token, newPassword) => {
  await fetch(`${API_BASE_URL}/auth/change-password`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newPassword }),
  });
};

export const forgotPassword = async (email) => {
  await fetch(`${API_BASE_URL}/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
};

export const changeUsername = async (token, newUsername) => {
  await fetch(`${API_BASE_URL}/auth/change-username`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newUsername }),
  });
};

export const changeEmail = async (token, newEmail) => {
  await fetch(`${API_BASE_URL}/auth/change-email`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newEmail }),
  });
};

export const changePhoneNumber = async (token, newPhoneNumber) => {
  await fetch(`${API_BASE_URL}/auth/change-phone-number`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newPhoneNumber }),
  });
};

export const changeLevel = async (token, newLevel) => {
  await fetch(`${API_BASE_URL}/auth/change-level`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newLevel }),
  });
};
