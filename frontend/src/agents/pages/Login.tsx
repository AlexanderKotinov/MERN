import AgentLoginForm from '../components/AgentLoginForm';

export default function LoginPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <h1 className='text-2xl font-bold mb-4'>Login</h1>
      <AgentLoginForm />
    </div>
  );
}
