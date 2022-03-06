import React from 'react'
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {reqDelImg} from '../../api'

/* 用于图片上传的组件 */
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends React.Component {
//   state = {
//     previewVisible: false,//标识是否大图预览
//     previewImage: '',//大图的url
//     previewTitle: '',
//     fileList: [
//     ],
//   };
  constructor (props){
      super(props)
      let fileList=[]
      const {imgs}=this.props
      console.log(imgs)
    //   debugger
      if(imgs&&imgs.length>0){
          
        fileList = imgs.map((img,index)=>(
          img?{
            uid: -index,
            name: img.name,
            status: 0,
            url:img.url
        }:{}))
      }
      this.state={
        previewVisible: false,//标识是否大图预览
        previewImage: '',//大图的url
        previewTitle: '',
        fileList,//
      }
  }
/* 获取所有已上传图片文件名的数组 */
getImgs = () =>{
    return this.state.fileList.map(file => file.name)
}
/* 隐藏modal */
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
      //显示指定file对应的大图
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };
/* filelist 所有已上传图片对象*/
  handleChange = async ({ file,fileList }) => {
      if(file.status ==='done'){
          const result=file.response
          if(result.status===0){
              message.success('上传图片成功!')
              const {name,url}=result
            //   debugger
              file = fileList[fileList.length-1]
              file.name=name
              file.url=url
          }else{
              message.error('上传图片失败')
          }
      }else if(file.status==='removed'){
        const result = await reqDelImg(file.name)
        if(result.status===0){
            message.success('删除成功') //防止服务器图片积累过多
        }else{
            message.error('删除失败')
        }
        
    }
    this.setState({ fileList })
  };

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    // debugger
    return (
      <>
      
        <Upload
          action="/manage/img/upload"
          accept='image/*' //接受图片格式
          listType="picture-card"//卡片格式
          name='image'//请求参数名
          fileList={fileList}//已上传文件的列表
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 4 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}
