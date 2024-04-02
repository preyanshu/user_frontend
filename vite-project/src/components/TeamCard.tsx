
 
import { cn } from "@/lib/utils"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

 
type CardProps = React.ComponentProps<typeof Card>|any
 
export function  TeamCard({ className, ...props }: CardProps) {
    const {team} = props;
  return (
    <Card className={cn("w-[340px] text-start h-[150px] m-4", className)} {...props}>
      <CardHeader>
        <CardTitle className="flex">{team.teamName}</CardTitle>
        
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
                  Domains : {team.uniqueDomains[0]} and {team.uniqueDomains[1]}
                </p>
                <p className="text-sm font-medium leading-none">
                    Team Members : {team.userIds[0].first_name} and {team.userIds[1].last_name}
                  
                </p>
               
              </div>
            </div>
         
        </div>
      </CardContent>
     
    </Card>
  )
}