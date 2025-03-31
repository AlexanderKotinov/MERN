import AgentsList from '../components/AgentsList';

export default function Agents() {
  return (
    <div className='flex flex-wrap pb-16'>
      <div className='flex-1 p-4 float-left w-4xl overflow-y-auto'>
        <AgentsList />
      </div>
    </div>
  );
}
