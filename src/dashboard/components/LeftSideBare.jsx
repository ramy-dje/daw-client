import React,{useState,useEffect} from 'react'
import {generalChat,home,invitations,myDoctors,myPatients,questions,scoreOfPrediction,statistics,updatequestions} from '../assets/assets'
import {leftSideBarIcons} from '../constants/Dashboard'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'

const LeftSideBare = () => {
  const navigate = useNavigate();
  const [ActiveElement, setActiveElement] = useState('Home')
  const [answers, setanswers] = useState(null)
  const [userData, setuserData] = useState(null)
  async function getUserData(){
    const parsedData =await JSON.parse(localStorage.getItem('user'))
    setuserData(parsedData)
    console.log(parsedData)
}
  useEffect(()=>{
    getUserData()
  },[])
  return (
    <div className='flex h-screen flex-col px-1 sm:px-2 lg:px-4 relative'>
      <div className='flex justify-between border-b border-gray-700 text-white h-8 p-1'>
        <p className='text-sm sm:text-lg'>Explore</p>
      </div>
      <div className='flex flex-col gap-2 pt-3'>
       {
        userData && leftSideBarIcons.map((e,i)=>(
          e.allowed.includes(userData.role) && <Link to={e.link}>
            <div
              key={i} 
              className={`flex items-center gap-2 text-white px-2 sm:px-4 py-2 rounded-lg mb-1 cursor-pointer ${e.title == ActiveElement && 'bg-[#1D203E]'}`}
              onClick={()=>setActiveElement(e.title)}  
            >
              <img src={e.icon} alt="" className='text-xl'/>
              <p className='hidden sm:block'>{e.title}</p> 
            </div>
          </Link> 
        ))
       }
      </div>
        <div  onClick={()=>{localStorage.clear();navigate('welcome')}}>
          <p className='absolute bottom-2 text-lg text-white cursor-pointer'>logout</p>
        </div>
    </div>
  )
}

export default LeftSideBare