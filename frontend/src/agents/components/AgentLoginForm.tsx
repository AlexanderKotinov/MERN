import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AgentLoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // loading state for login button

  const handelFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission behavior
    setError('');
    setLoading(true);

    // post request to login endpoint
    try {
      const response = await fetch('http://127.0.0.1:4000/api/agents/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      setLoading(false);

      if (response.ok) {
        navigate('/agents');
      }

      if (response.status === 404) {
        setError('Invalid credentials');
      }
    } catch (error) {
      setError('Login failed :(');
    }
  };

  return (
    <>
      <form className='flex flex-col' onSubmit={handelFormSubmit}>
        <input
          type='email'
          placeholder='Email'
          className='p-2 m-2 rounded-md'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          className='p-2 m-2 rounded-md'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className='text-red-500'>{error || ''}</p>}
        <button
          type='submit'
          className='bg-blue-500 text-white p-2 m-2 rounded-md'
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </>
  );
};
