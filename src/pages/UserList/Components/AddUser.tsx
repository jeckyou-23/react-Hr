import React from 'react';
import { Modal, Message } from 'antd';
import ProForm, {ProFormText} from "@ant-design/pro-form";
const AddUser = (props) => {
  const {isShowCreateModel , isShowClick , actionRef} = props
  return (
    <Modal
      destroyOnClose={true}
      title = "添加用户"
      footer = {null}
      visible = {isShowCreateModel}
      onChange = {() => isShowClick(false)}
     >
      <ProForm>

      </ProForm>
    </Modal>
  );
};

export default AddUser;
