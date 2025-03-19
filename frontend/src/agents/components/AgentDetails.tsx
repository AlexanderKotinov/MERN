import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import imgPlaceholder from '../../assets/react.svg';

type AgentType = {
  name: string;
  email: string;
  photo: string;
  id: number;
};

export default function AgentDetails() {
  const { id } = useParams<{ id: string }>();
  const [agent, setAgent] = useState<AgentType | null>(null);

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/agents/${id}`);
        const data = await response.json();

        setAgent(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAgent();
  }, [id]);

  if (!agent) {
    return <div>Loading...</div>;
  }

  const agentPhoto = agent.photo ? agent.photo : imgPlaceholder;

  return (
    <div className='bg-slate-700 shadow-md rounded-lg overflow-hidden p-4 m-4 w-4xl cursor-pointer'>
      <div className="flex flex-row items-center">
        <img className='w-16 h-16 rounded-full object-cover' src={agentPhoto} alt='agent' />
        <div className='flex pl-4 h-full flex-col'>
          <h2 className='font-bold text-xl'>{agent.name}</h2>
          <p className='text-gray-300'>{agent.email}</p>
        </div>
      </div>
    </div>
  );
}
