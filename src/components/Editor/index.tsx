import React, {Component} from 'react';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css'
import './index.less';
import UpFileOss from "@/components/UpFileOss";
import { ContentUtils } from 'braft-utils'
import {UploadOutlined} from "@ant-design/icons";

class Editor extends Component {

  state = {
    // 创建一个空的editorState作为初始值
    editorState: BraftEditor.createEditorState(null)
  }

  // async componentDidMount () {
  //   // 假设此处从服务端获取html格式的编辑器内容
  //   const htmlContent = await fetchEditorContent()
  //   // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat
  //   this.setState({
  //     editorState: BraftEditor.createEditorState(htmlContent)
  //   })
  // }

  handleEditorChange = (editorState) => {
    this.setState({ editorState })
    if (editorState.isEmpty()){
      this.props.setDetails('')
    }
    this.props.setDetails(editorState.toHTML())
  }

  insertImage = url => {
    this.setState({
      editorState: ContentUtils.insertMedias(this.state.editorState, [{
        type: 'IMAGE',
        url
      }])
    })
  }

  render() {
    const { editorState } = this.state

    const extendControls = [
      {
        key: 'antd-uploader',
        type: 'component',
        component: (
          <UpFileOss
            accept='image/*'
            showUploadList={false}
            insertImage={this.insertImage}
          >
            <button type="button" className="control-item button upload-button" data-title="插入图片">
              <UploadOutlined /> 插入图片
            </button>
          </UpFileOss>
        )
      }
    ]

    return (
      <BraftEditor
        value={editorState}
        onChange={this.handleEditorChange}
        extendControls={extendControls}
      />
    );
  }
}

export default Editor;
