import React, { useState } from 'react';
import { Table, Space, Modal } from 'antd';
import { connect } from 'umi';
import UserModel from './components/UserModel';

function Users({ users }) {
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
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const editHandler = (record) => {
    setModalVisible(true);
    setRecord(record);
  };

  const closeHandler = () => {
    setModalVisible(false);
  };

  return (
    <div className="list-table">
      <Table columns={columns} dataSource={users.data} />
      <UserModel
        visible={modalVisible}
        closeHandler={closeHandler}
        record={record}
      />
    </div>
  );
}

const mapStateToProps = ({ users }) => ({
  users,
});

export default connect(mapStateToProps, null)(Users);
