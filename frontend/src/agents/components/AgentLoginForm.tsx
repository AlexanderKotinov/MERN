import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHttpClient } from '../../shared/hooks/useHttpClient';

export default function AgentLoginForm() {
  const navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handelFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const data = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}api/agents/login`,
        'POST',
        { email, password }
      );
      localStorage.setItem('authToken', data.token);

      console.log('Login successful:', data);
      navigate('/agents');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <>
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded-md mb-4">
          <p>{error}</p>
          <button onClick={clearError} className="text-blue-500 underline">
            Dismiss
          </button>
        </div>
      )}
      <form className="flex flex-col" onSubmit={handelFormSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="p-2 m-2 rounded-md border border-gray-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 m-2 rounded-md border border-gray-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 m-2 rounded-md"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </>
  );
}