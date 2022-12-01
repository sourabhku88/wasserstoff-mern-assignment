import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditorCustomToolbarOption from './Editor';


const Host = 'http://localhost:1234/create/student' // --------------------------- backend url 
const Home = () => {
  const [user, setUser] = useState('');
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('');
  const [textData, setTextData] = useState('');
  const navigate = useNavigate()


  // --------------------------------create student fun
  const addstudent = async () => {
    try {
      let summary = textData
      const { data } = await axios.post(Host, { name, topic, summary });
      if (data.message)
        console.log(name, topic, textData);
      toast.success('Student Create...!');
      setTextData(''); setName(''); setTopic('')
    } catch ({ response }) {
      toast.error(response.data.message);
      console.log(response);
    }
  }

  // --------------------------------send deshboard page fun
  const submit = async (e) => {
    e.preventDefault()
    if (user === '') toast.error('Enter Student Name..!');
    else {
      setUser('');
      navigate(`/dashboard/${user}`);
    }
  }
  return (
    <>
      <div className="text-end  bg-danger bg-opacity-10">
        <button type="button" className="btn btn-outline-secondary mx-3 my-2" data-bs-toggle="modal" data-bs-target="#exampleModal"> Add User</button>
      </div>
      <div className="home d-flex justify-content-center align-items-center flex-column bg-danger bg-opacity-10">
        <form onSubmit={submit}>
          <div className="mb-3">
            <input type="text" value={user} name='user' onChange={(e) => { setUser(e.target.value) }} className="form-control text-centerL" placeholder='Enter Username' />
          </div>
          <div>
            <button type="submit" className="btn btn-outline-dark mx-5  "> Check Details </button>
          </div>
        </form>
      </div>

      {/* ---------------------------------Model from add student-------------------------------------------------- */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 " id="exampleModalLabel">Add Topic and user name</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form >
                <div className="mb-3">
                  <input type="text" value={name} name='name' onChange={(e) => { setName(e.target.value) }} className="form-control text-centerL" placeholder='Enter Name' />
                </div>
                <div className="mb-3">
                  <input type="text" value={topic} name='topic' onChange={(e) => { setTopic(e.target.value) }} className="form-control text-centerL" placeholder='Enter Topic Name' />
                </div>
                <EditorCustomToolbarOption setTextData={setTextData} /> 
              </form>
            </div>
            <div className="my-2">
              <span className='ms-2'> Notes
                <ul style={{ 'fontSize': '15px' }}>
                  <li className='fst-italic'> <span className='fw-bolder text-danger'>  Without useing these sing your summary are not valid way </span></li>
                  <li className='fst-italic my-2'>If use  ( Square Brackets )<span className='fw-bolder text-success'> [ ] </span> means we can understand you UNDERSTOOD 100% Ex :- <span className='fw-bolder fs-6 text-success '>  [  </span> Lorem ipsum dolor....  <span className='fw-bolder fs-6 text-success'>  ]  </span> </li>
                  <li className='fst-italic my-2'>If use ( Lessthen and Graterthen )<span className='fw-bolder fs-6 text-success'> &lt; &gt; </span>  means we can understand you SOMEWHAT UNDERSTOOD 80% Ex :-  <span className='fw-bolder fs-6 text-success'> &lt; </span> Lorem ipsum dolor....  <span className='fw-bolder fs-6 text-success'> &gt;  </span></li>
                  <li className='fst-italic my-2'>If use ( Parentheses Bracket )<span className='fw-bolder text-success'> ( ) </span>  means we can understand you NOT CLEAR 50%  Ex :-  <span className='fw-bolder fs-6 text-success'>  (  </span> Lorem ipsum dolor....  <span className='fw-bolder fs-6 text-success'>  ) </span></li>
                  <li className='fst-italic my-2'>If use ( Back Slash and Question Mark ) <span className='fw-bolder text-success'> / ? </span> means we can understand you WHAT RUBBISH 00% Ex :- <span className='fw-bolder fs-6 text-success'> /  </span> Lorem ipsum dolor....  <span className='fw-bolder fs-6 text-success'>  ?  </span> </li>
                  <li className='fst-italic my-2' style={{ 'listStyle': 'none' }}> <button className='btn btn-success btn-sm' data-bs-toggle="modal" data-bs-target="#exampleModal1"> View Example </button> </li>
                </ul>
              </span>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={addstudent} className="btn btn-outline-info fw-bold" data-bs-dismiss="modal"> Send </button>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------------------------------Model from example------------------------------------------------------ */}
      <div className="modal fade" id="exampleModal1" tabIndex="-2" aria-labelledby="exampleModalLabel1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 " id="exampleModalLabel">Example</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            </div>
            <div className="my-2 mx-2">
              <span className='text-success fs-5'> [ </span>  <span className='text-muted'> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus corporis deserunt magni, dolorum atque aliquam!  </span>  <span className='text-success fs-5'> ] </span>,
              <span className='text-success fs-5'> &lt; </span> <span className='text-muted'> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus corporis deserunt magni, dolorum atque aliquam!  </span> <span className='text-success fs-5'> &gt;  </span>,
              <span className='text-success fs-5'> ( </span> <span className='text-muted'> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus corporis deserunt magni, dolorum atque aliquam!  </span> <span className='text-success fs-5'> ) </span>,
              <span className='text-success fs-5'> / </span> <span className='text-muted'> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus corporis deserunt magni, dolorum atque aliquam!  </span> <span className='text-success fs-5'> ? </span>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default Home