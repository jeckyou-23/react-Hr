import React, {Component} from 'react';
import {GetOss} from "@/services/getoss/getoss";
import {Upload, Message} from "antd";
import {nanoid} from "nanoid";
// @ts-ignore
export default class UpFileOss extends Component {

  state = {
    OssDate: {}
  }

  async componentDidMount() {
    await this.Oss();
  }

  //获取oss秘钥
  Oss = async () => {
    try {
      const OssDate = await GetOss()
      this.setState({
        OssDate,
      })
    }
    catch (error){
      Message.error(error)
    }
  }

  onChange = ({file}) => {
    if (file.status === 'done'){
      if (this.props.setCoverKey) {
        this.props.setCoverKey(file.key);
      }
      //上传完成之后，如果需要url，那么返回url给父组件 富文本编辑器中使用
      if (this.props.insertImage) {
        this.props.insertImage(file.url);
      }
      Message.success('上传成功');

    }
  }

  getExtraData = file => {
    const { OssDate } = this.state;
    return {

      //  key是拼接的文件路径
      key: file.key,

      // oss秘钥id
      OSSAccessKeyId: OssDate.accessid,

      //oss访问授权
      policy: OssDate.policy,

      //oss url上的签名
      signature: OssDate.signature,
    };
  };

/**
 * 上传文件开始之前对文件进行处理
 * */
  beforeUpload = async file => {
    const { OssDate } = this.state;
    const expire = OssDate.expire * 1000;
    //判断oss秘钥是都到期
    if (expire < Date.now()) {
      await this.Oss();
    }
    //上传文件的路径
    const dir = 'react/'
    const suffix = file.name.slice(file.name.lastIndexOf('.'));
    const filename = Date.now()+ nanoid() + suffix ;
    file.key = dir + filename;
    file.url = OssDate.host + dir + filename ;
    return file;
  };

  render() {
    const { value , showUploadList , accept} = this.props;
    const props = {
      name: 'file',
      fileList: value,
      action: this.state.OssDate.host,
      onChange: this.onChange,
      accept:accept || '',
      data: this.getExtraData,
      beforeUpload: this.beforeUpload,
      showUploadList,
      listType:'picture',
      maxCount: 1,
    };
    return (
      <Upload {...props}>
        {this.props.children}
      </Upload>
    );
  }
}
