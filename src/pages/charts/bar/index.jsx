import React, { Component } from "react";
import { Button, Card } from "antd";
import ReactEcharts from "echarts-for-react";

import './index.less'
export default class Bar extends Component {
    state={
        sales:[5,20,36,10,10,20],
        stores:[6,10,25,20,15,10],
    }

    update = () =>{
        this.setState(state=>({
            sales:state.sales.map(sale=>sale+1),
            stores:state.stores.reduce((pre,store)=>{
                pre.push(store-1)
                return pre
            },[]),
        }))
    }
  /* 返回柱状图的配置对象 */
  getOption = (sales,stores) => {
    return {
      title: {
        text: "销量",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      legend: {
        data: ["销量", "库存"],
      },
      xAxis: [
        {
          type: "category",
          data: ["衬衫", "羊毛衫", "裤子", "雪纺衫", "高跟鞋", "袜子"],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "销量",
          type: "bar",
          // barWidth: '60%',
          data: sales,
        },
        {
          name: "库存",
          type: "bar",
          // barWidth: '60%',
          data: stores,
        },
      ],
    };
  };
  render() {
      const {sales,stores} = this.state
    return (
        <div>
      <Card >
        <Button onClick={()=>this.update()}type="primary">更新</Button>
        </Card>
          <Card title='柱状图'>
          <ReactEcharts style={{height:'300px'}} option={this.getOption(sales,stores)}></ReactEcharts>
          </Card>
      </div>
    );
  }
}
