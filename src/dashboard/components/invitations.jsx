import React,{useState,useEffect} from 'react'
import { roundedAccept,roundedX} from '../assets/assets'
import axios from 'axios';


const Invitations = () => {
    const [invitations, setInvitations] = useState(null)
    async function getInvitations() {
      const {data} = await axios.get('http://localhost:3000/api/unacceptedUsers')
      console.log(data);
      setInvitations(data);
    }
    useEffect(()=>{
      getInvitations();
    },[]);
  return (
   <div className='max-h-screen overflow-auto  sm:w-4/5 w-full p-5'>
         {
         invitations && invitations.map((e,i)=>(
           !e.isVerified && <Invitation key={i} id={e._id} birthday={e.dt_Naiss} email={e.email} firstname={e.Prenom} gender={e.Gener} lastname={e.Nom} role={e.role} avatar={e.avatar}/>
          ))
        }
   </div>
  )
}

function Invitation({firstname,lastname,gender,birthday,email,role,id,avatar}) {
    const [extended, setextended] = useState(false);
    async function handleCheck(id) {
        const res = await axios.put('http://localhost:3000/api/acceptUser/'+id)
        console.log(res)
    }

  return (
    <div 
    onClick={()=>setextended((e)=>!e)}
    className={`flex ${extended ? 'items-start': 'items-center'} justify-between px-5 pt-1 min-h-[75px] h-fit bg-[#171825] rounded-lg custom-shadow text-white mb-8 cursor-pointer`}
    >
        <div  className={`flex ${extended ? 'gap-4 p-3 items-start' : 'gap-2 items-center'} `}>
            <img src={avatar} className={`w-full ${extended ? 'h-24 w-24':'h-16 w-16'} bg-slate-500`} style={{clipPath:'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}/>
            <div>
                {
                    extended ? <div className='text-xl'>
                    <p>User : {firstname} {lastname}</p>
                    <p>Role : {role}</p>
                    <p>Gender : {gender}</p>
                    <p>birthday : {birthday.split('T')[0]} </p>
                    <p>email : {email}</p>
                    </div> :<div>
                        <p>User : {firstname} {lastname}</p>
                        <p>Role : {role}</p>
                    </div>                        
                }
            </div>
        </div>
        <div className='flex '>
            <img src={roundedAccept} alt="" className='w-8 fill-red-600 ' onClick={()=>handleCheck(id)}/>
            <img src={roundedX} alt=""  className='w-8'/>
        </div>
    </div>
  )
}


export default Invitations