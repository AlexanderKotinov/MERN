import { NavLink } from "react-router-dom";

export default function NavLinks() {
  return (
    <ul className='flex p-4'>
      <li className='mr-4 border-r border-gray-300'>
        <NavLink className={({ isActive }) => `pr-4 hover:underline ${isActive ? 'text-red-400' : ''}`} to='/'>Home</NavLink>
      </li>
      <li className='mr-4 border-r border-gray-300'>
        <NavLink className={({ isActive }) => `pr-4 hover:underline ${isActive ? 'text-red-400' : ''}`} to='/agents'>Agents</NavLink>
      </li>
      <li className='mr-4 border-r border-gray-300'>
        <NavLink className={({ isActive }) => `pr-4 hover:underline ${isActive ? 'text-red-400' : ''}`} to='/real-estate'>Real Estate</NavLink>
      </li>
      <li>
        <NavLink className={({ isActive }) => `hover:underline ${isActive ? 'text-red-400' : ''}`} to='/login'>Login</NavLink>
      </li>
    </ul>
  );
}