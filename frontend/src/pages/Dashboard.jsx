import { useSearchParams } from "react-router-dom";
import Appbar from "../components/Appbar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import axios from "axios"
import { useEffect, useState } from "react"
export function Dashboard(){
    const [balance,setBalance]=useState(0)
    const [paramData]=useSearchParams()
    const from=paramData.get("from")
  useEffect(()=>{
    async function fetchBalance(){
      const response=await axios.get("http://localhost:3000/api/v1/account/balance",{
        headers:{
          Authorization:'Bearer '+localStorage.getItem('token')
        }
      })
        setBalance(response.data.balance.toFixed(2)) 
      }
      fetchBalance();
  },[])
    return <div>
        <Appbar user={from}/>
        <div className="m-8">
        <Balance balance={balance}/>
        <Users from={from}/>
        </div>
    </div>
}