import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { BottomMessage } from "../components/BottomMessage";
export function Signup() {
    const [firstname,setFirstname]=useState("")
    const [lastname,setLastname]=useState("")
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const navigate=useNavigate()
    useEffect(()=>{
        localStorage.removeItem("token")
    })
    return <div className="flex justify-center h-screen bg-slate-300">
        <div className="flex flex-col justify-center w-3/2 ">
            <div className="flex flex-col p-4 m-20 bg-white rounded-lg shadow-2xl">
                <Heading lable={"Sign Up"} />
                <SubHeading content={"Enter your information to create a account"} />
                <InputBox lable1={"First Name"} lable2={"abc"} onChange={(e)=>{
                    setFirstname(e.target.value)
                }}/>
                <InputBox lable1={"Last Name"} lable2={"xyz"} onChange={(e)=>{
                    setLastname(e.target.value)
                }}/>
                <InputBox lable1={"Email"} lable2={"abc@gamil.com"} onChange={(e)=>{
                    setUsername(e.target.value)
                }}/>
                <InputBox lable1={"Password"} lable2={"123456"} onChange={(e)=>{
                    setPassword(e.target.value)
                }}/>
                <Button lable={"Sign Up"} onClick={async ()=>{
                    const response=await axios.post("http://localhost:3000/api/v1/user/signup",{
                        username,
                        firstname,
                        lastname,
                        password
                    })
                    localStorage.setItem("token",response.data.token)
                    navigate("/dashboard?from="+response.data.firstName+" "+response.data.lastName)

                }}/>
                <BottomMessage message={"Already have an account?"} lable={"Login"} to={'/signin'}/>
                
            </div>

        </div>
    </div>

}