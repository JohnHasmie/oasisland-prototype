import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import tw from "twin.macro";

export default function TabHome() {
  const history = useHistory();
  let { pathname } = useLocation();
const handleClick=(type)=>{
  if(pathname.includes('clients')){
    history.push(`/clients/${type}`)
  }else{
    history.push(`/invoices/${type}`)
  }
}
  return (
    <div tw="hidden md:grid grid-cols-3 gap-4 justify-items-center content-center pb-5">
      <div
        tw="cursor-pointer w-full text-center pt-10 hover:border-t-4 border-t-4 border-transparent hover:border-primary"
        onClick={() => handleClick("overdue")}
      >
        <div>
          <span tw="text-4xl font-bold text-blue-700">Rp.0 </span>
          <span tw="text-sm font-bold text-blue-700 ">IDR</span>
        </div>

        <p tw="text-secondary">overdue</p>
      </div>
      <div
        tw="cursor-pointer w-full text-center pt-10 hover:border-t-4 border-t-4 border-transparent hover:border-primary"
        onClick={() => handleClick("outstanding")}
      >
        <div>
          <span tw="text-4xl font-bold text-blue-700">Rp.0 </span>
          <span tw="text-sm font-bold text-blue-700 ">IDR</span>
        </div>
        <p>total outstanding</p>
      </div>
      <div
        tw="cursor-pointer w-full text-center pt-10 hover:border-t-4 border-t-4 border-transparent hover:border-primary"
        onClick={() => handleClick("draft")}
      >
        <div>
          <span tw="text-4xl font-bold text-blue-700">Rp.0 </span>
          <span tw="text-sm font-bold text-blue-700 ">IDR</span>
        </div>
        <p>in draft</p>
      </div>
    </div>
  );
}
