import React, { Component } from 'react'
import { connect } from 'dva';
import { Button, Modal } from 'antd'
import styles from './user.less';
import SearchFrom from './SearchForm'
import CreateModal from './CreateModal'
import DataTable from './DataTable'

const confirm = Modal.confirm;

@connect(({ user }) => ({
  user
}))
class User extends Component {
  state = {
    selectedRowKeys: [],
    searchFormValue: {},
    createModalVisible: false
  }

  componentDidMount() {
    this.refreshUserData();
  }

  setPagination = (current, pageSize) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/setPagination',
      payload: {
        current,
        pageSize
      }
    })
  }

  findAllUser = params => {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/findAll',
      payload: params
    })
  }

  refreshUserData = () => {
    this.setPagination(1, 10);
    this.setState({
      searchFormValue: {}
    })
    this.form.props.form.resetFields();
    const params = {
      pageSize: 10,
      pageNum: 1
    }
    this.findAllUser(params);
  }

  handleFormSearch = values => {
    this.setPagination(1, 10);
    this.setState({
      searchFormValue: values
    })
    const params = {
      pageSize: 10,
      pageNum: 1,
      ...values
    }
    this.findAllUser(params);
  }

  handleFormReset = () => {
    this.refreshUserData();
  }

  tableChange = pageParams => {
    this.setPagination(pageParams.pageNum, pageParams.pageSize);
    const { searchFormValue } = this.state;
    const params = {
      ...pageParams,
      ...searchFormValue
    }
    this.findAllUser(params);
  }

  selectChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRowKeys
    });
  }

  showCreateModal = () => {
    this.setState({
      createModalVisible: true
    })
  }

  hideCreateModal = () => {
    this.setState({
      createModalVisible: false
    })
  }

  handleCreateOk = async params => {
    const { dispatch } = this.props;
    const res = await dispatch({
      type: 'user/create',
      payload: params
    })
    if (res) {
      this.hideCreateModal();
      this.refreshUserData();
    }
  }

  handleDelete = () => {
    const { refreshUserData, props: { dispatch }, state: { selectedRowKeys } } = this;
    confirm({
      title: '确定删除选中的用户吗',
      content: '删除之后用户相关信息将被移除',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        return new Promise(async (resolve, reject) => {
          const params = {
            userIds: selectedRowKeys
          }
          const res = await dispatch({
            type: 'user/deleteUsers',
            payload: params
          })
          if (res) {
            refreshUserData();
            resolve(true)
          } else {
            reject()
          }
        })
      }
    });
  }

  userDelete = async userIds => {
    const { dispatch } = this.props;
    const params = {
      userIds
    }
    const res = await dispatch({
      type: 'user/deleteUsers',
      payload: params
    })
    if (res) this.refreshUserData();
  }

  render() {
    const { data: { list, total }, pagination: { current, pageSize } } = this.props.user;
    const { selectedRowKeys, createModalVisible } = this.state;

    return (
      <div className={styles.container}>

        <div className={styles.searchbar}>
          <SearchFrom handleFormSearch={this.handleFormSearch} handleFormReset={this.handleFormReset} wrappedComponentRef={(form) => this.form = form} />
        </div>

        <div className={styles.toolbar}>
          <Button type='primary' icon='plus' onClick={this.showCreateModal}>新增</Button>
          {selectedRowKeys.length > 0 ? <Button type='danger' icon='delete' onClick={this.handleDelete}>批量删除</Button> : null}
        </div>

        <DataTable dataSource={list} total={total} current={current} pageSize={pageSize} tableChange={this.tableChange} selectChange={this.selectChange} userDelete={this.userDelete} />

        <CreateModal createModalVisible={createModalVisible} hideCreateModal={this.hideCreateModal} handleCreateOk={this.handleCreateOk} />
      </div>
    )
  }
}

export default User;
