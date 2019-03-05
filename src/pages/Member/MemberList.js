import React from 'react';
import { Form,Button,Icon,Row,Col,Input,Card,Dropdown,Table,Avatar,Divider } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './MemberList.less';



//包装组件
@Form.create()
class MemberList extends React.Component{

  constructor(props){
    super(props);
  }


  state = {
    //查询条件默认收缩
    expandForm:false,
    //选中行
    selectedRows:[],
    //弹出新增模态框
    modalVisible:false,
    //数据
    data:[],
  };

  //表格列信息
  columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '姓名',
      dataIndex: 'username',
      key: 'username',
    }, 
    {
      title: '手机号码',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '头像',
      dataIndex: 'head_img',
      key: 'head_img',
      render:(text, record, index)=>{
        <Avatar src={text} />
      }
    },
    {
      title: '操作',
      key: 'action',
      render:(text, record, index)=>{
        console.log(text,record);
        <span>
          <a href="javascript:;">编辑</a>
          <Divider type="vertical" />
          <a href="javascript:;">删除</a>
        </span>
      }
    },
  ];

  

  //组件挂载后执行
  componentDidMount(){
    console.log(this);
    /* const { dispatch } = this.props;
    dispatch({
      type: 'list/fetch',
      payload: {
        count: 5,
      },
    }); */
  }

  

  // 查询条件渲染
  renderForm(e) {
    //用于表单双向绑定
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 6, lg: 24, xl: 48 }}>
          <Col md={6} sm={24}>
            <Form.Item label="会员名">
              {getFieldDecorator('name',{
                rules:[{message:'请输入会员名'}]
              })(<Input placeholder="请输入" />)}
            </Form.Item>
          </Col>
          <Col md={6} sm={24}>
            <Form.Item label="手机号">
              {getFieldDecorator('phone')(<Input placeholder="请输入" />)}
            </Form.Item>
          </Col>
          <Col md={6} sm={24}>
            <Form.Item label="手机号">
              {getFieldDecorator('phone')(<Input placeholder="请输入" />)}
            </Form.Item>
          </Col>
          <Col>
            <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
          </Col>
        </Row>
      </Form>
    );
  }

  //执行搜索
  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('收到的表单值: ', values);
    });
  }

  //重置
  handleFormReset = (e) => {
    this.props.form.resetFields();
  }
  
  //展开收起
  toggleForm = () => {
    this.setState({
      expandForm : !this.state.expandForm 
    });
  }

  //新建
  handleModalVisible = (flag) => {
    this.setState({
      modalVisible:flag
    })
  }


  

  render(){
    return (
      <PageHeaderWrapper title="会员列表">
        <Card bordered={false}>
        <div className={styles.tableList}>
            {/* 查询条件 */}
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            {/* 操作 */}
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
              {this.state.selectedRows.length > 0 && (
                <span>
                  <Button>批量操作</Button>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
          </div>
        </Card>
        <Table dataSource={this.state.data} columns={this.columns} pagination="bottom" />
      </PageHeaderWrapper>
    );
  }
}

export default MemberList;