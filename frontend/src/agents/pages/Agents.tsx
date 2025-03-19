import { useEffect, useState } from 'react';
import AgentsList from '../components/AgentsList';

export default function Agents() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch('http://127.0.0.1:4000/api/agents');
        const data = await response.json();

        setAgents(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAgents();
  }, []);

  return (
    <div className='flex flex-wrap pb-16 '>
      <div className='flex-1 p-4 float-left w-4xl max-h-screen overflow-y-auto'>
        <AgentsList agents={agents}/>
      </div>
    </div>
  );
}
