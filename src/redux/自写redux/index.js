/* redux库的主模块
1.createStore(
    2.comnbineReducers
    3.applyMiddleware
    4.getState
    5.dispatch
    6.subscribe
) */

/* 根据指定reducer创建对象 */
export function createStore(reducer) {
    //初始值为调用reducer返回函数的结果（外部指定的默认值）
    let state = reducer(undefined,'@@redux/init')
    //用来存储监听state更新回调函数的数组容器
    const listeners=[]
    /* 返回内部的state数据 */
    function getState(){
        return state
    }

    /* 1.分发action，出发reducer调用，产生新state 
    2.保存新的state
    3.调用所有已存在的监听回调函数*/
    function dispatch(action){
        //1
        const newState = reducer(state,action)
        //2
        state = newState
        //3
        listeners.forEach(listener=>listener())
    }

    /*  
    绑定内部state改变的监听回调
    */
    function subscribe(listener){
        //保存到缓存的listener容器中
        listeners.push(listener)
    }

    return {
        getState,
        dispatch,
        subscribe
    }
}


/* 整合传入的包含多个reducer的对象 */
export function combineReducers(reducers){
    //执行reducers中每个reducer函数得到一个新的子状态，并封装一个对象
    return (state={},action)=>{
            const newState =Object.keys(reducers).reduce((preState,key)=>{
                preState[key] = reducers[key](state[key],action)
                return preState
            },{})
            return newState
            // const totalState={}
            // Object.keys(reducers).forEach(key=>{
            //     totalState[key]=reducers[key](state[key],action)
            // })
            // return totalState
    }
}