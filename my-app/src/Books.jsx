
import { useState } from "react";
function  Books({ initialBooks })
{
    const [bookName, setBookName] = useState('');
    const [bookList,setBookList] = useState(initialBooks || []);

    const AddToList =()=>{
        if (bookName.trim() === '') return; // avoid empty book names
       
        
         setBookList([...bookList, bookName]);
         setBookName('');

    }

    return(
    
    <ul>
         <input
          type="text"
          placeholder="Enter book name"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
        /> &nbsp;

        <button onClick={AddToList}>Add to list</button>
        {bookList.map((b, i) => <li key={i}>{b}</li>)}
</ul>);


}

export default Books;