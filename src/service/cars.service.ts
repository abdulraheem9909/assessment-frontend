import { useFetch } from "../utils/useFetch";

export const getCars = async (page: number, rows: number) => {
  return await useFetch.get(`cars?page=${page}&pageSize=${rows}`);
};
export const carCount = async () => {
  return await useFetch.get(`cars/count`);
};
export const createCar = async (data: any) => {
  return await useFetch.post(`cars`, data);
};
export const updateCar = async (data: any, id: string) => {
  return await useFetch.patch(`cars/${id}`, data);
};
export const deleteCar = async (id: string) => {
  return await useFetch.delete(`cars/${id}`);
};
