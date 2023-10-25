import '../styles/Login.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoginEyeClosed } from '../assets/login-eye-closed';
import { LoginEyeOpened } from '../assets/login-eye-opened';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchLogin } from '../thunk/fetchTable';
import { TLoginData } from '../types';

export default function Login() {
  const [type, setType] = useState(true);
  const [typeName, setTypeName] = useState('password');
  const [message, setMessage] = useState<string | null>(null);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  function click() {
    setType(!type);
    if (type) {
      setTypeName('text');
    } else {
      setTypeName('password');
    }
  }

  let userSchema = yup.object({
    username: yup.string().required('Enter username'),
    password: yup.string().required('Enter password'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(userSchema) });

  function onSubmit(e: TLoginData) {
    dispatch(fetchLogin(e) as any)
      .then(() => {
        navigate('/');
      })
      .catch((e: any) => {
        if (e.response.data.error === 'Invalid credentials.') {
          setMessage('Wrong username or password');
        }
      });
  }

  return (
    <div className='background-container'>
      <div className='login-container'>
        <div className='login-content'>
          <div>
            <h2>Enter account</h2>
          </div>
          <p className='login-text'>Enter your email and password</p>
          <form onSubmit={handleSubmit(onSubmit)} className='login-form'>
            <label className='login-input mail'>
              Email*
              <input
                style={
                  errors.username
                    ? { backgroundColor: '#FDE4E4' }
                    : { backgroundColor: '#FFFFFF' }
                }
                {...register('username')}
                type='text'
                placeholder='name@company.com'
              />
            </label>
            <p className='errorText'>{errors.username?.message}</p>
            <label className='login-input pass'>
              Пароль*
              <input
                style={
                  errors.password
                    ? { backgroundColor: '#FDE4E4' }
                    : { backgroundColor: '#FFFFFF' }
                }
                {...register('password')}
                type={typeName}
                placeholder='************'
              />
              {!type ? (
                <LoginEyeClosed onClick={() => click()} />
              ) : (
                <LoginEyeOpened onClick={() => click()} />
              )}
            </label>
            <p className='errorText'>{errors.password?.message}</p>
            <p className='message messageNotFound'>{message}</p>
            <button type='submit'>Enter</button>
          </form>
        </div>
      </div>
    </div>
  );
}
