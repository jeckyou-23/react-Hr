import React , {useState,useRef} from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Tag, Space, Switch } from 'antd';
import ProTable from '@ant-design/pro-table';
import { GitUserList } from '@/services/userlist/userlist';
import AddUser from './Components/AddUser';
import { PageContainer } from '@ant-design/pro-layout';

const UserList = () => {

  //定义模态框是否显示状态
  const [isShowCreateModel,setIsShowCreateModel] = useState(false);
  const [isShowEditModel,setIsShowEditModel] = useState(false);
  const actionRef = useState();

  //获取列表数据
  const getData = async (params) => {
    const response = await GitUserList(params)
    return {
      data: response.data,
      success: true,
      total: response.meta.pagination.total
    }
  }
  //是否显示添加用户model
  const isShowClick = (show) => {
    setIsShowCreateModel(show)
  }

const columns = [
  {
    title:'头像',
    dataIndex: 'avatar',
    hideInSearch: true
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
    title: '是否禁用',
    dataIndex: 'is_locked',
    hideInSearch:true,
    render:(_,record)=><Switch
      checkedChildren="启用"
      unCheckedChildren="禁用"
  />
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    hideInSearch: true
  },
  {
    title:'操作',
    hideInSearch: true
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
        columnsState={ {
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
        } }
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
          <Button key="button" icon={<PlusOutlined />} type="primary" onClick={()=>isShowClick(true)}>
            新建
          </Button>
        ]}
      />
      <AddUser
        isShowCreateModel = {isShowCreateModel}
        isShowClick = {isShowClick}
        actionRef={actionRef}
      />
      </PageContainer>
      {/*return <Skeleton type="list" />/*/}
    </div>

  );
};

export default UserList;
