import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getUserLoginStatus = async () => {
  const res = await axios.get(`${API_BASE_URL}/loginStatus/`, {
    withCredentials: true,
  });
  return res.data;
};

export const getAdminInfo = async () => {
  const res = await axios.get(`${API_BASE_URL}/adminInfo`, {
    withCredentials: true,
  });
  return res.data;
};

export const postLogin = async () => {
  const res = await axios.get(`${API_BASE_URL}/login/`, {
    withCredentials: true,
  });
  return res.data;
};

export const postLogout = async () => {
  const res = await axios.get(`${API_BASE_URL}/logout/`, {
    withCredentials: true,
  });
  return res.data;
};

export const getDepartmentList = async () => {
  const res = await axios.get(`${API_BASE_URL}/departments/`, {
    withCredentials: true,
  });
  return res.data;
};

export const getDepartmentIsnfo = async (departmentID) => {
  const res = await axios.get(`${API_BASE_URL}/departments/${departmentID}/`, {
    withCredentials: true,
  });
  return res.data;
};

export const getAllUsers = async (departmentID) => {
  const res = await axios.get(
    `${API_BASE_URL}/departments/${departmentID}/users/`,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export const getNextUser = async (departmentID) => {
  const res = await axios.get(
    `${API_BASE_URL}/departments/${departmentID}/nextUser/`,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export const updateUserStatus = async (departmentID, userID, status) => {
  const res = await axios.get(
    `${API_BASE_URL}/departments/${departmentID}/${userID}/${status}`,
    {
      withCredentials: true,
    }
  );
  return res.data;
};
