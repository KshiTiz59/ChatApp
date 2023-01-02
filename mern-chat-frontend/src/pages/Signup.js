import React, { useState } from 'react'
import {useSignupUserMutation} from "../services/appApi"
import { Container , Row , Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link , useNavigate } from 'react-router-dom';
import botimg from "../assets/bot.png"
import "./signup.css"




const Signup = () => {
   const [name, setname] =useState('')
    const [email ,setemail] =useState('') ;
   const [password ,setpassword] = useState("")
   const [signupUser , {isLoading ,error }] = useSignupUserMutation();
   const navigate =useNavigate() ;
   // image upload states
   const [image ,setimage]= useState(null)
   const [uploadingimage, setuploadingimage] =useState(false)
   const [imagepreview ,setimagepreview] =useState(null)


   const validateimg = (e)=>{
    const file =e.target.files[0]
    if(file.size>=1048576)
  {  
    return alert("max file size is 1mb") ;
}
    else
    {
setimage(file);
setimagepreview(URL.createObjectURL(file))

    }
    
    }

const uploadimage= async ()=>{
const data = new FormData() ;
data.append('file' ,image)
data.append('upload_preset', 'ehvlklqb')
try{
setuploadingimage(true);
let res  =await fetch('https://api.cloudinary.com/v1_1/dig5cnf4n/image/upload', {
    method:'post',
    body:data
})
const urlData = await res.json()
setuploadingimage(false)
return urlData.url 
}
catch(err){
    setuploadingimage(false)
    console.log(err)

}
}

    const handlesignup = async (e)=>{
        e.preventDefault() ;
    if(!image)
    {
        return alert("please upoad your profile picture")
    }
    const url = await uploadimage(image) ;
    console.log(url);
//signup the user
signupUser({name ,email, password, picture:url}).then(({data})=>{
if(data)
{console.log(data)}
navigate("/chat")
});

    }



  return (
    <Row  style={{width:"100%"}}>
    <Col md={5} className="signup_bg"></Col>
   
    <Col md={6} className="d-flex align-items-center justify-content-center flex-direction-column">
    <div className='xx'>
    <Form style={{width: "80%" , maxWidth:500 , marginLeft:"50px"}} onSubmit={handlesignup}>
        <h1 className='text-center'>Create Account</h1>
        <div className="signup-profile">
            <img src={imagepreview || botimg} alt="" className='signup_profile_pic' />
            <label htmlFor="image-upload" className='image-upload-label'>
                <i className='fas fa-plus-circle add-picture-icon'></i>
            </label>
            <input type="file" id='image-upload' hidden accept='image/png , image/jpeg' onChange={validateimg}/>
        </div>
<Form.Group className="mb-3" controlId="formBasicName">
<Form.Label>Name</Form.Label>
<Form.Control type="text" placeholder="Enter your Name" onChange={(e)=>setname(e.target.value)} value={name}/>
</Form.Group>

<Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setemail(e.target.value)} value={email} />
      <Form.Text className="text-muted">
        We'll never share your email with anyone else.
      </Form.Text>
    </Form.Group>   

<Form.Group className="mb-3" controlId="formBasicPassword">
<Form.Label>Password</Form.Label>
<Form.Control type="password" placeholder="Password" onChange={(e)=>setpassword(e.target.value)} value={password} />
</Form.Group>

<Button variant="primary" type="submit">
{uploadingimage ? 'Signing You up... ' : 'Signup'}
</Button>
<div className="py-4">
<p className='text-center'>
   Already have an account ? <Link to="/login">Login</Link>
</p>
</div>
</Form>
</div>

</Col>

</Row>

  )
}

export default Signup