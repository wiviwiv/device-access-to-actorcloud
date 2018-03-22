# 指令下发

指令下发用于直接从 **actorcloud** 控制在线设备，控制过程不会创建客户端接入消息服务器。


### 应用场景

- 某些业务中用户需要定期/不定期向单个/多个特定设备发送控制指令，这些指令逻辑已经预先定义好，但是执行时机需要外部触发。如电量表月底上报计量数据，设备临时升级固件等；

- 某个设备状态异常，没有回应预定消息指令，需要额外发送指令触发相关逻辑；

- 控制端难以接入或不具备接入消息服务器以发送控制指令，如微信小程序，服务器定时任务中需要通过 HTTP 请求触发设备某个指令；

- 出于安全考虑，需要代理下发控制指令。


### 设备控制

设备详情页中点击 **设备控制** TAB 页，可以查看下发历史并通过平台直接向该设备下发指令。

- 下发指令内容必须是 JSON 格式字符串；
- 如不指定主题，默认下发主题为 `/devices/$device_id/inbox`；
- 发布的消息为非保留消息 （retained），若指定了发布主题，请确保设备已经订阅该主题。

![](/assets/device_publish.png)


### 分组控制

分组详情、编辑页中可以查看下发历史并通过平台直接向该分组所有设备下发指令。

- 下发指令内容必须是 JSON 格式字符串；
- 默认下发主题为 `/groups/$group_id/inbox`，如果需要下发回执消息将发布到`/devices/$device_id/inbox`；
- 发布的消息为非保留消息 （retained），请确保设备已经连接到消息服务器。

> 需要回执的指令将按设备逐个下发，发送速度相对无需回执较慢。

![](/assets/group_publish.png)



### 最佳实践

- 设备连接到消息服务器后可以自行定义其他主题，也可以通过[代理订阅](device_agent.md)进行操作，服务器已经为主题添加命名空间，无需担心不同账户下主题消息泄露（A、B用户使用同一个主题其消息不会互通）；

- 设备预定指令尽量与主题无关，只需关心收到的消息，解析消息体中的指令即可，此方式便于设备管理，能降低系统复杂性（如分组控制无需设备再自行订阅某个主题）；

- 特殊场景使用 [REST API](../rest/rest.md) 替代直接接入消息服务器控制设备。


```js
// 指令与主题无关代码示例
function onMessage(topic, message) {
  var cmd = { cmd: '' }
  try {
      cmd = JSON.parse(message)
  } catch(e) {
    console.warn('消息为非合法 JSON 格式')
  }
  switch (cmd.cmd) {
    case 'reboot':
      console.log('重新启动')
      break
    case 'upload':
      console.log('上报数据逻辑')
      break
    default: console.log('空')
  }
}
```

```js
// 使用 REST API 查询上报失败电量表数据并控制再次重发
function reUpload(deviceID) {
  const payload = JSON.stringify({
    cmd: 'upload',
    mode: 'normal',
  })
  // 调用 REST API 再次重发
  httpPost('/device_publish', { deviceID, payload, })
}

async function checkBill() {
  // 查询上报情况（假定月底为数据上报日）
  const normalList = await db.query("select deviceId from device_event where 'createdAt' between '2018-03-30' and '2018-03-31' and topic = 'upload' group by deviceId")
  // 未上报设备列表
  const errorList = allDeviceList.filter(_ => !normalList.includes(_))
  // 发送再次上报指令
  errorList.forEach(_ => reUpload(_))
}
```