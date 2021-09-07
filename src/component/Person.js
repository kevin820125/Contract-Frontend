import React , {useState , useEffect} from 'react';




const Person = ({firstName , lastName , id}) =>{


    return(
        <div className = 'p-2' id = {id} >
            {firstName} {lastName}
        </div>
    )
}




export default Person
