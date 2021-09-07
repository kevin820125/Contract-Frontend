import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Email from './email.js'
import { useForm } from 'react-hook-form';
import { baseUrl } from '../config/const.js'

const SignUp = ({ f, l, e, i , create}) => {
    console.log(baseUrl);
    const { register, handleSubmit, errors } = useForm();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState();
    const [addEmail, setAddEmail] = useState('');
    const [newEmail, setNewEmail] = useState();
    const [id, setId] = useState('');
    const [newFirstName, setNewFirstName] = useState('');
    const [newLastName, setNewLastName] = useState('');
    const [ready , setReady] = useState(false);
    const [error , setError] = useState('');
    useEffect(() => {
        setFirstName(f);
        setLastName(l);
        setEmail(e);
        setId(i)
        setReady(true)
        return function clean(){
            setError('')
        }
    }, [f,l,e,i])


    async function deleteEmail(er) {
        const specificEmail = er.target.getAttribute('name');
        const res = await axios.get(`${baseUrl}user/${id}`);
        const result = res.data.person.email;
        const newEmail = result.filter(check => check !== specificEmail);
        setNewEmail([...newEmail]);
        await axios({
            method: "put",
            url: `${baseUrl}user/${id}`,
            data: {
                firstName: firstName,
                lastName: lastName,
                email: newEmail
            }
        })
    }

    function check(validation){
        if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(validation)){
            for(let i of email){
                if(validation === i){
                    return false
                }
            }
            return true
        }
        return false
    }
    async function handleSubmition(e) {
        e.preventDefault();
        let newEmail = addEmail;
        if (check(newEmail)){
            setEmail([...email, newEmail])
            await axios({
                method: "put",
                url: `${baseUrl}user/${id}`,
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    email: [...email, newEmail]
                }
            })   
            setError('')
        }else{
            setError('invalid email/duplicate Email')
        }
    }

    async function handleUpdate(e) {
        setNewFirstName(firstName);
        setNewLastName(lastName);
        setFirstName(newFirstName);
        setLastName(newLastName);
        let newEmail = addEmail;
        if(create){
            if(newEmail.length > 0 && check(newEmail)){
                    await axios({
                        method:"post",
                        url: `${baseUrl}user/`,
                        data: {
                            firstName: firstName,
                            lastName: lastName,
                            email: newEmail
                        }
                    })
            }else{
                await axios({
                    method:"post",
                    url: `${baseUrl}user/`,
                    data: {
                        firstName: firstName,
                        lastName: lastName,
                        email: newEmail
                    }
                })
            }
        }else{
            await axios({
                method: "put",
                url: `${baseUrl}user/${id}`,
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email
                }
            })
        }
    }

    async function handleDelete() {
        await axios.delete(`${baseUrl}user/${id}`)
    }
    return (
        <form>
            <div className='flex justify-evenly p-7'>
                <div className='p-4'>
                    <div>First Name</div>
                    <input
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        type="firstName"
                        placeholder="firstName"
                    />
                </div>
                <div className='p-4'>
                    <div>Last Name</div>
                    <input
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        type="lastName"
                        placeholder="lastName"
                    />
                </div>
            </div>
            <div>
                <div className='text-gray-400 text-sm px-7 py-3'>Email :</div>
                <div>
                    {ready ? <div>
                        {email.map((e, idx) => (
                            <div key={idx}>
                                <Email
                                    e={e}
                                    id={id}
                                    deleteEmail={deleteEmail}
                                />
                            </div>
                        ))}
                    </div>
                        : <div>loading</div>
                    }
                    {error ? <div>{error}</div> : null}
                </div>
            </div>
            <div className='p-6'>
                <input
                    value={addEmail}
                    onChange={e => setAddEmail(e.target.value)}
                    type="text"
                    placeholder="Email"
                />
                <button className='p-2' onClick={handleSubmition}>
                    <div className='bg-blue-300 text-gray-100 rounded w-20'>
                        Add Email
                    </div>
                </button>
            </div>
            <div className='flex'>
                <button className='px-4' onClick={handleUpdate}>
                    <div className='bg-blue-300 border-2 border-blue-300 text-gray-100 rounded w-20'>
                        {create ? <div>Create</div> : <div>save</div>}
                    </div>
                </button>

                <button className='px-3' >
            <div className='bg-white text-blue-300 border-2 border-blue-300 rounded w-20'>
                        Cancel
                    </div>
            </button>


            <button className='bg-white  text-red-300 border-2 border-red-300 px-10 ml-auto' onClick={handleDelete}>
                delete Contact
            </button>
            </div>
        </form>
    )
}



export default SignUp