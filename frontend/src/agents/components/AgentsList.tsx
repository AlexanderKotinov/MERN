import { useNavigate } from 'react-router-dom';
import Agent from './AgentListItem';

type AgentsPropsType = {
  agents: Array<{ name: string, email: string, photo: string, id: number }> | { message: string },
};

export default function AgentsList(props: AgentsPropsType) {
  const navigate = useNavigate();

  const agentsList =() => {
    const { agents } = props;

    if (!Array.isArray(agents) && agents.message) {
      return <h2>Agents not found :(</h2>
    }

    return (
      <ul>
        {Array.isArray(agents) && agents.map((agent) => (
          <li key={agent.id} onClick={()=>navigate(`/agents/${agent.id}`)}>
            <Agent agentData={agent} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <h1 className='pb-4'>Users</h1>
      { agentsList() }
    </>
  )
}

