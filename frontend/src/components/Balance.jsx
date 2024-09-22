

const Balance = ({balance}) => {
  
  return (
    <div className="flex gap-3 m-3">
        <div className="text-lg font-bold">
        Balance
        </div>
        <div className="text-lg font-semibold">
        ₹ {balance}
        </div>
    </div>
  )
}

export default Balance