import axios from 'axios';
import { TRows, TLoginData } from '../types';

const request = axios.create({
  baseURL: 'https://technical-task-api.icapgroupgmbh.com/api/',
});

export const getLogin = async function (loginData: TLoginData) {
  const { data } = await request.post('login/', loginData);
  return data;
};

export const getTable = async function () {
  const { data } = await request.get('table/');
  return data;
};

export const getNextPage = async function (next: string | undefined) {
  const { data } = await request.get(`table/${next}`);
  return data;
};

export const getPreviousPage = async function (previous: string) {
  const { data } = await request.get(`table/${previous}`);
  return data;
};

export const createNewUser = (body: TRows) => {
  request.post('table/', body);
};

export const editUser = (id: number, body: TRows) => {
  request.put(`/table/${id}/`, body);
};

export const deleteUser = (id: number) => {
  request.delete(`/table/${id}/`);
};
