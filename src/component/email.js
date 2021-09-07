import React , {useState , useEffect} from 'react';
import axios from 'axios';




const Email = ({e , id , deleteEmail}) =>{

    const [email , setEmail] = useState();
    
    

    const handleClick = async(er) =>{
        deleteEmail(er , id)
    }


    return(

        <div className='px-7 py-1 flex'>
            <div>{e}</div>
            <button className="text-white opacity-0 hover:opacity-100 px-2" onClick={handleClick}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle name={e} cx="9" cy="9" r="8.5" fill="white" stroke="#E24818" />
                    <rect name={e} x="5" y="8" width="8" height="2" fill="#E24818" />
                </svg>
            </button>
        </div>
    )
}



export default Email