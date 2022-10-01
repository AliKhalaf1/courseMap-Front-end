import React, { useState } from 'react';
import './Register.scss';
import { useForm } from 'react-hook-form';
import { addUser } from './Services/register.services';
import { Navigate } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import authHeader from '../../Global/auth-header';
import { Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
const Register = () => {
  const formSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    number: Yup.string().required('Number is required'),
    email: Yup.string().required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password length should be at least 8 characters'),
    cpassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Passwords do not match')
  });

  const loggedIn = Object.keys(authHeader()).length ? true : false;
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(formSchema)
  });

  const onSubmit = (data) => {
    setLoading(true);
    delete data.cpassword;
    delete data.number;
    setMessage('');
    setSuccessful(false);
    addUser(data).then(
      (response) => {
        setLoading(false);
        setSuccessful(true);
        setMessage('Successful');
      },
      (error) => {
        setLoading(false);
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
        console.log(resMessage);
        setSuccessful(false);
      }
    );
  };
  if (loggedIn) return <Navigate to="/" />;
  return (
    <section className="register-container">
      <div className="card">
        <h2 className="">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="alerts">{errors.name?.message}</p>
          <input type="text" className="form-control" placeholder="Name" {...register('name')} />

          <p className="alerts">{errors.email?.message}</p>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            {...register('email', { required: true })}
          />

          <p className="alerts">{errors.number?.message}</p>
          <input
            type="tel"
            className="form-control"
            placeholder="Phone Number (Optional) (01xxxxxxxxx)"
            pattern="[0]{1}[1]{1}[0-9]{9}"
            {...register('number')}
          />

          <p className="alerts">{errors.password?.message}</p>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            {...register('password')}
          />

          <p className="alerts">{errors.cpassword?.message}</p>
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            {...register('cpassword')}
          />
          <div>
            <a href="/login">Already have an account? Login</a>
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? <Spinner as="span" animation="border" size="sm" /> : <></>}
            Create Account
          </Button>
          {/* <button>Create Account</button> */}
        </form>

        {message && (
          <div className="form-group">
            <div className={successful ? 'alert alert-success' : 'alert alert-danger'} role="alert">
              {message}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Register;
