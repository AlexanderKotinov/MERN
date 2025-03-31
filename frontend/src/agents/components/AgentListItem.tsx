import imgPlaceholder from '../../assets/react.svg';

type AgentPropsType = {
  agentData: { name: string, email: string, photo: string, id: number },
};

export default function AgentListItem(props: AgentPropsType) {
  console.log(`http://localhost:4000/${props.agentData.photo}`);
  const agentPhoto = props.agentData.photo
    ? `http://localhost:4000/${props.agentData.photo}`
    : imgPlaceholder;

  return (
    <div className='bg-slate-700 shadow-md rounded-lg overflow-hidden p-4 m-4 cursor-pointer'>
      <div className="flex flex-row items-center">
        <img className='w-16 h-16 rounded-full object-cover' src={agentPhoto} alt='agent' />
        <div className='flex pl-4 h-full flex-col'>
          <h2 className='font-bold text-xl'>{props.agentData.name}</h2>
          <p className='text-gray-300'>{props.agentData.email}</p>
        </div>
      </div>
    </div>
  )
}
