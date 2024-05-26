import axiosClient from './api-client';

export function signUpApi(payload) {
  return axiosClient.post('/auth/register', payload);
}

export function signInApi(payload) {
  return axiosClient.post('/auth/login', payload);
}
