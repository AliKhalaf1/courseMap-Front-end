import React from 'react'
import './Register.scss'
import {useForm} from 'react-hook-form'
const Register = () => {
    const {register, handleSubmit,formState:{errors}} = useForm();
    const onSubmit = (data)=>{
        console.log(data);
    }
    return (
    <section className="register-container">

    <div className="card">
        <h2 className="">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" className="form-control" placeholder="Name" {...register('name', { required: true })}/>
                {errors.name?.type==="required"&& "Name is required"}
                <input type="email" className="form-control" placeholder="Email" {...register('email', { required: true })}/>
                {errors.email?.type==="required"&& "Email is required"}
                <input type="tel" className="form-control" placeholder="Phone Number (Optional) (01xxxxxxxxx)" pattern="[0]{1}[1]{1}[0-9]{9}" {...register('number')}/>
                <input type="password" className="form-control" placeholder="Password" {...register('password', { required: true, minLength:5 })}/>
                {errors.password?.type==="required"&& "password is required"}
                {errors.password?.type==="minLength"&& "password has to be more than 5 characters"}
                <input type="password" className="form-control" placeholder="Confirm Password" {...register('confirmPassword', { required: true})}/>
                {errors.confirmPassword?.type==="required"&& "Confirm Password is required"}
                <div>
                    <a href="/login">Already have an account? Login</a>
                </div>
                <button>Create Account</button>
        </form>

    </div>
    </section>
  )
}

export default Register