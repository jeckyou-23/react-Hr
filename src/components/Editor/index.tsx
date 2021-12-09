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
    editorState: BraftEditor.createEditorState(this.props.content ? this.props.content : null)
  }


  handleEditorChange = (editorState) => {
    this.setState({ editorState })
    if (editorState.isEmpty()){
      this.props.setDetails('');
    }
    this.props.setDetails(editorState.toHTML());

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
    const { editorState } = this.state
    return (
      <div className="my-editor">
        <BraftEditor
         value={editorState}
         onChange={this.handleEditorChange}
         extendControls={extendControls}
        />
      </div>
    );
  }
}

export default Editor;
