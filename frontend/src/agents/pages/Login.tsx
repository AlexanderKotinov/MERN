import AgentLoginForm from '../components/AgentLoginForm';
import { Link } from 'react-router-dom'

export default function LoginPage() {
  return (
    <div className='flex flex-col items-center justify-center mt-16 mb-16 p-4 bg-gray-700 border border-gray-800 rounded-md'>
      <h1 className='text-2xl font-bold mb-4'>Login</h1>
      <AgentLoginForm />
      <p className='mt-4'>
        Don't have an account?{' '}
        <Link to='/signup' className='text-blue-500 underline'>
          Sign Up
        </Link>
      </p>
    </div>
  );
}
