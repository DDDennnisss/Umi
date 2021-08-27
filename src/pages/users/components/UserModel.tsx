import React, { useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';

function UserModel(props) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(props.record);
  });

  const onOk = () => {
    form.submit();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Falied:', errorInfo);
  };

  return (
    <div>
      <Modal
        title="Basic Modal"
        visible={props.visible}
        onOk={onOk}
        onCancel={props.closeHandler}
        forceRender
      >
        <Form
          name="basic"
          form={form}
          onFinish={props.onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="Create Time" name="create_time">
            <Input />
          </Form.Item>
          <Form.Item label="Status" name="status">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default UserModel;
