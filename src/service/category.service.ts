import { useFetch } from "../utils/useFetch";

export const getCategory = async (page: number, rows: number) => {
  return await useFetch.get(`category?page=${page}&pageSize=${rows}`);
};
export const createCategory = async (data: any) => {
  return await useFetch.post(`category`, data);
};
export const updateCategory = async (data: any, id: string) => {
  return await useFetch.patch(`category/${id}`, data);
};
export const deleteCategory = async (id: string) => {
  return await useFetch.delete(`category/${id}`);
};
export const getCategoryAll = async () => {
  return await useFetch.get(`category/all`);
};
