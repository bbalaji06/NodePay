export function InputBox({lable1,lable2,onChange}){
    return <div className="flex flex-col ">
        <div className="py-2 text-sm font-medium text-left">
        {lable1}
        </div>
        <input onChange={onChange} placeholder={lable2} className="w-full px-2 py-1 border rounded border-slate-200" ></input>
    </div>

}