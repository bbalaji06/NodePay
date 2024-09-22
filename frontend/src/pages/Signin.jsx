import { useState } from "react";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { BottomMessage } from "../components/BottomMessage";




export function Signin(){
   
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const navigate=useNavigate()


    return <div className="flex justify-center h-screen bg-slate-300">
    <div className="flex flex-col justify-center w-3/2 ">
        <div className="flex flex-col p-4 m-20 bg-white rounded-lg shadow-2xl">
            <Heading lable={"Sign In"} />
            <SubHeading content={"Enter your information to create a account"} />
            
            
            <InputBox lable1={"Email"} lable2={"abc@gamil.com"} onChange={(e)=>{
                setUsername(e.target.value)
            }}/>
            <InputBox lable1={"Password"} lable2={"123456"} onChange={(e)=>{
                setPassword(e.target.value)
            }}/>
            <Button lable={"Sign In"} onClick={async ()=>{
                const response=await axios.post("http://localhost:3000/api/v1/user/signin",{
                    username,
                    password
                })
                localStorage.setItem("token",response.data.token)
                navigate("/dashboard?from="+response.data.firstName+" "+response.data.lastName)

            }}/>
        <BottomMessage message={"Don't have an account?"} lable={"Signup"} to={'/'}/>
        </div>
    </div>
</div>

}