import React from 'react';
import {Modal , Message , TreeSelect} from 'antd';
import {AddGoodsA} from "@/services/goodlist/goodlist";
import {GetCategoryList} from "@/services/category/category";
import ProForm, {ProFormText , ProFormMoney , ProFormTextArea, ProFormDigit} from '@ant-design/pro-form';

const AddGoods = (props) => {

  const {isCreateGoods,actionRef,isShowModel} = props

  const UpData = async (params) => {
    await console.log(params);
  }

  const GetCategory = async (params) => {
    const data = await GetCategoryList(params);
    return {
      success:true,
      ...data
    }
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
          onFinish={(values) => UpData(values)}
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
          <ProFormTextArea
            name="details"
            label="商品介绍"
          />
        </ProForm>
      </Modal>
  );
};

export default AddGoods;
