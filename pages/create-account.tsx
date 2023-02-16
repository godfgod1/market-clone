import type { NextPage } from "next";
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
const Enter: NextPage = () => {


  const router = useRouter()
  const {register, handleSubmit } =useForm()
  const onValid = () =>{
    router.push("log-in")
  }

  return (
    <div className="">
   <h1>Create Account</h1>
   <form onSubmit={handleSubmit(onValid)}>
   <div>
    <label>Name:</label>
    <input  {...register("name")} type='text'/>

    </div>
    <div>
    <label>email:</label>
    <input {...register("email")} type='email'/>

    </div>
    <button>Create Account</button>
   </form>
    </div>
  );
};
export default Enter;