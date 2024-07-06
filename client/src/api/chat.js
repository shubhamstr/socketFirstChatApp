import axiosClient from './api-client';

export function sendMessageAPI(payload) {
  return axiosClient.post('/chat/insert', payload).then(resp => {
    // console.log(resp);
    return resp.data;
  });
}
