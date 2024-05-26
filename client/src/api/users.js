import axiosClient from './api-client';

export function updatePersonalApi(payload) {
  return axiosClient.post('/users/update-personal', payload);
}
