import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHttpClient } from '../../shared/hooks/useHttpClient';
import Agent from './AgentListItem';

type AgentType = { name: string; email: string; photo: string; id: number };

export default function AgentsList() {
  const navigate = useNavigate();
  const { isLoading, error, sendRequest } = useHttpClient();
  const [agents, setAgents] = useState<AgentType[] | null>(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const data = await sendRequest('http://localhost:4000/api/agents', 'GET');

        if (Array.isArray(data)) {
          setAgents(data);
        } else {
          setAgents(null);
        }
      } catch (err) {
        console.error('Failed to fetch agents:', err);
      }
    };

    fetchAgents();
  }, [sendRequest]);

  const agentsList = () => {
    if (isLoading) {
      return <h2>Loading...</h2>;
    }

    if (error) {
      return <h2 className="text-red-500">{error}</h2>;
    }

    if (!agents || agents.length === 0) {
      return <h2>Agents not found :(</h2>;
    }

    return (
      <ul>
        {agents.map((agent) => (
          <li key={agent.id} onClick={() => navigate(`/agents/${agent.id}`)} className="cursor-pointer">
            <Agent agentData={agent} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <h1 className="pb-4">Users</h1>
      {agentsList()}
    </>
  );
}