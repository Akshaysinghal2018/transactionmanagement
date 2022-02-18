import { put,delay,takeEvery,all } from "redux-saga/effects";

function * AsyncInc(){
    //yield delay(1000)
    yield put({type:"INC",payload:1})

}
function * AsyncDec(){
    //yield delay(1000)
    yield put({type:"DEC",payload:1})

}
function * AsyncSet(data){
    //yield delay(1000)
    yield put({type:"SET",payload:data})

}

function * watcher(){
    yield takeEvery('Inc_count',AsyncInc)
    yield takeEvery('Dec_count',AsyncDec)
    yield takeEvery('Set_count',AsyncSet)
}
export default   function  * Sagafunction() {
    yield all([
        watcher()
    ]

    )
}


