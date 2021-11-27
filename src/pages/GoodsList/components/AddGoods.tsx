import React from 'react';
import {Modal , Message , Button , Cascader} from 'antd';
import {AddGoodsA} from "@/services/goodlist/goodlist";
import {UploadOutlined} from "@ant-design/icons";
import UpFileOss from "@/components/UpFileOss";
import ProForm, {ProFormText , ProFormMoney , ProFormDigit} from '@ant-design/pro-form';
import Editor from "@/components/Editor";



const AddGoods = (props) => {

  const {isCreateGoods,actionRef,isShowModel,list} = props

  const [formObj] = ProForm.useForm();

  const setCoverKey = (fileKey) => formObj.setFieldsValue({'cover': fileKey})

  const setDetails = (content) => formObj.setFieldsValue({'details':content})


  const UpData = async (params) => {
    console.log(params)
    await AddGoodsA(params).then(()=>{
      Message.success('添加成功');
      actionRef.current.reload();
      isShowModel(false);
    }).catch((e)=>{
      Message.error('添加失败'+e);
    })
  }


  return (
      <Modal
        footer={null}
        title = '添加商品'
        destroyOnClose={true}
        visible={isCreateGoods}
        onCancel={() => isShowModel(false)}
      >
        <ProForm
          onFinish={async (values) => UpData(values)}
          form={formObj}
        >
          <ProFormText
            name="title"
            label="商品名称:"
            rules={[{required:true,message:'请输入商品名称'}]}
          />
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
          />
        </ProForm.Item>
        </ProForm>
      </Modal>
  );
};

export default AddGoods;
