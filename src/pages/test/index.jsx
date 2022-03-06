import { Button } from 'antd'
import React, { Component } from 'react'

export default class Test extends Component {
    state={
        value:0,
    }
    update1=()=>{
        console.log('对象更新之前',this.state.value)
        this.setState({value:this.state.value+1},()=>{console.log('执行回调',this.state.value)})
        console.log('对象更新之后',this.state.value)
        console.log('对象更新之前',this.state.value)
        this.setState({value:this.state.value-1},()=>{console.log('执行回调',this.state.value)})
        console.log('对象更新之后',this.state.value)
    }
    update4=()=>{
        console.log('对象更新之前',this.state.value)
        this.setState({value:5},()=>{console.log('执行回调',this.state.value)})
        console.log('对象更新之后',this.state.value)
        console.log('对象更新之前',this.state.value)
        this.setState({value:3},()=>{console.log('执行回调',this.state.value)})
        console.log('对象更新之后',this.state.value)
    }
    update2=()=>{
        console.log('函数更新之前',this.state.value)
        this.setState(state=>({value:state.value+1}),()=>{console.log('执行回调',this.state.value)})
        console.log('函数更新之后',this.state.value)
        console.log('对象更新之前',this.state.value)
        this.setState({value:this.state.value+1},()=>{console.log('执行回调',this.state.value)})
        console.log('对象更新之后',this.state.value)
    }
    update5=()=>{
        console.log('函数更新之前',this.state.value)
        this.setState(state=>({value:state.value+1}),()=>{console.log('执行回调',this.state.value)})
        console.log('函数更新之后',this.state.value)
        console.log('对象更新之前',this.state.value)
        this.setState({value:-3},()=>{console.log('执行回调',this.state.value)})
        console.log('对象更新之后',this.state.value)
    }
    update3=()=>{

        console.log('对象更新之前',this.state.value)
        this.setState({value:this.state.value+1},()=>{console.log('执行回调',this.state.value)})
        console.log('对象更新之后',this.state.value)
        console.log('函数更新之前',this.state.value)
        this.setState(state=>({value:state.value+1}),()=>{console.log('执行回调',this.state.value)})
        console.log('函数更新之后',this.state.value)
    }
    update6=()=>{

        console.log('对象更新之前',this.state.value)
        this.setState({value:-3},()=>{console.log('执行回调',this.state.value)})
        console.log('对象更新之后',this.state.value)
        console.log('函数更新之前',this.state.value)
        this.setState(state=>({value:state.value+5}),()=>{console.log('执行回调',this.state.value)})
        console.log('函数更新之后',this.state.value)
    }
    update7=()=>{
        setTimeout(()=>{
            console.log('对象更新之前',this.state.value)
        this.setState({value:-3},()=>{console.log('执行回调',this.state.value)})
        console.log('对象更新之后',this.state.value)
        console.log('函数更新之前',this.state.value)
        this.setState(state=>({value:state.value+5}),()=>{console.log('执行回调',this.state.value)})
        console.log('函数更新之后',this.state.value)},0
        )
    }
    update8=()=>{
        setTimeout(()=>{
            console.log('函数更新之前',this.state.value)
        this.setState(state=>({value:state.value+1}),()=>{console.log('执行回调',this.state.value)})
        console.log('函数更新之后',this.state.value)
        console.log('对象更新之前',this.state.value)
        this.setState({value:this.state.value+1},()=>{console.log('执行回调',this.state.value)})
        console.log('对象更新之后',this.state.value)},0
        )
        
    }
    render() {
        console.log('render',this.state.value)
        return (
            
            <div>
                <span>{this.state.value}</span>
                <Button onClick={()=>this.update1()}>更新1</Button>
                <Button onClick={()=>this.update2()}>更新2</Button>
                <Button onClick={()=>this.update3()}>更新3</Button>
                <Button onClick={()=>this.update4()}>更新4</Button>
                <Button onClick={()=>this.update5()}>更新5</Button>
                <Button onClick={()=>this.update6()}>更新6</Button>
                <Button onClick={()=>this.update7()}>异步更新6</Button>
                <Button onClick={()=>this.update8()}>异步更新2</Button>
            </div>
        )
    }
}
