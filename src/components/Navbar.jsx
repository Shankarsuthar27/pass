import React from 'react'

const Navbar = () => {


 const handleGitClick = () => {
    const githubUrl = "https://github.com/Shankarsuthar27";
    window.open(githubUrl, '_blank', 'noopener,noreferrer');
  };
  
  return (
    <nav className='bg-slate-800 h-30 text-white'>
      <div className="flex justify-between text-center mycontainer px-4 py-5 h-14">


        <div className='logo font-bold text-2xl'>
          
                    <span className='text-green-700'>   &lt;</span> 

           Pass
          <span className='text-green-500'>OP/&gt;</span> 
          </div>
       
        <button  onClick={handleGitClick} className='text-white bg-green-700 rounded-full flex gap-4 h-6 px-1 w-30 ring-white ring-1'>

        <img className='invert w-8.5 h-[21px]  ' src="icons/github.png" alt="github logo" />
        
        <span className='font-bold'>Github</span>
        </button>
      </div>


    </nav>
  )
}

export default Navbar
