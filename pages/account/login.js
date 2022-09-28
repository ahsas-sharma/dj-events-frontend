import { FaUser } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect, useContext } from 'react';
import AuthContext from '@/context/AuthContext';
import Link from 'next/link';
import Layout from '@/components/Layout';
import styles from '@/styles/AuthForm.module.css';

export default function LoginPage() {
  const { login, error } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    console.log('ran use effect');
    error && toast.error(error);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if ((email, password)) {
      login({ email, password });
    } else {
      toast.error('Please enter both email and password');
    }
  };

  return (
    <Layout title='User Login'>
      <div className={styles.auth}>
        <h1>
          <FaUser /> Login
        </h1>
        <ToastContainer />
        <form onSubmit={handleSubmit}>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input type='submit' value='Login' className='btn' />
          <p>
            Don't have an account?{' '}
            <Link href='/account/register'>Register</Link>
          </p>
        </form>
      </div>
    </Layout>
  );
}
