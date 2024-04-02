import React,{useState} from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import Users from './Users'
import Teams from './Teams'
  


const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const handlePrevPage = () => {
        if (currentPage === 1) return;
      setCurrentPage(prevPage => prevPage - 1);
    };
  
    const handleNextPage = () => {
      setCurrentPage(prevPage => prevPage + 1);
    };
  return (
    <div className='w-full h-screen flex justify-start items-center flex-col dark xl:justify-start'>
        {/* Search bar */}


{/* tabs */}
        <Tabs defaultValue="account" className="lg:w-1/2 md:w-3/4">
  <TabsList className='w-3/4 min-w-[300px]'>
    <TabsTrigger value="account">Users</TabsTrigger>
    <TabsTrigger value="password">Teams</TabsTrigger>
  </TabsList>
  <TabsContent value="account"><div className='h-1/3 md:h-3/4 py-3'>
    
     <Users currentPage={currentPage}></Users></div>

     <Pagination className='dark absolute bottom-0 left-[0vw]' >
  <PaginationContent >
    <PaginationItem>
      <PaginationPrevious onClick={handlePrevPage}  />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink >{currentPage}</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext onClick={handleNextPage} />
    </PaginationItem >
  </PaginationContent>
</Pagination>



    
    </TabsContent>

  <TabsContent value="password"><div className='h-1/3 py-3 '>
    <Teams></Teams>
    
    </div></TabsContent>
</Tabs>

{/* pagination */}






      
    </div>
  )
}

export default Home
