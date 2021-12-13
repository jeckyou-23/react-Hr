import React, {FC, useEffect, useState} from 'react';
import {Button, Modal, message, Image} from "antd";
import ProForm, {ProFormText } from '@ant-design/pro-form';
import UpFileOss from "@/components/UpFileOss";
import {UploadOutlined} from "@ant-design/icons";
import { upImageBanner , bannerDetail , updateBanner} from "@/services/carousel/carousel";

interface props {
  isActionBanner: boolean,
  actionRef: any,
  setIsActionBanner: (bool) => void,
  isBannerId: any,
}

const BannerAction:FC<props> = (props) => {

  const {isBannerId,actionRef,setIsActionBanner,isActionBanner} = props
  const [formObj] = ProForm.useForm();
  const setCoverKey = (fileKey) => formObj.setFieldsValue({'img': fileKey})
  const [initialValues, setInitialValues] = useState<any>({});
  const [isShowFormDate,setIsShowFormDate] = useState(false);

  useEffect(async ()=>{
    if (isBannerId != null){
      const res = await bannerDetail(isBannerId);
      setInitialValues(res);
      setIsShowFormDate(true);
    }else{
      setIsShowFormDate(true);
    }
  },[])

  const bannerOperation = async (value,id) => {
    if (id){
      const res = await updateBanner(id,value)
      if (res.status === undefined) {
        message.success('修改成功');
        actionRef.current.reload();
        setIsActionBanner(false);
      }
    }else{
      const res = await upImageBanner(value)
      if (res.status === undefined) {
        message.success('添加成功');
        actionRef.current.reload();
        setIsActionBanner(false);
      }
    }
  }

  return (
    <div>
      <Modal
        destroyOnClose={true}
        visible={isActionBanner}
        footer={null}
        title={isBannerId ? '修改轮播图' : '添加轮播图'}
        onCancel={() => setIsActionBanner(false)}
      >
        {
          isShowFormDate ?
            <ProForm
              onFinish={(value)=>bannerOperation(value,isBannerId)}
              initialValues={initialValues}
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
                    {
                    !initialValues?.img_url ? '' :
                      <Image width={150} src={initialValues?.img_url}/>
                  }
                  </UpFileOss>
                </div>
              </ProForm.Item>

            </ProForm>
            : ''
        }

      </Modal>
    </div>
  );
};

export default BannerAction;
