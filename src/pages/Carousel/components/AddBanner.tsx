import React from 'react';
import {Button, Modal, message} from "antd";
import ProForm, {ProFormText , ProFormDigit} from '@ant-design/pro-form';
import UpFileOss from "@/components/UpFileOss";
import {UploadOutlined} from "@ant-design/icons";
import { upImageBanner } from "@/services/carousel/carousel";


const AddBanner = (props) => {

  const {isCreateBanner,actionRef,createModal} = props
  const [formObj] = ProForm.useForm();
  const setCoverKey = (fileKey) => formObj.setFieldsValue({'img': fileKey})


  const createSubmit = (value) => {
    upImageBanner(value).then((res) => {
      if (res.status === undefined) {
        message.success('添加成功');
        actionRef.current.reload();
        createModal(false);
      }
    }).catch(()=>{
      message.success('添加失败');
      createModal(true);
      actionRef.current.reload();

    })
  }


  return (
    <div>
      <Modal
        destroyOnClose={true}
        visible={isCreateBanner}
        footer={null}
        title="添加banner"
        onCancel={() => createModal(false)}
      >
        <ProForm
          onFinish={(value)=>createSubmit(value)}
          form={formObj}
        >
          <ProFormText
            name="title"
            label="添加图片名称"
            rules={[{required:true,message:'请输入商品名称'}]}
          />
          <ProFormText
            name="url"
            label="绑定一个外部链接"
            rules={[
              {required:true,message:'请输入一个链接'},
              {
                pattern:/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/,
                message:'输入的不是一个网址或网址输入不全',
              }
            ]}
          />
          <ProForm.Item
            name='img'
            label='Banner图片'
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

        </ProForm>
      </Modal>
    </div>
  );
};

export default AddBanner;
