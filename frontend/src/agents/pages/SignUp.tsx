import SignUpForm from '../components/SignUpForm';

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center mt-16 mb-16 bg-gray-600 p-4 bg-gray-700 border border-gray-800 rounded-md">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <SignUpForm />
    </div>
  );
}