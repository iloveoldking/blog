import React from 'react'
import { Table, Avatar, Button, Popconfirm, Divider } from 'antd';
import { completeAddress } from '@/utils/tools'

const DateTable = props => {
  const { dataSource, current, pageSize, total, tableChange, selectChange, articleDelete, showInfo } = props;

  const handelConfirm = record => {
    articleDelete([record._id])
  }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      selectChange(selectedRowKeys, selectedRows);
    }
  };

  const onChange = pagination => {
    const pageParams = {
      pageSize: pagination.pageSize,
      pageNum: pagination.current
    }
    tableChange(pageParams);
  }

  const info = record => {
    showInfo(record)
  }

  const columns = [
    {
      title: '序号',
      width: 80,
      render: (text, record, index) => {
        return index + 1;
      }
    },
    {
      title: '标题',
      dataIndex: 'title'
    },
    {
      title: '作者',
      dataIndex: 'user',
      render: (text, record, index) => {
        return (<div style={{ whiteSpace: 'nowrap' }}>
          {text.photo ? <Avatar src={completeAddress(text.photo)} /> : <Avatar>{text.nickname.slice(0, 1)}</Avatar>}
          <span style={{ marginLeft: '5px' }}>{text.nickname}</span>
        </div>)
      }
    },
    {
      title: '收藏量',
      dataIndex: 'collectCount'
    }, ,
    {
      title: '点赞量',
      dataIndex: 'likeCount'
    }, ,
    {
      title: '评论量',
      dataIndex: 'commentCount'
    },
    {
      title: '发表时间',
      dataIndex: 'createdAt'
    },
    {
      title: '操作',
      render: (text, record, index) => {
        return (
          <div style={{ whiteSpace: 'nowrap' }}>
            <Button type='primary' icon='info-circle' onClick={info.bind(null, record)}>查看</Button>
            <Divider type="vertical" />
            <Popconfirm
              title="确定删除该文章吗"
              onConfirm={handelConfirm.bind(null, record)}
            >
              <Button type='danger' icon='delete'>删除</Button>
            </Popconfirm>
          </div>

        )
      }
    },
  ];

  const tableConfig = {
    bordered: true,
    columns,
    dataSource,
    rowSelection,
    onChange,
    rowKey: '_id',
    pagination: {
      hideOnSinglePage: true,
      pageSize,
      current,
      total
    }
  }
  return <Table {...tableConfig} />
}

export default DateTable;
