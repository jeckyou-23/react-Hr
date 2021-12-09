import React, {FC, useEffect, useState} from 'react';
import { showUserDetails,editUsers ,addUsers} from '@/services/userlist/userlist'
import {Modal , message , Skeleton } from "antd";
import ProForm, {ProFormText} from "@ant-design/pro-form";

interface props {
  isShowEditModel: boolean,
  setIsShowEditModel: (bool) => void,
  type: 'add' | 'edit',
  actionRef: any,
  userId: bigint
}

const EditOrAdd:FC<props> = (props) => {
  const {isShowEditModel , setIsShowEditModel, type , actionRef , userId} = props
  const [initialValues,setInitialValues] = useState(undefined);
  //当组件被挂载的时候获取用户的详细信息

    useEffect( () => {
      if(type === 'add' ) {
        setInitialValues(undefined)
        return
      }
      if(!userId) return
      if(!isShowEditModel) return
      (async () => {
        const data = await showUserDetails(userId)
        setInitialValues({
          name: data.name,
          email: data.email
        })
      })()
    },[type,userId,isShowEditModel])


//提交修改操作
const editOrAdd = (params) => {
      type === 'add' ?
         addUsers(params).then(()=>{
           message.success('添加成功');
           actionRef.current.reload();
           setIsShowEditModel(false);
         })
        :
        editUsers(params,userId).then(()=>{
          message.success('修改成功');
          actionRef.current.reload();
          setIsShowEditModel(false);
        })
}


  return (
    <div>

        <Modal
          visible = {isShowEditModel}
          onCancel = {()=>setIsShowEditModel(false)}
          destroyOnClose={true}
          footer={null}
          title={type === 'add' ? '添加用户' : '修改用户'}
        >
          { initialValues && !Object.entries(initialValues).length &&  type === 'edit' ?   <Skeleton active paragraph /> :
          <ProForm
            initialValues = {type === 'edit' ? initialValues : void 0}
            onFinish = {(values)=>editOrAdd(values)}
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
            {
              type === 'add' ?
                <ProFormText.Password
                  name="password"
                  label="密码"
                  placeholder="请输入密码"
                  rules={[
                    {required: true, message: '请输入密码'},
                    {min: 6, message: '密码最小6位'}
                  ]}
                /> : ''
            }

          </ProForm>
          }
        </Modal>
    </div>

  );
};

export default EditOrAdd;
