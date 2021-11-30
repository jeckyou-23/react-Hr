import React, {useState, useRef, useEffect} from 'react';
import { PlusOutlined ,  SmileOutlined , FrownOutlined,} from '@ant-design/icons';
import {Button , Avatar, Switch, Message} from 'antd';
import ProTable from '@ant-design/pro-table';
import {GetGoodList , GoodsIsArrival , GoodsIsRecommend} from "@/services/goodlist/goodlist";
import AddGoods from "@/pages/GoodsList/components/AddGoods";
import { PageContainer } from '@ant-design/pro-layout';
import {GetCategoryList} from "@/services/category/category";
import EditGoods from "@/pages/GoodsList/components/EditGoods";


const GoodsList = () => {

  const actionRef = useRef();
  const [isCreateGoods,setIsCreateGoods] =useState (false);
  const [isEditGoods,setIsEditGoods] = useState(false);
  const [isUserId,setIsUserId] = useState(null);
  const [list,setList] = useState(null);


  const GetGoods = async (params) => {
  const data = await GetGoodList(params)
  return {
    data: data.data,
    success:true,
    total:data.meta.pagination.total,
  }
}

  useEffect(async () => {
    const data = await GetCategoryList(1);
    if (data.status === undefined){
      setList(data);
    }
  },[])


const isArrival = async (params) => {
  await GoodsIsArrival(params).then(()=>{
    Message.success('修改成功')
  }).catch((e)=>{
    Message.error('修改失败'+e)
  })
}

const isRecommend = async (params) => {
  await GoodsIsRecommend(params).then(()=>{
    Message.success('修改成功')
  }).catch((e)=>{
    Message.error('修改失败'+e)
  })
}

const isShowModel = (params: boolean) => {
  setIsCreateGoods(params);
}

const isShowEdit = (id,params) => {
    setIsEditGoods(params);
    setIsUserId(id);
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
    render:(_,record) => <Button onClick={() => isShowEdit(record.id,true)}>修改</Button>
  }
];


   return (
     <PageContainer>
       <ProTable
         columns={columns}
         actionRef={actionRef}
         request={async (params ) =>GetGoods(params)}
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
           <Button key="button" icon={<PlusOutlined />} type="primary" onClick={() => isShowModel(true) }>
             新建
           </Button>,
         ]}
       />
       {
         isCreateGoods ?
         <AddGoods
           isCreateGoods={isCreateGoods}
           actionRef={actionRef}
           isShowModel={isShowModel}
           list={list}
         />
           : ''
       }

       {
         isEditGoods ?
           <EditGoods
             isEditGoods={isEditGoods}
             actionRef={actionRef}
             isUserId={isUserId}
             isShowEdit={isShowEdit}
             list={list}
           />
           : ''
       }

     </PageContainer>
  );
};

 export default GoodsList;
