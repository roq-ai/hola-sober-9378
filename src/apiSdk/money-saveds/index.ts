import axios from 'axios';
import queryString from 'query-string';
import { MoneySavedInterface, MoneySavedGetQueryInterface } from 'interfaces/money-saved';
import { GetQueryInterface } from '../../interfaces';

export const getMoneySaveds = async (query?: MoneySavedGetQueryInterface) => {
  const response = await axios.get(`/api/money-saveds${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createMoneySaved = async (moneySaved: MoneySavedInterface) => {
  const response = await axios.post('/api/money-saveds', moneySaved);
  return response.data;
};

export const updateMoneySavedById = async (id: string, moneySaved: MoneySavedInterface) => {
  const response = await axios.put(`/api/money-saveds/${id}`, moneySaved);
  return response.data;
};

export const getMoneySavedById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/money-saveds/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteMoneySavedById = async (id: string) => {
  const response = await axios.delete(`/api/money-saveds/${id}`);
  return response.data;
};
