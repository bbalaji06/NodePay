const Appbar = ({ user}) => {
    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-center justify-center mt-3">
                <div className="pl-3 text-[30px] font-bold  ">NodePay</div>
                <div className="flex justify-end gap-3 mr-3 grow text-[25px]">
                    <div className="flex items-center justify-center font-medium">{user}</div>
                    <div className="bg-slate-300 border-none rounded-[25px] w-[50px] h-[50px] flex justify-center items-center ">{user[0].toUpperCase()}</div>
                </div>
            </div>
            <div className="bg-gray-300 w-[100%] h-[1px]"></div>
        </div>

    )
}

export default Appbar