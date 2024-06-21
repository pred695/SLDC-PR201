import axios, { AxiosResponse } from 'axios';

const API_URL: string = 'http://localhost:3000';
export interface LoginData {
  username: string;
  password: string;
}
export interface LoginResponse {
  data: string;
  user_id: string;
  username: string;
  email: string;
  isAdmin: boolean;
}

export const loginUser = (
  loginData: LoginData
): Promise<AxiosResponse<LoginResponse>> => {
  return axios.post<LoginResponse>(`${API_URL}/login`, loginData,{
    withCredentials: true,
  });
};
