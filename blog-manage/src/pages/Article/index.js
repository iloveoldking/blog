import React, { Component } from 'react'
import { connect } from 'dva';
import { Button, Modal } from 'antd'
import styles from './article.less';
import SearchFrom from './SearchForm'
import DataTable from './DataTable';

const confirm = Modal.confirm;

@connect(({ article }) => ({
  article
}))
class Article extends Component {
  state = {
    selectedRowKeys: [],
    searchFormValue: {},
    article:{},
    visible: false
  }

  componentDidMount() {
    this.refreshArticleData();
  }

  setPagination = (current, pageSize) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'article/setPagination',
      payload: {
        current,
        pageSize
      }
    })
  }

  findAllArticles = params => {
    const { dispatch } = this.props;
    dispatch({
      type: 'article/findAll',
      payload: params
    })
  }

  refreshArticleData = () => {
    this.setPagination(1, 10);
    this.setState({
      searchFormValue: {}
    })
    this.form.props.form.resetFields();
    const params = {
      pageSize: 10,
      pageNum: 1
    }
    this.findAllArticles(params);
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
    this.findAllArticles(params);
  }

  handleFormReset = () => {
    this.refreshArticleData();
  }

  tableChange = pageParams => {
    this.setPagination(pageParams.pageNum, pageParams.pageSize);
    const { searchFormValue } = this.state;
    const params = {
      ...pageParams,
      ...searchFormValue
    }
    this.findAllArticles(params);
  }

  selectChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRowKeys
    });
  }

  handleDelete = () => {
    const { refreshArticleData, props: { dispatch }, state: { selectedRowKeys } } = this;
    confirm({
      title: '确定删除选中的文章吗',
      content: '删除之后文章相关信息将被移除',
      okText: '确定',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        return new Promise(async (resolve, reject) => {
          const params = {
            articleIds: selectedRowKeys
          }
          const res = await dispatch({
            type: 'article/deleteArticles',
            payload: params
          })
          if (res) {
            refreshArticleData();
            resolve(true)
          } else {
            reject()
          }
        })
      }
    });
  }

  articleDelete = async articleIds => {
    const { dispatch } = this.props;
    const params = {
      articleIds
    }
    const res = await dispatch({
      type: 'article/deleteArticles',
      payload: params
    })
    if (res) this.refreshArticleData();
  }

  showInfo = article => {
    this.setState({
      visible: true,
      article
    })
  }

  hideInfo= () => {
    this.setState({
      visible: false,
      article: {}
    })
  }

  render() {
    const { data: { list, total }, pagination: { current, pageSize } } = this.props.article;
    const { selectedRowKeys, visible, article: {title, content} } = this.state;

    return (
      <div className={styles.container}>

        <div className={styles.searchbar}>
          <SearchFrom handleFormSearch={this.handleFormSearch} handleFormReset={this.handleFormReset} wrappedComponentRef={(form) => this.form = form} />
        </div>

        <div className={styles.toolbar}>
          {selectedRowKeys.length > 0 ? <Button type='danger' icon='delete' onClick={this.handleDelete}>批量删除</Button> : null}
        </div>

        <DataTable dataSource={list} total={total} current={current} pageSize={pageSize} tableChange={this.tableChange} selectChange={this.selectChange} articleDelete={this.articleDelete} showInfo={this.showInfo} />

        <Modal
          width='60vw'
          title={title}
          visible={visible}
          onCancel={this.hideInfo}
          footer={null}
        >
          <div className={styles.expandedContent} dangerouslySetInnerHTML={{ __html: content }}></div>
        </Modal>
      </div>
    )
  }
}

export default Article;
