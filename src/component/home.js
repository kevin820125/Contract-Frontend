import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './search.js'
import Person from './Person.js'
import SignUp from './signup.js'
const HomePage = () => {
  const init = {
    firstName: '',
    lastName: '',
    email: [],
    id: ''
  }
  const [data, setData] = useState(null);
  const [ready, setready] = useState('')
  const [input, setInput] = useState('');
  const [showOnRight, setShowOnRight] = useState();
  const [personInformation, setPersonInformation] = useState(init);
  const [createContract, setCreateContract] = useState(false);
  const [searchResult , setSearchResult] = useState();

  useEffect(() => {
    async function dp() {
      let res = await axios.get('/user')
      setData(res.data)
      setSearchResult(res.data)
      for (let i in res.data) {
        localStorage.setItem(`${i}`, JSON.stringify(res.data[i]))
      }
      setready('true')
      console.log(searchResult)
    }
    dp();
  }, []);


  const updateInput = async (input) => {
    const filtered = data.filter(d => {
     return (d.firstName.toLowerCase()+d.lastName.toLowerCase()).includes(input.toLowerCase())
    })
    setInput(input);
    setSearchResult(filtered);
 }



  const handleClick = async (e) => {
    if (e.target.id !== showOnRight) {
      // setPersonInformation(init)
      const result = await axios.get(`/user/${e.target.id}`)
      if (result.data != undefined) {
        const temp = {
          firstName: result.data.person.firstName,
          lastName: result.data.person.lastName,
          email: result.data.person.email,
          id: result.data.person._id
        }
        setPersonInformation({ ...temp });
        setShowOnRight(e.target.id);
        setCreateContract(false);
      }
    }
  }


  const handleNewContract = () => {
    setPersonInformation(init);
    setCreateContract(true);
  }

  return (
    <div className="container h-full">
      {
        ready === 'true' ?
          <div className='flex'>
            <div className='flex-row-reverse'>
              <div className='flex w-4/12'>
                <div className='text-5xl'>Contract</div>
                <div className='justify-items-stretch p-3'>
                  <button onClick={handleNewContract}>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="16" cy="16" r="16" fill="#7797C8" />
                      <rect x="8" y="15" width="16" height="2" fill="white" />
                      <rect x="17" y="8" width="16" height="2" transform="rotate(90 17 8)" fill="white" />
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <SearchBar
                  searchWord={input}
                  dd={updateInput}
                />
              </div>
              <div className=''>
                {searchResult.map((d, idx) => (
                  <button className='block hover:bg-gray-100' onClick={handleClick} key={idx}>
                    <Person
                      key={idx}
                      id={d._id}
                      firstName={d.firstName}
                      lastName={d.lastName}
                    />
                  </button>

                ))}
              </div>
            </div>
            <div className='flex flex-grow-0 bg-gray-100'>
              {personInformation && !createContract ?
                <div>
                  <SignUp
                    f={personInformation.firstName}
                    l={personInformation.lastName}
                    e={personInformation.email}
                    i={personInformation.id}
                    create = {createContract}
                  />
                </div>
                :
                <div>
                    <SignUp
                    f={personInformation.firstName}
                    l={personInformation.lastName}
                    e={personInformation.email}
                    i={personInformation.id}
                    create = {createContract}
                  />
                </div>


              }
            </div>
          </div>

          :
          <div> Loading...</div>
      }
    </div>

    )

}

export default HomePage