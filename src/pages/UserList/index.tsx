import React , {useState,useRef} from 'react';
import {PlusOutlined,UserOutlined} from '@ant-design/icons';
import { Button, Switch,Message ,Avatar } from 'antd';
import ProTable from '@ant-design/pro-table';
import { GitUserList , ChangeLock } from '@/services/userlist/userlist';
import EditOrAdd from '@/pages/UserList/Components/EditOrAdd';
import { PageContainer } from '@ant-design/pro-layout';


const UserList = () => {

  //定义模态框是否显示状态
  const [isShowEditModel,setIsShowEditModel] = useState(false);
  const [userId,setUserId] = useState(undefined);
  const actionRef = useRef(null);
  const [type,setType] = useState<'add'|'edit'>('add')



  //获取列表数据
  const getData = async (params) => {
    const response = await GitUserList(params)
    return {
      data: response.data,
      success: true,
      total: response.meta.pagination.total
    }
  }
  const isShowEdit = (show,id) => {
    setIsShowEditModel(show)
    setUserId(id)
    setType('edit')
  }
  //更改状态时间lock
const lock = async (params) => {
   await ChangeLock(params).then(()=>{
    Message.success('操作成功')
  }).catch(()=>{
    Message.error('操作失败')
  })
}
const columns = [
  {
    title:'头像',
    dataIndex: 'avatar_url',
    hideInSearch: true,
    render:(_,record)=><Avatar src={record.avatar_url} size={32} icon={<UserOutlined />} />
  },
  {
    title:'姓名',
    dataIndex: 'name',
  },
  {
    title: '邮箱',
    dataIndex: 'email'
  },
  {
    title: '状态',
    dataIndex: 'is_locked',
    hideInSearch:true,
    render:(_,record)=><Switch
      checkedChildren="启用"
      unCheckedChildren="禁用"
      defaultChecked={record.is_locked == 1}
      onClick={()=>lock(record.id)}
  />
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    hideInSearch: true
  },
  {
    title:'操作',
    hideInSearch: true,
    render:(_,record)=><Button type="primary" onClick={()=>isShowEdit(true,record.id)}>编辑</Button>
  }
];


  // @ts-ignore
  // @ts-ignore
  return (
    <div>
      <PageContainer>
        <ProTable
        columns={columns}
        actionRef={actionRef}
        request={(params) => getData(params)}
        rowKey="id"
        search={{
          labelWidth: 'auto',
          resetText:"重置"
        }}
        form={{
          ignoreRules: false,
        }}
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="string"
        headerTitle="用户管理"
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary" onClick={()=>setIsShowEditModel(true)}>
            新建
          </Button>
        ]}
      />
        {
          isShowEditModel ?
          <EditOrAdd
            isShowEditModel = {isShowEditModel}
            setIsShowEditModel={(bool) => setIsShowEditModel(bool)}
            userId = {userId}
            actionRef = {actionRef}
            type={type}
          /> : undefined
        }

      </PageContainer>
      {/*return <Skeleton type="list" />/*/}
    </div>

  );
};

export default UserList;
