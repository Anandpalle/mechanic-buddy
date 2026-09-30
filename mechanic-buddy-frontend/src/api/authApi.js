import axiosClient from './axiosClient';

export const authApi = {
  // Single unified login for both User and Admin
  login: (email, password) => axiosClient.post('/auth/login', { email, password }),
  register: (userData) => axiosClient.post('/auth/register', userData),
};
