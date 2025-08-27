import { useState } from 'react';
import './App.css'

function heavyComputation() {
  let result = 0;
  for (let i = 0; i < 1_000_00000; i++){
    result += i;
  }
  return result;
}

function App() {
  const[count, setCount] = useState(heavyComputation); // 여기서 함수 실행 시키면 느림.. 인자 자체를 넘기면 증가만 시킨다
  // const [count, setCount] = useState(()=> heavyComputation()) -> 위 코드와 동일

  const handleIncrease = () => {
    setCount((prev) => prev + 1); // 이전 값을 기억해서 증가 시킴

    console.log(count); // 비동기, 늦게 업데이트 됨 (이전 상태)
  } 

  return ( 
    <>
      <h1>{count}</h1>
      <button onClick={handleIncrease}>증가</button>
    </>
  )
}

export default App
