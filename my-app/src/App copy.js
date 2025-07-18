
import './App.css';
import Books from './Books';
import Counter from './Counter';
import Greeting from './Greeting'
import Calculator from './Calculator'
import Login from './Login';
import Employee from './Employee';

function App() {
  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>🔥 My First React Counter App</h2>
      <Counter intialNumber={4} />

     <Greeting/>
    
      <Books initialBooks={[]}></Books>
      <Calculator/>
      <Login title ="Customer login"/>
      <Employee initialEmpList={[{ id: 1, empName: "Rohan",empLastName:"Bhadekar" }, { id: 2, empName: "Manjiri",empLastName:"Patil" }]}/>
    </div>
  );
}

export default App;
