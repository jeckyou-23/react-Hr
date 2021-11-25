import React ,{ useEffect,useState }from 'react';
import { ShowUserDetails,EditUsers } from '@/services/userlist/userlist'
import {Modal , Message , Skeleton } from "antd";
import ProForm, {ProFormText} from "@ant-design/pro-form";
const EditUser = (props) => {
  const {isShowEditModel , isShowEdit , actionRef , userId} = props
  const [initialValues,setInitialValues] = useState(undefined);
  //当组件被挂载的时候获取用户的详细信息
  useEffect(async () => {
    if (userId !== undefined){
      const data = await ShowUserDetails(userId)
      setInitialValues({
        name: data.name,
        email: data.email
      })
    }
  },[])
//提交修改操作
const Edit = async (params) => {
  await EditUsers(params , userId).then(
      ()=>{
        Message.success('修改成功')
        //刷新表格数据
        actionRef.current.reload();
        isShowEdit(false);
      }
    ).catch(
      ()=>{
        Message.error('修改失败')
        isShowEdit(false);
      }
    )
}


  return (
    <div>
      <Modal
        visible = {isShowEditModel}
        onCancel = {()=>isShowEdit(false)}
        destroyOnClose={true}
        footer={null}
        title="修改基本信息"
      >
        {
          initialValues == undefined ?   <Skeleton active paragraph /> :
          <ProForm
            initialValues = {initialValues}
            onFinish = {(values)=>Edit(values)}
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
          </ProForm>
        }

      </Modal>
    </div>

  );
};

export default EditUser;
