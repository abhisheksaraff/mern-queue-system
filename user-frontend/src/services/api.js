import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const getUserLoginStatus = async () => {
  const res = await axios.get(`${API_BASE_URL}/loginStatus`, {
    withCredentials: true,
  });
  return res.data;
};

export const postLogin = async () => {
  const res = await axios.get(`${API_BASE_URL}/login`, {
    withCredentials: true,
  });
  return res.data;
};

export const postLogout = async () => {
  const res = await axios.get(`${API_BASE_URL}/logout`, {
    withCredentials: true,
  });
  return res.data;
};

export const getDepartmentsList = async () => {
  const res = await axios.get(`${API_BASE_URL}/departments`, {
    withCredentials: true,
  });
  return res.data;
};

export const getDepartmentInfo = async (departmentID) => {
  const res = await axios.get(`${API_BASE_URL}/departments/${departmentID}`, {
    withCredentials: true,
  });
  return res.data;
};

export const checkUserAlreadyInQueue = async (departmentID) => {
  const res = await axios.get(
    `${API_BASE_URL}/departments/${departmentID}/status`,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export const getUsersAheadInQueue = async (departmentID) => {
  const res = await axios.get(
    `${API_BASE_URL}/departments/${departmentID}/usersAhead/`,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export const checkUserInQueue = async (departmentID) => {
  const res = await axios.get(
    `${API_BASE_URL}/departments/${departmentID}/queue-status`,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export const postUserToQueue = async (departmentID) => {
  const res = await axios.get(
    `${API_BASE_URL}/departments/${departmentID}/join`,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export const leaveQueue = async (departmentID) => {
  const res = await axios.get(
    `${API_BASE_URL}/departments/${departmentID}/leave`,
    {
      withCredentials: true,
    }
  );
  return res.data;
};
