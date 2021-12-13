import React, {useRef , useState} from 'react';
import {getCarouselList , updateStatus , deleteBanner} from '@/services/carousel/carousel'
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import {Avatar, Button, Switch, message} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import BannerAction from "@/pages/Carousel/components/BannerAction";

const Carousel = () => {

  const actionRef = useRef()
  const [isActionBanner,setIsActionBanner] = useState(false)
  const [isBannerId,setIsBannerId] = useState(null)

  const getCarousel = async () => {
    const response = await getCarouselList();
    if (response.status === undefined) {
      return {
        data:response.data,
        total:response.meta.pagination.total,
        success:true
      }
    }
  }

  const isArrival = async (id) => {
    const response = await updateStatus(id);
    if (response.status === undefined) {
      message.success('修改成功')
    }else {
      message.error('修改失败')
    }
  }

  const deleteData = async (id) => {
    const response = await deleteBanner(id);
    if (response.status === undefined) {
      message.success('修改成功')
      actionRef.current.reload();
    }else {
      message.error('修改失败')
    }
  }

  const bannerAction = (id,params) => {
    setIsBannerId(id)
    setIsActionBanner(params)
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
      render:(_,record)=><Button onClick={()=>bannerAction(record.id,true)}>编辑</Button>

    },
    {
      title:'删除',
      hideInSearch: true,
      render:(_,record) => <Button danger onClick={() => deleteData(record.id)}>删除</Button>
    }
  ];

  return (
    <div>
      <PageContainer>
        <ProTable
          columns={columns}
          actionRef={actionRef}
          request={() => getCarousel()}
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
            <Button key="button" icon={<PlusOutlined />} type="primary" onClick={() => setIsActionBanner(true)}>
              新建
            </Button>,
          ]}
        >
        </ProTable>

        {
          isActionBanner ?
          <BannerAction
            isBannerId={isBannerId}
            actionRef={actionRef}
            setIsActionBanner={setIsActionBanner}
            isActionBanner={isActionBanner}
          />
            : undefined
        }

      </PageContainer>
    </div>
  );

};

export default Carousel;
