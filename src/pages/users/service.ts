import { request } from 'umi';

export const getRemoteList = async (params) => {
  return request('http://public-api-v1.aspirantzhang.com/users', {
    method: 'GET',
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};
