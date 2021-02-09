import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
import Form from './component/Form'

function App() {

  const [mockData, setMockData] = useState(null);
  
  useEffect(async()=>{
    try {
      const response = await fetch(`${window.location.href}data.json`,{
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      })
      const data = await response.json()
      setMockData(data);
    } catch(err) {
      console.log("error:", err)
    }
  },[])
  return (
    <div className="App">
      <Form mockData={mockData}/>
    </div>
  );
}

export default App;
