import request, { extend } from 'umi-request';
import { message } from 'antd';

const BaseUrl = 'http://public-api-v1.aspirantzhang.com';

const errorHandler = function (error) {
  const codeMap = {
    '021': 'An error has occurred',
    '022': 'It’s a big mistake,',
    // ....
  };
  if (error.response) {
    if (error.response.status > 400) {
      message.error(error.data);
    }
  } else {
    message.error('Network Error');
  }
};

const extendRequest = extend({ errorHandler });

export const getRemoteList = async () => {
  return extendRequest(`${BaseUrl}/users`, {
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
  return extendRequest(`${BaseUrl}/users/${id}`, {
    method: 'PUT',
    data: values,
  })
    .then(() => {
      message.success('Edit successfully');
    })
    .catch(() => {
      message.error('Edit failed');
    });
};

export const deleteRemoteList = async (id) => {
  return extendRequest(`${BaseUrl}/users/${id}`, {
    method: 'DELETE',
  })
    .then(() => {
      message.success('Delete successfully');
    })
    .catch(() => {
      message.error('Delete failed');
    });
};

export const createRemoteList = async (values) => {
  return extendRequest(`${BaseUrl}/users`, {
    method: 'POST',
    data: values,
  })
    .then((res) => {
      message.success('Create successfully');
      return res;
    })
    .catch((err) => {
      message.error('Create failed');
    });
};
