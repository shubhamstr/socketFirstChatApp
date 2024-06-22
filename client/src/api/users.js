import axiosClient from './api-client';

export function getUserDetailsApi(payload) {
  return axiosClient.get('/users/get-all', {
    params: payload
  });
}

export function updateNotificationApi(payload) {
  return axiosClient.post('/users/update-notification', payload);
}

export function updatePasswordApi(payload) {
  return axiosClient.post('/users/update-password', payload);
}

export function updatePersonalApi(payload) {
  return axiosClient.post('/users/update-personal', payload);
}
