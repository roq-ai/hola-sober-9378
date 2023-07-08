import axios from 'axios';
import queryString from 'query-string';
import { SoberDayCounterInterface, SoberDayCounterGetQueryInterface } from 'interfaces/sober-day-counter';
import { GetQueryInterface } from '../../interfaces';

export const getSoberDayCounters = async (query?: SoberDayCounterGetQueryInterface) => {
  const response = await axios.get(`/api/sober-day-counters${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createSoberDayCounter = async (soberDayCounter: SoberDayCounterInterface) => {
  const response = await axios.post('/api/sober-day-counters', soberDayCounter);
  return response.data;
};

export const updateSoberDayCounterById = async (id: string, soberDayCounter: SoberDayCounterInterface) => {
  const response = await axios.put(`/api/sober-day-counters/${id}`, soberDayCounter);
  return response.data;
};

export const getSoberDayCounterById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/sober-day-counters/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSoberDayCounterById = async (id: string) => {
  const response = await axios.delete(`/api/sober-day-counters/${id}`);
  return response.data;
};
