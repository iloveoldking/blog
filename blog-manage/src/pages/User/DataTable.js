import React, { Fragment } from 'react'
import { Table, Avatar, Button, Popconfirm } from 'antd';
import { completeAddress } from '@/utils/tools'

const DateTable = props => {
  const { dataSource, current, pageSize, total, tableChange, selectChange, userDelete } = props;

  const handelConfirm = record => {
    userDelete([record._id])
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

  const columns = [
    {
      title: '序号',
      width: 80,
      render: (text, record, index) => {
        return index + 1;
      }
    },
    {
      title: '用户',
      dataIndex: 'nickname',
      render: (text, record, index) => {
        return (<Fragment>
          {record.photo ? <Avatar src={completeAddress(record.photo)} /> : <Avatar>{text.slice(0, 1)}</Avatar>}
          <span style={{ marginLeft: '5px' }}>{text}</span>
        </Fragment>)
      }
    },
    {
      title: '手机号',
      dataIndex: 'mobile'
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt'
    },
    {
      title: '操作',
      render: (text, record, index) => {
        return (
          <Popconfirm
            title="确定删除该用户吗"
            onConfirm={handelConfirm.bind(null, record)}
          >
            <Button type='danger' icon='delete'>删除</Button>
          </Popconfirm>
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
