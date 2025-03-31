import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHttpClient } from '../../shared/hooks/useHttpClient';

export default function SignUpForm() {
  const navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      const allowedTypes = ['image/png', 'image/jpeg', 'image/svg+xml'];

      if (!allowedTypes.includes(file.type)) {
        setPhotoError('Only PNG, JPG, and SVG formats are allowed.');
        setPhoto(null);
        setPhotoPreview(null);
        return;
      }

      setPhotoError(null);
      setPhoto(file);

      const reader = new FileReader();

      reader.onload = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPhoto(null);
      setPhotoPreview(null);
    }
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    const formData = new FormData();
  
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
  
    if (photo) {
      formData.append('photo', photo);
    }

    console.log('Backend URL:', process.env.REACT_APP_BACKEND_URL);
  
    try {
      const data = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}api/agents/signup`,
        'POST',
        formData
      );
  
      navigate('/agents');
    } catch (err) {
      console.error('Sign-up failed:', err);
    }
  };

  return (
    <>
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded-md mb-4">
          <span>{error} </span>
          <button onClick={clearError} className="text-blue-500 underline">
            Dismiss
          </button>
        </div>
      )}
      <form className="flex flex-col" onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Name"
          className="p-2 m-2 rounded-md border border-gray-300"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <input
          type="file"
          accept="image/*"
          className="p-2 m-2 rounded-md border border-gray-300"
          onChange={handlePhotoChange}
        />
        {photoError && (
          <p className="text-red-500 text-sm m-2">{photoError}</p>
        )}
        {photoPreview && (
          <div className="flex justify-center items-center m-2">
            <img
              src={photoPreview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-md border border-gray-300"
            />
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 m-2 rounded-md"
          disabled={isLoading}
        >
          {isLoading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
    </>
  );
}