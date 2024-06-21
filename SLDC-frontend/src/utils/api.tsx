import axios, { AxiosResponse } from 'axios';

const API_URL: string = 'http://localhost:3000';
export interface LoginData {
  username: string;
  password: string;
}

export interface SignUpData {
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}
export interface LoginResponse {
  user_id: string;
  username: string;
  email: string;
  isAdmin: boolean;
}

export interface SignUpResponse {
  user_id: string;
  username: string;
  isAdmin: boolean;
}
export interface LogOutResponse {
  message: string;
}
export const loginUser = (
  loginData: LoginData
): Promise<AxiosResponse<LoginResponse>> => {
  return axios.post<LoginResponse>(`${API_URL}/login`, loginData, {
    withCredentials: true,
  });
};

export const signUpUser = (
  signUpData: SignUpData
): Promise<AxiosResponse<SignUpResponse>> => {
  return axios.post<SignUpResponse>(`${API_URL}/signup`, signUpData, {
    withCredentials: true,
  });
};
export const logOutUser = (): Promise<AxiosResponse<LogOutResponse>> => {
  return axios.get<LogOutResponse>(`${API_URL}/logout`, {
    withCredentials: true,
  });
};
