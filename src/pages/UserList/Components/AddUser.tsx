import React from 'react';
import { Modal, message } from 'antd';
import ProForm, {ProFormText} from "@ant-design/pro-form";
import {AddUsers} from "@/services/userlist/userlist";
const AddUser = (props) => {
  //提取列表页传过来的状态
  const {isShowCreateModel , isShowClick , actionRef} = props

  //添加请求
  const CreateUser = async (params) => {
    await AddUsers(params).then(()=>{
      message.success('添加成功');
      //刷新表格数据
      actionRef.current.reload();
      //关闭模态框
      isShowClick(false);
    }).catch(()=>{
      message.error('添加失败')
    })
  }
  // @ts-ignore
  return (
    <Modal
      destroyOnClose={true}
      title = "添加用户"
      footer = {null}
      visible = {isShowCreateModel}
      onCancel = {() => isShowClick(false)}
     >
      <ProForm
        onFinish={(values) => CreateUser(values)}
      >
        <ProFormText
          name="name"
          label="昵称："
          placeholder="请输入昵称"
          rules={[{required:true,message:"请输入昵称"}]}
        />
        <ProFormText
          name="email"
          label="邮箱："
          placeholder="请输入邮箱"
          rules={[
            {required:true,message:"请输入邮箱"},
            {type:"email",message:"邮箱格式不正确"}
          ]}
        />
        <ProFormText.Password
          name="password"
          label="密码："
          placeholder="请输入密码"
          rules={[
            {required:true,message:"请输入密码"},
            {min:6,message:"密码少于6位"}
          ]}
        />
      </ProForm>
    </Modal>
  );
};

export default AddUser;
