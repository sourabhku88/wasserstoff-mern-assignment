import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditorCustomToolbarOption from './Editor';
import { getPercentage } from '../getPercentage'
const Host = 'http://localhost:1234'

const Dashboard = () => {
  const params = useParams();
  const navigate = useNavigate()
  const [loading, seLoading] = useState(false)
  const [topic, setTopic] = useState('');
  const [textData, setTextData] = useState('');
  const [data, setData] = useState(null);

  const getData = async _ => {
    try {
      seLoading(true);
      const { data } = await axios(`${Host}/getstudent/${params.name}`);
      setData(data.message);
      seLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      navigate('/');
      console.log(error.response);
      seLoading(false);
    }
  }
  const addtopic = async _ => {
    try {
      let summary = textData
      seLoading(true);
      const { data } = await axios.put(`${Host}/addtopic/${params.name}`, { name: params.name, topic, summary });
      setData(data.message);
      setTopic(''); setTextData('');
      seLoading(false);
    } catch ({ response }) {
      toast.error(response.data.message);
      console.log(response);
      seLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <>
      <ToastContainer />
      {/* ------------------------------------------------loading----------------------------------------------------------------------------- */}
      {loading ? <div className='w-100 d-flex justify-content-center align-items-center' style={{ 'height': '100vh' }}>
        <div classNmae="spinner-grow" role="status">
          <span classNmae="visually-hidden">Loading...</span>
        </div>
      </div>
        :
        <>
        {/* --------------------------------------------dashboard----------------------------------------------------------------------------------------- */}
          <h1 className='text-center my-5'> DashBorad </h1>
          <h3 className='text-center'> {params.name} </h3>
          <button type="submit" className="btn btn-outline-success ms-5   " data-bs-toggle="modal" data-bs-target="#exampleModal"> Add Topic </button>
          <button className="btn btn-outline-dark  ms-2" onClick={() => navigate('/')}> Back to Home </button>

          <div className="userCart d-flex flex-wrap justify-content-evenly ">
            {data !== null ? data.topics.map(items =>
              <div className="card mx-2 my-2 " key={+Date.now()} style={{ "width": "20rem", 'boxShadow': '#00000069 17px 18px 7px -6px' }}>
                <div className="card-body">
                  <h5 className="card-title">{items.topic}</h5>
                  <div className="" style={{ 'fontSize': '13px' }}>
                    • UNDERSTOOD : <span className='text-success px-2 rounded-pill py-1'> {getPercentage(items.summary).UNDERSTOOD}% </span>   <br />
                    • SOMEWHAT UNDERSTOOD : <span className='text-warning px-2 rounded-pill py-1'> {getPercentage(items.summary).SOMEWHATUNDERSTOOD}% </span>  <br />
                    • NOT CLEAR : <span className='text-danger px-2 rounded-pill py-1 text-opacity-50'> {getPercentage(items.summary).NOTCLEAR}% </span>  <br />
                    • WHAT RUBBISH : <span className='text-danger px-2 rounded-pill py-1'> {getPercentage(items.summary).WHATRUBBISH}% </span>  <br />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </>
      }
      {/* ------------------------------------------- model for add topic -------------------------------------------------------------- */}
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
                  <input type="text" onChange={(e) => { setTopic(e.target.value) }} value={topic} name='topic' className="form-control text-centerL" placeholder='Enter Topic Name' />
                </div>
                <EditorCustomToolbarOption setTextData={setTextData} />
              </form>
            </div>
            <div className="my-2">
              <span className='ms-2 text-dark'> Notes
                <ul style={{ 'fontSize': '12px' }}>
                  <li className='fst-italic'> <span className='fw-bolder text-danger'>  Without useing these sing your summary are not valid way </span></li>
                  <li className='fst-italic my-2'>If use  ( square brackets )<span className='fw-bolder text-success'> [ ] </span> means we can understand you UNDERSTOOD 100% Ex :- <span className='fw-bolder fs-6 text-success '>  [  </span> Lorem ipsum dolor....  <span className='fw-bolder fs-6 text-success'>  ]  </span> </li>
                  <li className='fst-italic my-2'>If use ( single quotes )<span className='fw-bolder fs-6 text-success'> ' ' </span>  means we can understand you SOMEWHAT UNDERSTOOD 80% Ex :-  <span className='fw-bolder fs-6 text-success'>  '  </span> Lorem ipsum dolor....  <span className='fw-bolder fs-6 text-success'>  ' </span></li>
                  <li className='fst-italic my-2'>If use ( parentheses bracket )<span className='fw-bolder text-success'> ( ) </span>  means we can understand you NOT CLEAR 50%  Ex :-  <span className='fw-bolder fs-6 text-success'>  (  </span> Lorem ipsum dolor....  <span className='fw-bolder fs-6 text-success'>  ) </span></li>
                  <li className='fst-italic my-2'>If use ( OR ) <span className='fw-bolder text-success'> | |</span> means we can understand you WHAT RUBBISH 00% Ex :- <span className='fw-bolder fs-6 text-success'> |  </span> Lorem ipsum dolor....  <span className='fw-bolder fs-6 text-success'>  |  </span> </li>
                  <li className='fst-italic my-2 ' style={{ 'listStyle': 'none' }}> <button className='btn btn-success btn-sm' data-bs-toggle="modal" data-bs-target="#exampleModal2"> View Example </button> </li>
                </ul>
              </span>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={addtopic} className="btn btn-outline-info fw-bold" data-bs-dismiss="modal"> Send </button>
            </div>
          </div>
        </div>
      </div>
      {/* --------------------------------------- model from example -------------------------------------------------------------- */}
      <div className="modal fade" id="exampleModal2" tabIndex="-3" aria-labelledby="exampleModalLabel2" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 " >Example</h1>
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
    </>
  )
}

export default Dashboard