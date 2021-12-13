import React, {FC, useEffect, useState} from 'react';
import { message, Skeleton, Cascader, Button, Image , Space, Modal} from 'antd';
import {getGoodsDetail, editGoods, addGoodsA} from "@/services/goodlist/goodlist";
import {getCategoryList} from "@/services/category/category";
import {UploadOutlined} from "@ant-design/icons";
import UpFileOss from "@/components/UpFileOss";
import ProForm, { ProFormText, ProFormMoney, ProFormDigit} from '@ant-design/pro-form';
import Editor from "@/components/Editor";

//设定props类型
interface Props {
  addEdit: boolean,
  actionRef: any,
  setAddEdit: (bool) => void,
  isGoodsId: any,
}

const AddOrEdit:FC<Props> = (props) => {

  const {actionRef, addEdit, setAddEdit, isGoodsId } = props;

  const setCoverKey = (fileKey) => formObj.setFieldsValue({'cover': fileKey})

  const setDetails = (content) => formObj.setFieldsValue({'details': content})

  const [initialValues, setInitialValues] = useState<any>({});

  const [categoryList, setCategoryList] = useState([])

  const [isShowFormDate,setIsShowFormDate] = useState(false);

  const [formObj] = ProForm.useForm();

  useEffect( async () => {
    if (isGoodsId != null){
      const data = await getGoodsDetail(isGoodsId);
      const {id, pid} = data.category
      setInitialValues({
        ...data,
        category_id: pid ? [pid, id] : [id]
      })
      setIsShowFormDate(true);
    }else{
      setIsShowFormDate(true);
    }
  }, [])

  useEffect(async ()=>{
    const data = await getCategoryList();
    setCategoryList(data);
  },[])



  const goodsAction = async (value :any,id) => {
    if (id){

     const res = await editGoods({...value, category_id: [...value.category_id].pop()},id)
      if (res.status === 204) {
            message.success('修改成功');
            actionRef.current.reload();
            setAddEdit(false);
          }
    }else{
      const res = await addGoodsA({...value, category_id:[...value.category_id].pop()})
        if (res.status === undefined) {
          message.success('添加成功');
          actionRef.current.reload();
          setAddEdit(false);
        }
    }

  }

  return (
    <Space>
      <Modal
        visible = {addEdit}
        onCancel = {()=>setAddEdit(false)}
        destroyOnClose={true}
        footer={null}
        title={isGoodsId ? '修改商品' : '添加商品'}
      >
      {
        isShowFormDate ?
        <ProForm
          form={formObj}
          initialValues={initialValues}
          onFinish={(value) => goodsAction(value,isGoodsId)}
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
                options={categoryList}
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
            </ProForm>
          : <Skeleton active />
      }
      </Modal>
    </Space>
  );
};

export default AddOrEdit;
