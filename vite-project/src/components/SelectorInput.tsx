import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
export function ComboboxForm(props:any) {
    const {label,heading,handleChange} = props;



  return (
    <Select onValueChange={(e)=>{
        handleChange(e);

    }}>
  <SelectTrigger className="w-[100px] mx-3 text-white">
    <SelectValue placeholder={heading} />
  </SelectTrigger>
  <SelectContent>
    {label && label.map((e:{title:string,value:string})=><SelectItem value={e.value}>{e.title}</SelectItem>)}
   
    
  </SelectContent>
</Select>

  )
}
