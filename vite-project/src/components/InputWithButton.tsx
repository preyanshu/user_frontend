import { useState } from "react";
import { useDispatch,useSelector} from 'react-redux';
import { createTeam } from '../store/teamUsersSlice';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function InputWithButton(props:any) {
    const [open, setOpen] = useState(false);
    const [teamName, setTeamName] = useState('');
    const dispatch = useDispatch();
    const loading = useSelector((state: any) => state.teamUsers.loading);
    const errors = useSelector((state: any) => state.teamUsers.error);
   
    const {search,handleChange,selectedUsers} = props;

    const handleTeamCreation = () => {
        if (teamName.trim() === '') {
          toast.error('Please enter a team name',{theme:'dark'});
          return;
        }
        
        if (selectedUsers.length !== 2) {
          toast.error('Team must consist of exactly two members',{theme:'dark'});
          return;
        }

        dispatch(createTeam({ userIds: selectedUsers.map((user:any) => user._id), teamName }) as any);
        setOpen(false); 
        if(!loading && !errors){
            toast.success('Team created successfully',{theme:'dark'});
        }
    };

    return (
        <>
            <div className="flex w-full max-w-sm items-center space-x-2 my-7 mb-5 text-white">
                <Input type="text" className="w-1/2" placeholder="Search.." value={search.search} onChange={handleChange} />
                <Button type="submit" className="w-1/5" onClick={()=>{
                    if(selectedUsers.length===0){
                        toast.error("select users to create a team.",{theme:'dark'});
                        return;
                    } else if(selectedUsers.length===1){
                        toast("select more than one user to create a team.",{theme:'dark'});
                        return;
                    } else {
                        setOpen(true);
                    }
                }}>Create</Button>
                <Button type="submit" className="w-1/5"  onClick={()=>{
                    window.location.reload();
                }}>Reset</Button>
            </div>

            {/* dialogue */}

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Team Name</DialogTitle>
                        <DialogDescription>
                            Enter team name here, Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">TeamName</Label>
                            <Input id="name" className="col-span-3" value={teamName} onChange={(e) => setTeamName(e.target.value)} />
                        </div>
                        {errors && <p className="text-red-500 text-sm">{errors}</p>}
                    </div>
                    <DialogFooter>
                        
                        <Button type="submit" onClick={handleTeamCreation}> {loading ? 'Creating...' : 'Create Team'}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
