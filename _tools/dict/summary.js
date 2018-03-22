// 标题

const summary = [
  {
    title: '概览',
    path: 'README.md',
  },
  {
    title: '快速入门',
    path: 'introduction/introduction.md',
    child: [
      {
        title: '基础概念',
        path: 'introduction/concept.md',
      },
      {
        title: '应用场景',
        path: 'introduction/scenario.md',
      },
      {
        title: '创建账户',
        path: 'introduction/account.md',
      },
    ],
  },
  {
    title: '接入指南',
    path: 'access/access.md',
    child: [
      {
        title: '前期准备',
        path: 'access/preparation.md',
      },
      {
        title: '设备录入',
        path: 'access/device_create.md',
      },
      {
        title: '认证鉴权',
        path: 'access/device_auth.md',
      },
      {
        title: '收发示例',
        path: 'access/device_message.md',
      },
    ],
  },
  {
    title: '控制管理',
    path: 'manage/manage.md',
    child: [
      {
        title: '指令下发',
        path: 'manage/device_control.md',
      },
      {
        title: '代理订阅',
        path: 'manage/device_control.md',
      },
    ],
  },
  {
    title: '数据管理',
    path: 'data/data.md',
    child: [
      {
        title: '连接日志',
        path: 'data/connect.md',
      },
      {
        title: '上行消息',
        path: 'data/upstream.md',
      },
      {
        title: '下行消息',
        path: 'data/downstream.md',
      },
    ],
  },
  {
    title: '安全性与规则',
    path: 'security/security.md',
    child: [
      {
        title: '证书集成',
        path: 'security/certs.md',
      },
      {
        title: '设备策略',
        path: 'security/policies.md',
      },
    ],
  },
  {
    title: 'API 文档',
    path: 'rest/rest.md',
    child: [],
  },
  {
    title: '示例代码',
    path: 'product/product.md',
    child: [],
  },
]

module.exports = summary
