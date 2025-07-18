import { useState } from 'react';




function Greeting()
{
    const [firstName,setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState(18);
    const [greeting, setGreeting] = useState('');
    const greet = () => {
        if(firstName==="Atharv" || firstName==="ATHARV")
        {
            setGreeting("Welcome Monkey");
        }else
        {

        let message = "Welcome " + firstName + " " + lastName + " who is " + age +" years";
        setGreeting(message);
        }
       
    }
    return   (

        <div style={{ textAlign: 'center', marginTop: '50px' }}>

        <input
          type="text"
          placeholder="Enter first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        /> &nbsp;
         <input
          type="text"
          placeholder="Enter last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        /> &nbsp;
         <input
          type="text"
          placeholder="Enter age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        /> &nbsp;

        <button onClick={greet}>Greet</button>
      <br />

      <div>{greeting}</div>
      
        
        


        </div>
       
    );
}


export default Greeting;