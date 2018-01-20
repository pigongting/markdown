import OSS from 'ali-oss';
import React from 'react';
import { connect } from 'dva';
import FormPage from '../../../components/FormPage';

// console.log(OSS.urllib);
// console.log(OSS.Wrapper);
// console.log(OSS.Wrapper.STS);

const applyTokenDo = (callback, params) => {
  return OSS.urllib.request(`http://localhost:5850${iface.commonAliyunOss}`, {
    method: 'GET',
  }).then((result) => {
    const creds = JSON.parse(result.data);
    const data = creds.data;
    const client = new OSS.Wrapper({
      // region: data.endpoint.split('.')[0],
      region: 'oss-cn-shenzhen',
      accessKeyId: data.appKey,
      accessKeySecret: data.appSecret,
      // stsToken: data.SecurityToken,
      bucket: data.bucketName,
    });

    return callback(client, params);
  });
};

const handleProgress = (p) => {
  return (done) => {
    // const bar = document.getElementById('progress-bar');
    // bar.style.width = `${Math.floor(p * 100)}%`;
    // bar.innerHTML = `${Math.floor(p * 100)}%`;
    done();
  };
};

const uuid = () => {
  let d = new Date().getTime();
  const newuuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (d + (Math.random() * 16)) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r && (0x7 || 0x8))).toString(16);
  });
  return newuuid;
};

const uploadFile = (client, params) => {
  const key = `1788/${uuid()}.png`;

  return client.multipartUpload(key, params.file, {
    progress: handleProgress,
  }).then((res) => {
    console.log('upload success: %j', res);
    // return listFiles(client);
  });
};

const pagespace = 'optColumnDetail';
const insertrow = 'fetchAdd';
const updaterow = 'fetchEdit';

class Detail extends React.Component {
  constructor(props) {
    super(props);
  }

  handleCustomRequest = (params) => {
    console.log(this);
    console.log(params);
    /*
    自定义请求传过来的参数
    action: ""
    data: {}
    file: File(9354) {uid: "rc-upload-1516352160976-2", name: "TIM截图20180110204220.png", lastModified: 1515588141915, lastModifiedDate: Wed Jan 10 2018 20:42:21 GMT+0800 (中国标准时间), webkitRelativePath: "", …}
    filename: "file"
    headers: {}
    onError: ƒ onError(err, ret)
    onProgress: ƒ (e)
    onSuccess: ƒ onSuccess(ret, xhr)
    withCredentials: false
    */
    applyTokenDo(uploadFile, params);
  }

  render() {
    return (
      <FormPage
        namespace={pagespace}
        insertrow={insertrow}
        updaterow={updaterow}
        pagetitle={{
          adds: '新增专栏',
          edit: '编辑专栏信息',
          view: '查看专栏信息',
        }}
        itemdata={[
          {
            type: 'FormItemGroup',
            label: '基本信息',
          },
          {
            type: 'Input',
            field: 'name',
            label: '专栏名称',
            required: true,
            requiredmsg: '请输入专栏名称',
          },
          {
            type: 'Upload',
            field: 'figureUrl',
            label: '专栏图标',
            required: true,
            requiredmsg: '请输入专栏图标',
            action: iface.sellProductUploadfile,
          },
          {
            type: 'Input',
            field: 'sequence',
            label: '排序',
          },
          {
            type: 'Radio',
            field: 'isEnable',
            label: '是否启用',
            options: [{ value: true, name: '是' }, { value: false, name: '否' }],
          },
        ]}
      />
    );
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {};
}

export default connect(null, mapDispatchToProps)(Detail);
