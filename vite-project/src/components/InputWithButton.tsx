import { useState } from "react";
import { useDispatch,useSelector} from 'react-redux';
import { createTeam } from '../store/teamUsersSlice';

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
          alert('Please enter a team name');
          return;
        }
        
        if (selectedUsers.length !== 2) {
          alert('Team must consist of exactly two members');
          return;
        }

        dispatch(createTeam({ userIds: selectedUsers.map((user:any) => user._id), teamName }) as any);
        setOpen(false); 
        if(!loading && !errors){
            alert('Team created successfully');
        }
    };

    return (
        <>
            <div className="flex w-full max-w-sm items-center space-x-2 my-7 mb-5 text-white">
                <Input type="text" className="w-1/2" placeholder="Search.." value={search.search} onChange={handleChange} />
                <Button type="submit" className="w-1/5" onClick={()=>{
                    if(selectedUsers.length===0){
                        alert("Please select users to create a team.");
                        return;
                    } else if(selectedUsers.length===1){
                        alert("Please select more than one user to create a team.");
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
