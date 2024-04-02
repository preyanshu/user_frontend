import React,{useEffect} from 'react'
import { TeamCard } from './TeamCard'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../store/teamUsersSlice';

const Teams = () => {
    const dispatch = useDispatch();

  const teamUsers = useSelector((state: any) => state.teamUsers.teamUsers);
  const loading = useSelector((state: any) => state.teamUsers.loading);
  const error = useSelector((state: any) => state.teamUsers.error);

  useEffect(() => {
    dispatch(fetchAllUsers() as any);
  }, [dispatch]);

  return (<>
  {loading && <div className='flex w-full h-full bg-black justify-center items-center text-white'><p>Loading...</p></div>}
  {error && <div className='flex w-full h-full  justify-center items-center text-white'><p>{error}</p></div>}
  {teamUsers.length === 0 && <div className='flex w-full h-full  justify-center items-center text-white'><p>No teams found</p></div>}


  <div className='h-fit w-screen flex justify-center absolute left-0 flex-wrap'>
        {/* {} */}
       
        {teamUsers.map((team:any) => (
            <TeamCard key={team._id} team={team}></TeamCard>
        ))}
       


      
    </div>
 
   
    </>)}


export default Teams
