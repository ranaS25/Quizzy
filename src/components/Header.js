import React, { useState } from 'react'

const Header = () => {

  const [dark, setDark] = useState(false);


  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
  }

  return (
    <div className="w-full  bg-blue-700 dark:bg-slate-900 text-white flex justify-start p-2">
      <p className='text-xl font-bold  tracking-widest my-2'>QUIZZY</p>
      <button onClick={toggleDark} className=" mx-auto bg-green-600 dark:bg-slate-700 rounded px-2 font-semibold">{ !dark?"Light Mode":"Night Mode"}</button>
    </div>
  )
}

export default Header