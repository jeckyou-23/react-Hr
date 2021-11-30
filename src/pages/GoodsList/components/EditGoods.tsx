import React, {useEffect, useState} from 'react';
import {Modal, Message, Skeleton, Cascader, Button , Image } from 'antd';
import {GetGoodsDetail , EditGoodsMessage} from "@/services/goodlist/goodlist";
import ProForm, {ProFormDigit, ProFormMoney, ProFormText} from "@ant-design/pro-form";
import UpFileOss from "@/components/UpFileOss";
import {UploadOutlined} from "@ant-design/icons";
import Editor from "@/components/Editor";

const EditGoods = (props) => {

  const { isEditGoods , actionRef , isUserId , isShowEdit , list} = props;
  const [initialValues,setInitialValues] = useState(undefined);
  //从ProFrom中   提交的数据中拿到被上传图片的所有数据
  const [formObj] = ProForm.useForm();
  //图片的地址
  const setCoverKey = (fileKey) => formObj.setFieldsValue({'cover': fileKey})
  const setDetails = (content) => formObj.setFieldsValue({'details':content})

  useEffect(async () => {
    const data = await GetGoodsDetail(isUserId);
    const {id,pid} = data.category
    setInitialValues({
      ...data,
      category_id:pid?[pid,id]:[id]
    })
  },[])

  const goods = async (params,id) => {
    const response =  await EditGoodsMessage({...params,category_id:params.category_id[1]},id)
    if(response.status == undefined) {
      Message.success('修改成功');
      actionRef.current.reload();
      isShowEdit(false);
    } else {
      Message.error('修改失败');
        // console.log(e);
    }
    //   .then(()=>{
    //   Message.success('修改成功');
    //   actionRef.current.reload();
    //   isShowEdit(false);
    // }).catch((e)=>{
    //   Message.error('修改失败');
    //   console.log(e);
    // })
  }


  return (
      <Modal
        footer={null}
        title = '修改商品信息'
        destroyOnClose={true}
        visible={isEditGoods}
        onCancel={() => isShowEdit(false)}
      >
        {
          initialValues == undefined ? <Skeleton active paragraph={{ rows: 4 }} /> :
            <ProForm
              form={formObj}
              onFinish={async (value) => goods(value,isUserId)}
              autoFocusFirstInput={true}
              initialValues={initialValues}
            >
              <ProFormText
                name="title"
                label="商品名称"
                rules={[{required:true,message:"请输入商品名称"}]}
              />
              <ProForm.Item
                name='category_id'
                label='分类'
                rules={[
                  {required: true, message: '请选择商品名'}
                ]}
              >
                <Cascader
                  options={list}
                  fieldNames={{
                    label: 'name',
                    value: 'id'
                  }}
                  placeholder='选择商品分类'
                />
              </ProForm.Item>
              <ProFormText
                name="description"
                label="商品描述:"
                rules={[{required:true,message:"请输入商品描述"}]}
              />
              <ProFormMoney
                name="price"
                label="商品价格:"
                rules={[
                  {required:true,message:"请输入商品价格"},
                  {type:"number",message:"输入的不是数字"}
                ]}
              />
              <ProFormDigit
                name="stock"
                label="商品库存:"
                rules={[
                  {required:true,message:"请输入商品库存"},
                  {type:"number",message:"输入的不是数字"}
                ]}
              />
              <ProFormText hidden={true} name="cover"/>
              <ProForm.Item
                name='cover'
                label='商品图片'
                rules={[
                  {required: true, message: '上传商品图片'}
                ]}
              >
                <div>
                  <UpFileOss
                    accept='image/*'
                    setCoverKey={setCoverKey}
                    showUploadList={true}
                    >
                    <Button icon={<UploadOutlined/>}>上传图片</Button>
                    {
                      !initialValues.cover_url ? '' :
                        <Image width={150} src={initialValues.cover_url}/>
                    }
                  </UpFileOss>
                </div>
              </ProForm.Item>

              <ProForm.Item
                name="details"
                label="商品介绍"
                rules={[
                  {required:true,message:'请上传商品详情'}
                ]}
              >

                <Editor
                  setDetails={setDetails}
                  content={initialValues.details}
                />
              </ProForm.Item>

            </ProForm>
        }


      </Modal>
  );
};

export default EditGoods;
