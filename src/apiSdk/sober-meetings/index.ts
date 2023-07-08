import axios from 'axios';
import queryString from 'query-string';
import { SoberMeetingInterface, SoberMeetingGetQueryInterface } from 'interfaces/sober-meeting';
import { GetQueryInterface } from '../../interfaces';

export const getSoberMeetings = async (query?: SoberMeetingGetQueryInterface) => {
  const response = await axios.get(`/api/sober-meetings${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createSoberMeeting = async (soberMeeting: SoberMeetingInterface) => {
  const response = await axios.post('/api/sober-meetings', soberMeeting);
  return response.data;
};

export const updateSoberMeetingById = async (id: string, soberMeeting: SoberMeetingInterface) => {
  const response = await axios.put(`/api/sober-meetings/${id}`, soberMeeting);
  return response.data;
};

export const getSoberMeetingById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/sober-meetings/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSoberMeetingById = async (id: string) => {
  const response = await axios.delete(`/api/sober-meetings/${id}`);
  return response.data;
};
