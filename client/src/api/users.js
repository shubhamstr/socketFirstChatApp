import axiosClient from './api-client';

export function updatePersonalApi(payload) {
  return axiosClient.post('/users/update-personal', payload);
}

export function getUserDetailsApi(payload) {
  return axiosClient.get('/users/get-all', {
    params: payload
  });
}
