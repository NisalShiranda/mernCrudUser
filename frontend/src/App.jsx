import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {MdClose} from 'react-icons/md'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/';

function App() {

  const [addSection,setAddSection] = useState(false);

  const [formData,setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  
  });



  const handleOnChange = (e) => {
    const {value,name} = e.target
    setFormData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    
    })


  }

  const handleSubmit =async(e) => {
    e.preventDefault();

     const data = await axios.post('/create',formData);

     console.log(data);
     if(data.data.success) {
        setAddSection(false);
        alert(data.data.message);
      }
    
  };
  return (
    <>
      <div className="box">
        <button className="btn bg-cyan-800 m-2 font-bold" onClick={() => setAddSection(true)} >ADD
        </button>

        {
          addSection && (
            <div className="form-container bg-slate-400 p-5">
            
          <form className="ml-2 mt-3" onSubmit={handleSubmit}>
              <div className="close-btn" onClick={() => setAddSection(false)}>
                <MdClose/>
              </div>
            <div>
              <label htmlFor="name">Name:</label><br></br>
              <input className="" type="text" name="name" id="name" onChange={handleOnChange} />
            </div>
            <div className="pt-5">
              <label htmlFor="email">Email:</label><br></br>
              <input className="" type="text" name="email" id="email" onChange={handleOnChange} />
            </div>
            <div className="pt-5">
              <label htmlFor="mobile">Mobile:</label><br></br>
              <input className="" type="text" name="mobile" id="mobile" onChange={handleOnChange} />
            </div>
            <div className="mt-5 flex justify-center items-center submit-btn">
              <button className="flex justify-center items-center">SUBMIT</button>
            </div>
            
            
          </form>
        </div>
            
          )
        }

        
      
        

      </div>
    </>
  )
}

export default App
