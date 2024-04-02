
import { cn } from "@/lib/utils"

import {
  Card,
  CardContent,

  CardHeader,
  CardTitle,
} from "@/components/ui/card"



import { Checkbox } from "@/components/ui/checkbox"





export function CheckboxDemo(props:any) {
    const {user,handleUserSelection,selectedUsers} = props;
    return (
      <div className="flex items-center space-x-2 mx-5">
        <Checkbox id="selected" onClick={()=>{
            handleUserSelection(user);


        }} checked={selectedUsers.some((selectedUser:any) => selectedUser._id === user._id) }/>
      </div>
    )
  }
  


 
type CardProps = React.ComponentProps<typeof Card>|any
 
export function UserCard({ className, ...props }: CardProps) {
    const {user,handleUserSelection,selectedUsers} = props;
  return (
    <Card className={cn("w-[340px] text-start h-[175px]", className)} {...props} >
      <CardHeader>
        <CardTitle className="flex"><img src={user.avatar} alt="" className="h-[30px] w-[30px] rounded-full me-3" />{user.first_name+" "+user.last_name} <CheckboxDemo user={user} handleUserSelection={handleUserSelection} selectedUsers={selectedUsers}/></CardTitle>
        
      </CardHeader>
      <CardContent className="grid gap-4">
       
        <div>
          
            <div
              key={Date.now()}
              className=" grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >


              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
              <div className="space-y-1">

              <p className="text-sm font-medium leading-none">
                
                    {user.gender}
                 
                </p>
               
                <p className="text-sm font-medium leading-none">
                  Domain : {user.domain}
                </p>
                <p className="text-sm font-medium leading-none">
                  Email : {user.email}
                </p>
               
            
                    <p className="text-sm text-muted-foreground">
                    {user.available ? "Available" : "Not Available"}
                </p>
              
               
              </div>
            </div>
         
        </div>
      </CardContent>
     
    </Card>
  )
}