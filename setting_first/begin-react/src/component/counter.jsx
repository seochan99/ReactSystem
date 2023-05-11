import React,{useState} from 'react'

export default function Counter() {
    
    const [count, setCount] = useState(0);

    const onIncrease = () => {

        setCount(count+1);
        // setCount(prevCount => prevCount + 1);
    };
    const onDecrease = () => {
        // count = count - 1;
        // setCount(count-1);
        // setCount(prevCount => prevCount - 1);
    };

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  )
}
