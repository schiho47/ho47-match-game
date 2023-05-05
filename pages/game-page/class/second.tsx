import GamePageLayout from "@/components/GamePageLayout/GamePageLayout";
import LineMatch from "@/components/LineMatch/LineMatch";
import { useEffect, useState } from "react";



const ClassScend = () => {
    const [data,setData]=useState([]);
    const getLevel2DataService = async () => {
		const res = await fetch('/api/class/class-level2', { method: 'GET' });
		const result = res.json();
        if(result){
            result.then((data) => setData(data));
           
            return;
        }
        alert('something went wrong');

	};

    useEffect(()=>{
        getLevel2DataService();
   },[]);

    return ( 
       <>
         <LineMatch data={data}/>
       </>
     );
}
 
export default ClassScend;