import React, {useRef , useState} from 'react';
import {getCarouselList , updateStatus} from '@/services/carousel/carousel'
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import {Avatar, Button, Switch, message} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AddBanner from "@/pages/Carousel/components/AddBanner";
import UpdateBanner from "@/pages/Carousel/components/UpdateBanner";

const Carousel = () => {

  const actionRef = useRef()
  const [isCreateBanner,setIsCreateBanner] = useState(false)
  const [isUpdateBanner,setIsUpdateBanner] = useState(false)
  const [isBannerId,setIsBannerId] = useState(undefined)

  const getCarousel = async (params) => {
    const response = await getCarouselList(params);
    if (response.status === undefined) {
      return {
        data:response.data,
        total:response.meta.pagination.total,
        success:true
      }
    }
  }

  const isArrival = (id) => {
    updateStatus(id).then((res)=>{
      if(res.status === undefined) {
        message.success('修改成功')
      }
    }).catch(()=>{
      message.error('修改失败')
    })
  }

  const updateDate = (id,params) => {
    setIsBannerId(id)
    setIsUpdateBanner(params)
  }

  const createModal = (params) => {
    setIsCreateBanner(params)
  }

  const columns = [
    {
      title: '图片名',
      dataIndex: 'title',
      copyable: true,
      ellipsis: true,
      tip: '标题过长会自动收缩',
    },
    {
      title:'图片',
      dataIndex: 'img_url',
      hideInSearch: true,
      render:(_,record) => <Avatar shape="square" size={64} src={record.img_url}/>
    },
    {
      title:'状态',
      dataIndex: 'status',
      render:(_,record)=><Switch
        onClick={() => isArrival(record.id)}
        defaultChecked={record.status == 1}
        checkedChildren='启用'
        unCheckedChildren='禁用'
      />,
      filters: true,
      onFilter: true,
      valueEnum:{
        1:{
          text:'启用',
          status:1
        },
        0:{
          text:'禁用',
          status:0
        }
      },
      hideInSearch: true
    },
    {
      title:'跳转链接',
      dataIndex: 'url',
      hideInSearch: true,
    },
    {
      title:'排序',
      dataIndex: 'seq',
      hideInSearch: true,
    },
    {
      title:'编辑',
      hideInSearch: true,
      render:(_,record)=><Button onClick={()=>updateDate(record.id,true)}>编辑</Button>
    }
  ];

  return (
    <div>
      <PageContainer>
        <ProTable
          columns={columns}
          actionRef={actionRef}
          request={(params) => getCarousel(params)}
          rowKey="id"
          search={{
            labelWidth: 'auto',
            resetText:"重置"
          }}
          form={{
            ignoreRules: false,
          }}
          pagination={{
            pageSize: 5,
          }}
          dateFormatter="string"
          headerTitle="轮播图管理"
          toolBarRender={() => [
            <Button key="button" icon={<PlusOutlined />} type="primary" onClick={() => createModal(true)}>
              新建
            </Button>,
          ]}
        >
        </ProTable>
        {
          isCreateBanner ?
            <AddBanner
              isCreateBanner={isCreateBanner}
              actionRef={actionRef}
              createModal={createModal}
            />
            : ''
        }
        {
          isBannerId ?
            <UpdateBanner
              isUpdateBanner={isUpdateBanner}
              isBannerId={isBannerId}
              updateDate={updateDate}
              actionRef={actionRef}
            />
        : ''
        }
      </PageContainer>
    </div>
  );

};

export default Carousel;
