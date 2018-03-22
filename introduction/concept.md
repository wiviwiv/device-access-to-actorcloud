# 基础概念

### *EMQ* 消息服务器与 **actorcloud**

***EMQ*** （Erlang/Enterprise/Elastic MQTT Broker） 是基于 Erlang/OTP 平台开发的开源物联网 MQTT 消息服务器。Erlang/OTP 是出色的软实时（Soft-Realtime）、低延时（Low-Latency）、分布式（Distributed） 的语言平台。MQTT 是轻量的（Lightweight）、发布订阅模式（PubSub） 的物联网消息协议。

**actorcloud 设备管理平台**是 ***EMQ* 官方团队**基于***EMQ* 消息服务器**集群开发并负责运维的综合物联网设备接入、管理平台。



### MQTT 发布订阅模式
MQTT 是发布订阅（Publish/Subscribe） 模式的消息协议，与 HTTP 协议请求响应（Request/Response） 模式不同，MQTT 具有长连接消息实时性。

MQTT 发布者与订阅者之间通过"主题"（Topic）进行消息路由，主题（Topic） 格式类似 Unix 文件路径，例如:

`chat/room/subject`

`presence/user/feng`

`sensor/1/#`

`sensor/+/temperature`

`uber/drivers/joe/inbox`

MQTT 主题（Topic） 支持 ‘+’, ‘#’ 的通配符，‘+’ 通配一个层级，‘#’通配多个层级（必须在末尾）。

MQTT 消息发布者（Publisher） 只能向特定‘名称主题’（不支持通配符）发布消息，订阅者（Subscriber）通过订阅‘过滤主题’（支持通配符）来匹配消息，查看[在线调试](../access/device_message.md)。



### **actorcloud** 支持接入协议

**actorcloud 设备管理平台**支持多种接入协议，以下是对照信息：

| 名称  | 接入地址 | 使用说明 |
| ------- | ------- | ----|
| MQTT  | mqtt://actorcloud.io:1883 | 普通 MQTT 接入 |
| MQTT/SSL  | mqtts://actorcloud.io:8883 | SSL MQTT 接入（单向认证） |
| MQTT/SSL  | tls://actorcloud.io:8884 | SSL MQTT 接入 （双向认证）|
| CoAP  | coap://actorcloud.io:5683/mqtt | MQTT/CoAP 接入 |
| CoAP/DTLS  | coap://actorcloud.io:5684/mqtt | DTLS MQTT/CoAP 接入 |
| MQTT/WebSocket  | ws://actorcloud.io:8083/mqtt | MQTT/WebSocket 接入 |
| MQTT/WebSocket/SSL  | wss://actorcloud.io:8084/mqtt | SSL MQTT/WebSocket 接入 |

同一账户下的设备使用以上任意接入方式消息是互通的，WebSocket 与 CoAP 接入需要加上 `/mqtt` 前缀。其中 emq-coap 网关不接受 POST 和 DELETE 请求。

SSL/TLS 和 DTLS 所用证书请移步[证书集成](../security/certs.md)查看。
