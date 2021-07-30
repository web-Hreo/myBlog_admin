export const articleColumns = [
  { title:'文章排序',dataIndex:'index',align:'center',width:100},
  { title:'文章封面',dataIndex:'viewImg',align:'center',scopedSlots: { customRender: 'viewImg' }},
  { title: '文章标题',dataIndex: 'title',align:'center',width:500},
  { title: '所属标签',dataIndex: 'tag',align:'center',needTotal: true,},
  { title: '浏览次数',dataIndex: 'viewNum',align:'center',customRender: (text) => text + ' 次'},
  { title: '创建时间',dataIndex: 'createTime',align:'center'},
  { title: '修改时间',dataIndex: 'changeTime',align:'center'},
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
