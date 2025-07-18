import { useState } from 'react';

function Counter({intialNumber}) {
  const [variable, setCount] = useState(intialNumber);
  const [count, setClicks] = useState(0); // 👈 New state
  
  const isEven = variable % 2 === 0;
  const message =  isEven  ? "this is even number" : "This is odd number"
  
  const handleClick = (newValue) => {
    setCount(newValue);
    setClicks(count + 1);
  };



  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Count: {variable}</h1>
     <button onClick={()=>handleClick(variable+1)  }>Increase</button>
     <button onClick={()=>handleClick(variable-1)}>Descrease</button>
     <button onClick={()=> handleClick(intialNumber) }>Reset </button>
     <h3>{message}</h3>
      <h2> You have clicked : {count } number of times </h2>
    </div>
  );
}

export default Counter;

