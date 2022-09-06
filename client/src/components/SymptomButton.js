import React,{useState} from "react";
import './Symptom.css'
const SymptomButton=({onClick,item,selected})=>{
    const data=item
   return(
     selected?  <button
     onClick={onClick}
     style={{backgroundColor:"#00A6A6"}}
     className="symButtons"
     >
        {data}
     </button>:  <button
       onClick={onClick}
       className="symButtons"
       style={{backgroundColor:"#F49F0A"}}
    
       >
          {data}
       </button>
   )
}

export default SymptomButton