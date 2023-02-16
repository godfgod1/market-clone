import type { NextPage } from "next";
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
const Enter: NextPage = () => {
  const router = useRouter()
  const {register, handleSubmit } =useForm()

  const onValid = () =>{
    router.push("/")
  }

  return (
    <div className="">
   <h1>login</h1>
   <form onSubmit={handleSubmit(onValid)}>
    
    <div>
    <label>email:</label>
    <input {...register("email")} type='email'/>

    </div>
    <button>login</button>
   </form>
    </div>
  );
};
export default Enter;