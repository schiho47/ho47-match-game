import { useEffect, useState } from "react";
import MatchGamePage from "@/components/MatchGamePage/MatchGamePage";

const ClassLevel = () => {
    const [data,setData]=useState([]);
	const getLevel1DataService = async () => {
		const res = await fetch('/api/class/class-level1', { method: 'GET' });
		const result = res.json();
        if(result){
            result.then((data) => setData(data));
            return;
        }
        alert('something went wrong');

	};
    useEffect(()=>{
         getLevel1DataService();
    },[])
    return ( <div>
        <MatchGamePage data={data} propsLevel="one"/>
    </div> );
}
 
export default ClassLevel;