import React, {useEffect, useState} from 'react';
import { updateBanner , BannerDetail} from "@/services/carousel/carousel";
import ProForm, {ProFormText} from "@ant-design/pro-form";
import {message, Modal, Image, Spin, Alert} from "antd";

const UpdateBanner = (props) => {

  const formObj = ProForm.useForm();
  const {isUpdateBanner, isBannerId, updateDate, actionRef} = props
  const [initialValues,setInitialValues] = useState(undefined);

  useEffect(  ()=>{
   const deetail = BannerDetail(isBannerId);
    setInitialValues(deetail)
  })

  const Banner = async (id,params) => {
    console.log(id);
    console.log(params);
  }

  console.debug(initialValues);

  return (
    <div>
      <Modal
        visible={isUpdateBanner}
        destroyOnClose={true}
        footer={null}
        title="修改banner"
        onCancel={() => updateDate(false)}
      >
        {initialValues == undefined ?
          <Spin tip="Loading...">
            <Alert
              message="加载中"
              description="长时间未加载?请刷新页面!"
              type="info"
            />
          </Spin> :
          <ProForm
            form={formObj}
            initialValues={initialValues}
            autoFocusFirstInput={true}
            onFinish={(value) => Banner(isBannerId,value)}
          >
            <ProFormText
              label="图片名称"
              name="title"
              rules={[{required:true,message:'请输入商品名称'}]}
            />
          </ProForm>
        }
      </Modal>
    </div>
  );
};

export default UpdateBanner;
