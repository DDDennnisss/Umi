import React, { useState } from 'react';
import { Table, Space, Popconfirm, message, Button } from 'antd';
import { connect } from 'umi';
import UserModel from './components/UserModel';

function Users({ users, dispatch }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [record, setRecord] = useState(undefined);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Create time',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => editHandler(record)}>Edit</a>&nbsp;&nbsp;
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => confirm(record)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <a>Delete</a>&nbsp;&nbsp;
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const confirm = (record) => {
    const id = record.id;
    dispatch({
      type: 'users/delete',
      id,
    });
  };

  const cancel = () => {
    message.error('Click on No');
  };

  const editHandler = (record) => {
    setModalVisible(true);
    setRecord(record);
  };

  const closeHandler = () => {
    setModalVisible(false);
  };

  const onFinish = (values) => {
    let id = 0;
    if (record) {
      id = record.id;
    }

    if (id) {
      dispatch({
        type: 'users/edit',
        payload: { id, values },
      });
    } else {
      dispatch({
        type: 'users/add',
        values,
      });
    }
    setModalVisible(false);
    setRecord(record);
  };

  const addHandler = () => {
    setRecord(undefined);
    setModalVisible(true);
  };

  return (
    <div className="list-table">
      <Button type="primary" onClick={addHandler}>
        Add
      </Button>
      <Table columns={columns} dataSource={users.data} rowKey="id" />
      <UserModel
        visible={modalVisible}
        closeHandler={closeHandler}
        record={record}
        onFinish={onFinish}
      />
    </div>
  );
}

const mapStateToProps = ({ users }) => ({
  users,
});

export default connect(mapStateToProps, null)(Users);
