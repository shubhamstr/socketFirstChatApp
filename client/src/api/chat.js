import axiosClient from './api-client';

export function sendMessageAPI(payload) {
  return axiosClient.post('/chat/insert', payload).then(resp => {
    // console.log(resp);
    return resp.data;
  });
}

export function getAllChatAPI(payload) {
  return axiosClient
    .get('/chat/get-all', {
      params: payload
    })
    .then(resp => {
      // console.log(resp);
      return resp.data;
    });
}
