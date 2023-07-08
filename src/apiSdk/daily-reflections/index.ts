import axios from 'axios';
import queryString from 'query-string';
import { DailyReflectionInterface, DailyReflectionGetQueryInterface } from 'interfaces/daily-reflection';
import { GetQueryInterface } from '../../interfaces';

export const getDailyReflections = async (query?: DailyReflectionGetQueryInterface) => {
  const response = await axios.get(`/api/daily-reflections${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createDailyReflection = async (dailyReflection: DailyReflectionInterface) => {
  const response = await axios.post('/api/daily-reflections', dailyReflection);
  return response.data;
};

export const updateDailyReflectionById = async (id: string, dailyReflection: DailyReflectionInterface) => {
  const response = await axios.put(`/api/daily-reflections/${id}`, dailyReflection);
  return response.data;
};

export const getDailyReflectionById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/daily-reflections/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteDailyReflectionById = async (id: string) => {
  const response = await axios.delete(`/api/daily-reflections/${id}`);
  return response.data;
};
