export const articleColumns = [
  { title: '文章标题',dataIndex: 'title',align:'center',},
  { title: '所属标签',dataIndex: 'tag',align:'center',needTotal: true,},
  { title: '创建时间',dataIndex: 'createTime',align:'center'},
  { title: '修改时间',dataIndex: 'changeTime',align:'center'},
  { title: '浏览次数',dataIndex: 'viewNum',align:'center',customRender: (text) => text + ' 次'},
  {title: '操作',fixed:'right',align:'center',scopedSlots: { customRender: 'action' }}
]

export const tagColumns = [
  { title: '标签名称',dataIndex: 'name',align:'center',},
  { title: '创建时间',dataIndex: 'createTime',align:'center'},
  { title: '修改时间',dataIndex: 'changeTime',align:'center'},
  {title: '操作',fixed:'right',align:'center',scopedSlots: { customRender: 'action' }}
]
export const moodColumns = [
  { title: '日志记录',dataIndex: 'cont',align:'center',},
  { title: '创建时间',dataIndex: 'createTime',align:'center'},
  { title: '修改时间',dataIndex: 'changeTime',align:'center'},
  {title: '操作',fixed:'right',align:'center',scopedSlots: { customRender: 'action' }}
]
