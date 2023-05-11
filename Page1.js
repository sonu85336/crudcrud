import React, { useContext, useEffect, useRef, useState } from "react";
import classes from  './Page1.module.css'
import { ContextStore } from "./Context/ContextStore";
const Page1 = () => {
    const drag = useRef(null)
    const [clicked,setClicked] = useState(false)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [data, setData] = useState([]);
  const [editid,setEditid] = useState('')
  const [idtobe,setIdtobe] = useState(false)

  const  context = useContext(ContextStore)

console.log(context)
   const DeleteHandler = (id)=>{
    // const temp = [...data]
    // temp.forEach((content,index)=>{
    //     if(content.id==id){
    //         temp.splice(index,1)
    //     }
    // })
    // setData(temp)
     context.deleteHandler(id)
    

   }

   const EditHanlder  = (item) =>{
setName(item.name)
setEmail(item.email)
setEditid(item.id)
setIdtobe(true)
   }

  const nameHandler = (e) => {
    setName(e.target.value);
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const formHandler = (e) => {
    e.preventDefault();
    const obj = {
      name: name,
      email: email,
      id: Math.random().toString(),
    };
    if(idtobe){
//         let temp  = [...data]
//         temp.forEach((content,index)=>{
//             if(content.id===editid){
//                 temp[index]= obj
//             
//             }
//         })
// setData(temp)
context.editHandler({obj,editid})

setIdtobe(false)
    }
    else{
    context.getDAta(obj)
    //   setData([...data, obj]);  
    }
    
    setName("")
    setEmail("")
  };
  console.log(data, "from  Page1 line 25");
 

// ***************************/
useEffect(()=>{
    if(!drag) return 
const box =   drag.current
 
box.onmousedown = function(){
    setClicked(box)
}

},[])

document.onmouseup = function(e){
     setClicked(null)
}

document.onmousemove = function(e){
    if(!clicked) return 
    let x = e.pageX;
    let y = e.pageY;

    clicked.style.top = y + 'px'
clicked.style.left = x + 'px'
}
  return (
    <div className="container mb-2" style={{position:'absolute'}} ref={drag}>
      <form onSubmit={formHandler}>
        <div className="form-group mt-2">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={nameHandler}
            value={name}
            placeholder="Enter Name"
            className="form-control"
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="email">email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            name="email"
            onChange={emailHandler}
            value={email}
            placeholder="Enter Email"
          ></input>
        </div>
        <button type="submit" className="btn btn-primary  btn-block  mt-2">
          {" "}
          Submit
        </button>
      </form>

      <div className="container">
      
      <ul>{context.item.map((item)=>(
        <li  key={item.id} className={classes.map}>
        <h6>
         {item.name}

        </h6>
<h6>
 {item.email}   
</h6>

<button type="submit" onClick={()=>DeleteHandler(item.id)} className="btn btn-danger btn-xs">Delete</button>
<button type="submit" onClick={()=>EditHanlder(item)} className="btn btn-success  btn-xs">Edit</button>
        </li>
      ))}
</ul>
      </div>
    </div>
  );
};
export default Page1;
