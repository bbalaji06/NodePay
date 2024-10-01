import { useNavigate, useSearchParams } from "react-router-dom"
import { InputBox } from "../components/InputBox"
import axios from "axios"
import { useState } from "react"

const Send = () => {
    const [searchParam] = useSearchParams()
    const id = searchParam.get('id')
    const name = searchParam.get('name')
    const from=searchParam.get('from')
    const [amount, setAmount] = useState(0)
    const navigate=useNavigate()
    return (
        <div className="flex items-center justify-center h-screen bg-slate-50 ">
            <div className="flex flex-col shadow-xl h-[400px] w-[500px] rounded-md p-6 bg-white">
                <div className="text-[40px] font-bold text-center mb-24">Send Money</div>
                <div className="text-[30px] flex gap-4  ">
                    <div className="bg-green-400 border-none rounded-[25px] w-[50px] h-[50px] flex justify-center items-center text-white  ">{name[0].toUpperCase()}</div>
                    <div className="flex items-center justify-center font-bold">{name}</div>
                </div>
                <h5 className="font-semibold">Amount (in Rs)</h5>
                <InputBox lable2={'Enter Amount'} onChange={(e) => {
                    setAmount(e.target.value)
                }} />
                <button onClick={async () => {
                    try{
                        await axios.post('http://localhost:3000/api/v1/account/transfer', {
                            to: id,
                            amount: amount
                        }, {
                            headers: {
                               Authorization:'Bearer '+localStorage.getItem('token')
                            }
                        }).then(response=>{alert(response.data.msg)})
                        navigate(`/dashboard?from=${from}`)
                    }

                    catch(err){
                        const statusCode=err.response.status
                        if (statusCode==401){
                            alert("Insufficient Balance!")
                        }
                        if (statusCode==411){
                            alert("invalid user")
                        }
                        navigate(`/dashboard?from=${from}`)
                    }
                }} className="mt-3 w-full text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 border-none">Initiate Transfer</button>
            </div>

        </div>
    )
}

export default Send