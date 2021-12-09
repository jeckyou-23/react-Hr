import React, {FC, useEffect, useState} from 'react';
import { message, Skeleton, Cascader, Button, Image , Space} from 'antd';
import {getGoodsDetail, editGoodsMessage, addGoodsA} from "@/services/goodlist/goodlist";
import {UploadOutlined} from "@ant-design/icons";
import UpFileOss from "@/components/UpFileOss";
import ProForm, {ModalForm, ProFormText, ProFormMoney, ProFormDigit} from '@ant-design/pro-form';
import Editor from "@/components/Editor";

//设定props类型
interface Props {
  addEdit: boolean,
  actionRef: any,
  setAddEdit: (bool) => void,
  list: any,
  isGoodsId: any,
  type: 'add' | 'edit',
  setIsGoodsId: any,
}

const AddOrEdit:FC<Props> = (props) => {

  const {actionRef, addEdit, setAddEdit, list, isGoodsId, type, setIsGoodsId } = props;

  const setCoverKey = (fileKey) => formObj.setFieldsValue({'cover': fileKey})

  const setDetails = (content) => formObj.setFieldsValue({'details': content})

  const [initialValues, setInitialValues] = useState<any>({});

  const [formObj] = ProForm.useForm();

  useEffect(() => {
    if (type === 'add'){
      setIsGoodsId(undefined)
      return
    }
    if (!isGoodsId) return
    if (!addEdit) return
    (async () => {
      const data = await getGoodsDetail(isGoodsId);
      const {id, pid} = data.category
      setInitialValues({
        ...data,
        category_id: pid ? [pid, id] : [id]
      })
    })()
  }, [isGoodsId, type, addEdit])

  const Goods = (value :any) => {
    if(type === 'add') {
      addGoodsA(value).then(
        () => {
          message.success('添加成功')
          actionRef.current.reload();
          setAddEdit(false);
        }
        )
    }else{
      editGoodsMessage(value,isGoodsId).then(()=>{
        message.success('修改成功');
        actionRef.current.reload();
        setAddEdit(false);
      })
    }
  }

  return (
    <Space>

      {
        initialValues && !Object.entries(initialValues).length && type === 'edit' ? <Skeleton active/> :
          <ModalForm
            title={type === 'add' ? '添加商品' : '修改商品'}
            width={800}
            form={formObj}
            visible={addEdit}
            initialValues={type === 'edit' ? initialValues : void 0}
            modalProps={{
              onCancel: () => setAddEdit(false)
            }}
            onFinish={(value: any) => Goods(value)}
          >
            <ProFormText
              name="title"
              label="商品名称"
              rules={[{required: true, message: "请输入商品名称"}]}
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
              rules={[{required: true, message: "请输入商品描述"}]}
            />
            <ProFormMoney
              name="price"
              label="商品价格:"
              rules={[
                {required: true, message: "请输入商品价格"},
                {type: "number", message: "输入的不是数字"}
              ]}
            />
            <ProFormDigit
              name="stock"
              label="商品库存:"
              rules={[
                {required: true, message: "请输入商品库存"},
                {type: "number", message: "输入的不是数字"}
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
                    !initialValues?.cover_url ? '' :
                      <Image width={150} src={initialValues?.cover_url}/>
                  }
                </UpFileOss>
              </div>
            </ProForm.Item>

            <ProForm.Item
              name="details"
              label="商品介绍"
              rules={[
                {required: true, message: '请上传商品详情'}
              ]}
            >

              <Editor
                setDetails={setDetails}
                content={initialValues?.details}
              />
            </ProForm.Item>


          </ModalForm>
      }
    </Space>
  );
};

export default AddOrEdit;
