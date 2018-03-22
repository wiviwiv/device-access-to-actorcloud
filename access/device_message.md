# 在线调试

依次点击 **测试中心** -> **MQTT 客户端**可以进行在线连接、订阅发布调试。

设备成功接入设备管理平台后会自动订阅两个主题：

- 设备主题，用于接收单个设备下发消息：`/devices/$device_id/inbox`
- 分组主题，用于接收分组下发消息：`/groups/$group_id/inbox`

在平台进行设备、分组指令下发，设备将收到来自相关主题的消息。

根据 MQTT 特性，相同 ClientId 的设备不能同时在线，否则会产生"重连-互相踢下线"现象，请创建测试设备或选择离线设备进行调试。

> 在线调试使用 MQTT WebSocket 客户端实现。

![](/assets/mqtt_client.png)

![](/assets/mqtt_publish.png)
