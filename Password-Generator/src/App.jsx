import { useState ,useCallback , useEffect, useRef} from 'react'


import './App.css'

function App() {
  const [length , setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
//useRef hook
const passwordRef=useRef(null)

  // generatePassword 
  const passwordGenerator= useCallback(()=>{
    let pass ="";
    let str =" abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if(numberAllowed){
      str +="0123456789"
    }
    if(charAllowed){
      str +="!@#$%^&*[]{}()_+"
    }

    for(let i=1;i<=length;i++){
      let char= Math.floor(Math.random()*str.length +1)
      pass =str.charAt(char)+pass;
    }
    setPassword(pass)
    
  }, [length,numberAllowed,charAllowed,setPassword]) ;
   
  //for button
const copyPasswordToClipBoard=useCallback(()=>{
  passwordRef.current?.select()
  window.navigator.clipboard.writeText(password)
},[password])
////////////////////////////////////
   useEffect(()=>{passwordGenerator()},[length,numberAllowed,charAllowed,passwordGenerator])

  return (
     <>
   <div className='mx-auto shadow-md rounded-lg pb-[50px] p-[20px] w-[50%] px-4 my-10 text-black bg-amber-700 pr-[100px]'>
      <h1 className='text-white text-center text-4xl my-7'>Password Generator</h1>
      <div className=' mx-auto shadow-md rounded-lg px-1 my-8 p-[10px] w-[75%] h-20 text-black bg-amber-50'>
      <input type="text"
      value={password} 
      className='outline-none  px-1 text-4xl'
      placeholder='Your Password'
      readOnly
      ref={passwordRef}
      />
      <div id="btndi">
      <button onClick={copyPasswordToClipBoard}
      className='bg-blue-600 text-white  px-9  ml-[100%] mt-[-11%] pt-[50px] pb-[8px] rounded-r-4xl' id="btn1"> 
        <span>Copy</span> 
      </button>
      </div>

       
    <div>
      <div className='flex text-sm gap-x-2 mt-[30px]'>
       <div className='flex items-center gap-x-1 text-white text-2xl font-bold'>
       <input 
       type="range"
       min={6}
       max={100}
       value={length}
       className='cursor-pointer '
       onChange={(e)=>{setLength(e.target.value)}}
       />
       <label htmlFor="">Length :{length}</label>
       </div>
       <div className='flex items-center gap-x-1 text-white text-2xl font-bold'>
         <input 
       type="checkbox"
         defaultChecked={numberAllowed}
        id="numberInput"
         className='cursor-pointer size-5 ml-[40px]'
         onChange={()=>
          setNumberAllowed((prev)=>!prev)
         }
       />
        <label htmlFor="numberInput">Numbers</label>
       </div>
       
        <div className='flex items-center gap-x-1 text-white text-2xl font-bold '>
        <input
            type="checkbox"
        defaultChecked={charAllowed}
        id="characterInput"
         className='cursor-pointer size-5'
         onChange={()=>{
          setCharAllowed((prev)=>!prev)
         }}
        />
        <label htmlFor="characterInput">Character</label>


        </div>
      </div>
      </div>









   </div>
   </div>




     </>
    
  )

}

export default App
