import axios, { AxiosResponse } from 'axios';

const API_URL: string = 'http://localhost:3000';
export interface LoginData {
  username: string;
  password: string;
}

export interface SignUpData {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
  isAdmin: boolean;
  designation: string;
  region: string;
}
export interface LoginResponse {
  user_id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  region: string;
}

export interface SignUpResponse {
  user_id: string;
  username: string;
  isAdmin: boolean;
  email: string;
  region: string;
}
export interface LogOutResponse {
  message: string;
}

export interface ForgotPasswordResponse {
  response: any;
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

export const forgotPassword = (
  email: string
): Promise<AxiosResponse<ForgotPasswordResponse>> => {
  return axios.post<ForgotPasswordResponse>(
    `${API_URL}/forgotPassword`,
    email,
    {
      withCredentials: true,
    }
  );
};
