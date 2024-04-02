import React, { useState, useEffect } from 'react';
import { UserCard } from './UserCard';
import { InputWithButton } from './InputWithButton';
import { ComboboxForm } from './SelectorInput';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../store/userSlice';

const Users = (props: any) => {
  const { currentPage } = props;
  console.log("props", props   );
  const dispatch = useDispatch();
  const users = useSelector((state: any) => state.users.users);
  const loading = useSelector((state: any) => state.users.loading);
  const error = useSelector((state: any) => state.users.error);
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
  const [filters, setFilters] = useState<any>({
    search: '',
    domain: '',
    gender: '',
   
    page: currentPage,
    limit: 20,
  });
  

  useEffect(() => {
    dispatch(fetchUsers(filters) as any);
  }, [dispatch, filters,currentPage]);
  useEffect(() => {
   
    setFilters((prevFilters:any) => ({
      ...prevFilters,
      page: currentPage,
    }));
  }, [currentPage]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, search: event.target.value });
  };

  const handleGenderChange = (value: any) => {
    setFilters({ ...filters, gender: value });
  };

  const handleDomainChange = (value: any) => {
    setFilters({ ...filters, domain: value });
  };

  const handleAvailabilityChange = (value: any) => {
    setFilters({ ...filters, available: value });
  };

  const handleUserSelection = (user: any) => {
    const isSelected = selectedUsers.some((selectedUser) => selectedUser._id === user._id);
  
    if (isSelected) {
      // User already selected, remove from selectedUsers array
      setSelectedUsers((prevSelectedUsers) =>
        prevSelectedUsers.filter((selectedUser) => selectedUser._id !== user._id)
      );
      return;
    }
  
    const isUnique = selectedUsers.every(
      (selectedUser) => selectedUser.domain !== user.domain && selectedUser.available !== user.available
    );
  
    if (isUnique) {
      setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, user]);
    } else {
      alert('Choose unique members with different domains and availabilities');
    }
  };

  const reset =()=>{
    console.log("reset");
    setFilters({
        search: '',
        domain: '',
        gender: '',
       
        page: currentPage,
        limit: 20,
      });}
  

  return (
    <div className='flex items-center flex-col justify-center text-white'>
      <InputWithButton search={filters} handleChange={handleSearchChange} selectedUsers={selectedUsers}></InputWithButton>
      <div className='flex  flex-row mb-5'>
        <ComboboxForm heading='Domain' label={[{ title: 'Sales', value: 'Sales' }, { title: 'Finance', value: 'Finance' }, { title: 'Marketing', value: 'Marketing' }, { title: 'IT', value: 'IT' }, { title: 'Management', value: 'Management' }, { title: 'UI Designing', value: 'UI Designing' }, { title: 'Business Development', value: 'Business Development' }]} handleChange={handleDomainChange}></ComboboxForm>
        <ComboboxForm heading='Gender' label={[{ title: 'Male', value: 'Male' }, { title: 'Female', value: 'Female' }]} handleChange={handleGenderChange}></ComboboxForm>
        <ComboboxForm heading='Availability' label={[{ title: 'True', value: true }, { title: 'False', value: false }]} handleChange={handleAvailabilityChange}></ComboboxForm>
      </div>
      {loading && <p>Loading...</p>}
  {error && <p>{error}</p>}
      <div className='h-[400px] w-screen flex justify-center  flex-wrap overflow-x-hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3  justify-items-center containerbox '>
 
  {users.map((user: any) => (
    <UserCard key={user._id} user={user} handleUserSelection={handleUserSelection}  selectedUsers={selectedUsers} />
  ))}
</div>


    </div>
  );
}

export default Users;
