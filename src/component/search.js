

import React from 'react';


const SearchBar = ({searchWord,dd}) => {
    const BarStyling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};
    return (
      <div>
      <input 
       className='p-3'
       style={BarStyling}
       key="random1"
       value={searchWord}
       placeholder={"search Contract"}
       onChange={(e) => dd(e.target.value)}
      />
      </div>
    );
  }




export default SearchBar;