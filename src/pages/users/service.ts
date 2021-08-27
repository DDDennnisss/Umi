import { request } from 'umi';

const BaseUrl = 'http://public-api-v1.aspirantzhang.com';

export const getRemoteList = async (params) => {
  return request(`${BaseUrl}/users`, {
    method: 'GET',
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editRecord = async ({ id, values }) => {
  return request(`${BaseUrl}/users/${id}`, {
    method: 'PUT',
    data: values,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteRemoteList = async (id) => {
  return request(`${BaseUrl}/users/${id}`, {
    method: 'DELETE',
  })
    .then((res) => {
      console.log('delete successfully');
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};
