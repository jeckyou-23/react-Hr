import React, {FC, useEffect, useState} from 'react';
import { showUserDetails,editUsers ,addUsers} from '@/services/userlist/userlist'
import {Modal , message , Skeleton } from "antd";
import ProForm, {ProFormText} from "@ant-design/pro-form";

interface props {
  isShowEditModel: boolean,
  setIsShowEditModel: (bool) => void,
  actionRef: any,
  userId: bigint
}

const EditOrAdd:FC<props> = (props) => {
  const {isShowEditModel , setIsShowEditModel , actionRef , userId} = props
  const [initialValues,setInitialValues] = useState({});
  const [isUserDataInfo,setIsUserDataInfo] = useState(false);
  //当组件被挂载的时候获取用户的详细信息

  console.log(userId)

    useEffect(async () => {

      if (userId != null) {
        const data = await showUserDetails(userId);
        setInitialValues({
          name: data.name,
          email: data.email
        })
        setIsUserDataInfo(true);
      }else{
        setIsUserDataInfo(true)
      }

    },[])


//提交修改操作
const editOrAdd = async (params,id) => {
      if (id) {
        const res = await editUsers(params,id);
        if (res.status === 204)
          message.success('修改成功');
          actionRef.current.reload();
          setIsShowEditModel(false);

      }else{
      const res = await  addUsers(params);
        if (res.status === undefined)
          message.success('添加成功');
          actionRef.current.reload();
          setIsShowEditModel(false);
      }


}


  return (
    <div>

        <Modal
          visible = {isShowEditModel}
          onCancel = {()=>setIsShowEditModel(false)}
          destroyOnClose={true}
          footer={null}
          title={userId ? '修改用户' : '添加用户'}
        >
          { isUserDataInfo ?
          <ProForm
            initialValues = {initialValues}
            onFinish = {(values)=>editOrAdd(values,userId)}
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
              userId ? '' :
                <ProFormText.Password
                  name="password"
                  label="密码"
                  placeholder="请输入密码"
                  rules={[
                    {required: true, message: '请输入密码'},
                    {min: 6, message: '密码最小6位'}
                  ]}
                />
            }

          </ProForm>
            : <Skeleton active paragraph />
          }
        </Modal>
    </div>

  );
};

export default EditOrAdd;
