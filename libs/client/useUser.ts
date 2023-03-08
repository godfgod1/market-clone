import { useRouter } from 'next/router';
import path from 'path';
import { useEffect, useState } from 'react';
import useSWR from "swr";


export default function useUser(pathname:string){
  const {data, error}  = useSWR("/api/users/me")
  const router = useRouter();
  useEffect(()=>{ 
    if(pathname ==='/enter') return
    console.log('userData',data );
    if (data && !data.ok) {
      router.replace("/enter");
    }
  },[data,router])
  

  return {user:data?.profile, isLoading:!data&& !error}
}
