import React, {useState, useRef} from 'react';
import { PlusOutlined ,  SmileOutlined , FrownOutlined,} from '@ant-design/icons';
import {Button , Avatar, Switch, message} from 'antd';
import ProTable from '@ant-design/pro-table';
import {getGoodList , goodsIsArrival , goodsIsRecommend} from "@/services/goodlist/goodlist";
import { PageContainer } from '@ant-design/pro-layout';
import AddOrEdit from "@/pages/GoodsList/components/AddOrEdit";


const GoodsList = () => {

  const actionRef = useRef();
  const [addEdit,setAddEdit] = useState<boolean>(false)
  const [isGoodsId,setIsGoodsId] = useState(null);

  const getGoods = async () => {
  const data = await getGoodList()
  return {
    data: data.data,
    success:true,
    total:data.meta.pagination.total,
  }
}


const isArrival = async (params) => {
  await goodsIsArrival(params).then(()=>{
    message.success('修改成功')
  }).catch((e)=>{
    message.error('修改失败'+e)
  })
}

const isRecommend = async (params) => {
  await goodsIsRecommend(params).then(()=>{
    message.success('修改成功')
  }).catch((e)=>{
    message.error('修改失败'+e)
  })
}


const isShow = (id,params) => {
    setIsGoodsId(id);
    setAddEdit(params);
}

// @ts-ignore
const columns = [
  {
    title: '商品名',
    dataIndex: 'title',
    copyable: true,
    ellipsis: true,
    tip: '标题过长会自动收缩',
  },
  {
    title: '商品图片',
    dataIndex: 'cover_url',
    hideInSearch: true,
    render:(_,record) => <Avatar shape="square" size={64} src={record.cover_url}/>
  },
  {
    title: '商品描述',
    dataIndex: 'description',
    hideInSearch: true,
    ellipsis:true,
  },
  {
    title: '商品价格',
    dataIndex: 'price',
    valueType: 'money',
    hideInSearch: true
  },
  {
    title: '商品库存',
    dataIndex: 'stock',
    hideInSearch: true,
  },
  {
    title: '商品销量',
    dataIndex: 'sales',
    hideInSearch: true,
  },
  {
    title:'是否上架',
    dataIndex: 'is_on',
    render:(_,record)=><Switch
      onClick={() => isArrival(record.id)}
      defaultChecked={record.is_on == 1}
      checkedChildren={<SmileOutlined twoToneColor="#52c41a"/>}
      unCheckedChildren={<FrownOutlined/>}
    />,
    filters: true,
    onFilter: true,
    valueEnum:{
      1:{
        text:'上架',
        status:1
      },
      0:{
        text:'下架',
        status:0
      }
    },
    hideInSearch: true
  },
  {
    title:'是否推荐',
    dataIndex: 'is_recommend',
    render:(_,record)=><Switch
      defaultChecked={record.is_recommend == 1}
      checkedChildren={<SmileOutlined twoToneColor="#52c41a"/>}
      unCheckedChildren={<FrownOutlined/>}
      onClick={()=>isRecommend(record.id)}
    />,
    filters: true,
    onFilter: true,
    valueEnum:{
      1:{
        text:'推荐',
        status:1
      },
      0:{
        text:'不推荐',
        status:0
      }
    },
    hideInSearch: true

  },
  {
    title: '创建时间',
    key: 'showTime',
    dataIndex: 'created_at',
    valueType: 'date',
    hideInSearch: true,
  },
  {
    title: '操作',
    hideInSearch: true,
    render:(_,record) => <Button onClick={() => isShow(record.id,true)}>修改</Button>
  },
];


   return (
     <PageContainer>
       <ProTable
         columns={columns}
         actionRef={actionRef}
         request={async (params ) =>getGoods()}
         rowKey="id"
         search={{
           labelWidth: 'auto',
         }}
         form={{
           ignoreRules: false,
         }}
         pagination={{
           pageSize: 10,
         }}
         dateFormatter="string"
         headerTitle="高级表格"
         toolBarRender={() => [
           <Button key="button" icon={<PlusOutlined />} type="primary" onClick={() =>  {
             setAddEdit(true)
             setIsGoodsId(null)
           } }>
             新建
           </Button>,
         ]}
       />
       {
         !addEdit ? undefined :
         <AddOrEdit
           actionRef={actionRef}
           addEdit={addEdit}
           setAddEdit={setAddEdit}
           isGoodsId={isGoodsId}
         />
       }

     </PageContainer>
  );
};

 export default GoodsList;
