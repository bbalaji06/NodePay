import { Link } from "react-router-dom";

export function BottomMessage({ message, lable, to }) {
  return <div className="flex justify-center text-lg ">
    <div>
      {message}
    </div>
    <Link className="underline cursor-pointer pointer underline-offset-1" to={to}>
      {lable}
    </Link>
  </div>
}