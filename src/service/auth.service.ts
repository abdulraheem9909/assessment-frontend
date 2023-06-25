import { useFetch } from "../utils/useFetch";

export interface SignupInterface {
  name: string;
  email: string;
}
export interface SigninInterface {
  password: string;
  email: string;
}

export const loginApi = async (data: SigninInterface) => {
  return await useFetch.post(`users/login`, data);
};
export const signUpApi = async (data: SignupInterface) => {
  return await useFetch.post(`users/signup`, data);
};

