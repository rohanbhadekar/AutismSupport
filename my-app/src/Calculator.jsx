import { useState } from 'react';

function Calculator() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [operator, setOperator] = useState('+');
  const [result, setResult] = useState('');

  const calculate = () => {
    const num1 = parseFloat(a);
    const num2 = parseFloat(b);
    let res = '';

    switch (operator) {
      case '+':
        res = num1 + num2;
        break;
      case '-':
        res = num1 - num2;
        break;
      case '*':
        res = num1 * num2;
        break;
      case '/':
        res = num2 !== 0 ? num1 / num2 : 'Cannot divide by 0';
        break;
      default:
        res = 'Invalid Operator';
    }

    setResult(res);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <input
        type="text"
        placeholder="Enter first number"
        value={a}
        onChange={(e) => setA(e.target.value)}
      />
      <select value={operator} onChange={(e) => setOperator(e.target.value)}>
        <option value="+">+</option>
        <option value="-">−</option>
        <option value="*">×</option>
        <option value="/">÷</option>
      </select>
      <input
        type="text"
        placeholder="Enter second number"
        value={b}
        onChange={(e) => setB(e.target.value)}
      />
      <button onClick={calculate}>Calculate</button>
      <br />
      <input type="text" readOnly value={result} placeholder="Result" />
    </div>
  );
}

export default Calculator;