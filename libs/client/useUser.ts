import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from "swr";



export default function useUser(){
  const {data, error}  = useSWR("/api/users/me")
  const router = useRouter();

  useEffect(()=>{
   
  },[data,router])
  

  return {user:data?.profile, isLoading:!data&& !error}
}
