import { useNavigate } from "react-router-dom"
import { Button } from "./Button"

const User = ({ user,from }) => {
    const navigate=useNavigate()
    return (
        <div className='flex justify-between'>
            <div className='flex items-center justify-center text-[20px]'>
                <div className="bg-slate-300 border-none rounded-[25px] w-[40px] h-[40px] flex justify-center items-center  m-2">{user.firstname[0].toUpperCase()}</div>
                {user.firstname+' '+user.lastname}</div>
            <Button lable={'Send Money'} onClick={()=>{
                navigate(`/send?id=${user._id}&name=${user.firstname}&from=${from}`)
            }}/>
        </div>
    )
}

export default User