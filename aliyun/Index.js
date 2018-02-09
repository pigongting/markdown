import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import cs from 'classnames';
import { DataSet } from '@antv/data-set';
import { Chart, Tooltip, Axis, Legend, Bar, View, Polygon, Point } from 'viser-react';
// antd 组件
import { Form, Layout, Button, Row, Col } from 'antd';
import { China as geoData } from 'china-geojson';
// 本页样式
import styles from './Index.less';

// antd 组件扩展
const { Header, Content } = Layout;

const pagespace = 'index';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.props.pagedata.form = this.props.form;
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
    // console.log(this.props);
    if (nextProps.pagedata.res.barGraph && nextProps.pagedata.res.barGraph.length > 0 && nextProps.pagedata.res.barGraph !== this.props.pagedata.res.barGraph) {
      /* 获取一个月的天数 */
      const getCountDays = () => {
        const curDate = new Date();
        /* 获取当前月份 */
        const curMonth = curDate.getMonth();
        /*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
        curDate.setMonth(curMonth + 1);
        /* 将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的 */
        curDate.setDate(0);
        /* 返回当月的天数 */
        return curDate.getDate();
      };

      const day = getCountDays();

      const getEvryDay = () => {
        const dayArry = [];
        for (let k = 1; k <= day; k++) {
          dayArry.push(`${k}日`);
        }
        return dayArry;
      };

      const alldays = getEvryDay();

      const dv = new DataSet.View().source(nextProps.pagedata.res.barGraph);
      dv.transform({
        type: 'fold',
        fields: alldays,
        key: '日期',
        value: '数量',
      });
      nextProps.pagedata.res.barGraphData = dv.rows;
    }

    if (nextProps.pagedata.res.chinaMap && nextProps.pagedata.res.chinaMap.length > 0 && nextProps.pagedata.res.chinaMap !== this.props.pagedata.res.chinaMap) {
      // console.log(nextProps.pagedata.res.chinaMap);
      const worldMap = new DataSet.View().source(geoData, {
        type: 'GeoJSON',
      });

      const userDv = new DataSet.View().source(nextProps.pagedata.res.chinaMap).transform({
        geoDataView: worldMap,
        field: 'name',
        type: 'geo.region',
        as: ['longitude', 'latitude'],
      }).transform({
        type: 'map',
        callback: (obj) => {
          obj.trend = obj.value;
          return obj;
        },
      });
      nextProps.pagedata.res.chinaMapData = worldMap;
      nextProps.pagedata.res.shenData = userDv;
    }
  }

  render() {
    const { form, pagedata } = this.props;
    const { getFieldDecorator } = form;
    const { req, res, set } = pagedata;
    const { chinaMapData, shenData, barGraphData, userStatistics, orderStatistics } = res;

    return (
      <Form className="formPage" id="editMode" onSubmit={(e) => { this.props.handleSubmit(form, e); }}>
        <Layout className="formPageLayout">
          <Header className="formPageHeader">
            <div className="pageTitle">首页</div>
            <div className="pageOperat" />
          </Header>
          <Content className={cs('formPageContent', styles.indexPageContent)} id="formScrollContent">
            <Row gutter={16}>
              <Col className="gutter-row" span={4}>
                <div className="gutter-box">
                  {orderStatistics ?
                    <div className={styles.statisticsCard}>
                      <div className={styles.title}>收入</div>
                      <div className={styles.lead}>¥ {orderStatistics[0].salesMoney}</div>
                      <div className={styles.vice}>当月收入总数</div>
                    </div>
                  : null}
                </div>
              </Col>
              <Col className="gutter-row" span={4}>
                <div className="gutter-box">
                  {orderStatistics ?
                    <div className={styles.statisticsCard}>
                      <div className={styles.title}>订单</div>
                      <div className={styles.lead}>{orderStatistics[0].orderCount}</div>
                      <div className={styles.vice}>当月付款订单总数</div>
                    </div>
                  : null}
                </div>
              </Col>
              {userStatistics && userStatistics.map((item, key) => {
                return (
                  <Col key={key} className="gutter-row" span={4}>
                    <div className="gutter-box">
                      <div className={styles.statisticsCard}>
                        <div className={styles.title}>{item.userType}</div>
                        <div className={styles.lead}>{item.qty}</div>
                        <div className={styles.vice}>截至时间：{moment(new Date().getTime()).format('YYYY-MM-DD')}</div>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
            {barGraphData ?
              <div className={styles.barGraphData}>
                <div className={styles.title}>本月销售额</div>
                <Chart forceFit height={300} data={barGraphData}>
                  <Tooltip />
                  <Axis />
                  <Legend />
                  <Bar position="日期*数量" color="name" adjust={[{ type: 'dodge', marginRatio: 1 / 32 }]} />
                </Chart>
              </div>
            : null}
            {chinaMapData ?
              <div className={styles.chinaMapData}>
                <div className={styles.title}>本月地区销售额</div>
                <div className={styles.map} style={{ width: 1200 }}>
                  <Chart width={1200} height={800} padding={[20, 20]} scale={[{ dataKey: 'longitude', sync: true }, { dataKey: 'latitude', sync: true }]}>
                    <Tooltip showTitle={false} />
                    <View data={chinaMapData} scale={[{ dataKey: 'longitude', sync: true }, { dataKey: 'latitude', sync: true }]}>
                      <Polygon
                        quickType="polygon"
                        position="longitude*latitude"
                        style={{
                          fill: '#fff',
                          stroke: '#ccc',
                          lineWidth: 1,
                        }}
                        tooltip={false}
                      />
                    </View>
                    <View data={shenData} scale={[{ dataKey: 'name', alias: '省份' }, { dataKey: 'trend', alias: '销量' }]}>
                      <Polygon
                        quickType="polygon"
                        position="longitude*latitude"
                        opacity="value"
                        color={['trend', ['#3a47d8']]}
                        tooltip="name*trend"
                        animate={{
                          leave: {
                            animation: 'fadeOut',
                          },
                        }}
                      />
                    </View>
                  </Chart>
                </div>
              </div>
            : null}
          </Content>
        </Layout>
      </Form>
    );
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {};
}

function mapStateToProps(state, ownProps) {
  return {
    pagedata: state[pagespace],
    locale: state.ssr.locale,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({
  mapPropsToFields(props) {
    const { pagedata } = props;
    const { req, form } = pagedata;
    const { fields } = req;
    // console.log(fields);
    // console.log(form);
    const formdata = form && form.getFieldsValue();
    const newmap = {};

    for (const key in formdata) {
      if (Object.prototype.hasOwnProperty.call(formdata, key)) {
        const formkeyvalue = formdata[key];
        const fieldskeyvalue = fields[key] && fields[key].value;
        const fieldskeycover = fields[key] && fields[key].cover;

        if (formkeyvalue !== undefined) {
          newmap[key] = { value: fieldskeycover ? fieldskeyvalue : formkeyvalue };
        } else if (fieldskeyvalue !== undefined) {
          newmap[key] = fields[key];
        } else {
          newmap[key] = undefined;
        }
      }
    }
    // console.log(newmap);
    return newmap;
  },
})(Index));
