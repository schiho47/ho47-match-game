import { useEffect, useState, useRef, MouseEventHandler } from "react";
import Image from "next/image";
import GamePageLayout from "../GamePageLayout/GamePageLayout";
import { useRouter } from "next/router";
import { ClassLineType } from "@/types/game";
// http://localhost:3001/game-page/class/second

interface LineMatchProps{
    data: ClassLineType[]
}
const LineMatch:React.FC<LineMatchProps> = ({data}) => {
    const router = useRouter();
    const { asPath }=router;
    const [level,setLevel]=useState<string>('');
    const [score,setScore]=useState<number>(0);
    
    const pickItemsRef=useRef<string>();
    // canvas 相關
    const canvasRef=useRef(null);
    const canvasPositionRef=useRef<number[]>([]);
    const startPointRef=useRef<number[]>([]);
    const endPointRef=useRef<number[]>([]);
    


    
    const handlePointClick=(e:any,position:string,id:string)=>{
        console.log(e.clientX,e.clientY)
        if(position==='start'){
            startPointRef.current=[e.clientX,e.clientY];
            pickItemsRef.current=id;
            return;
        };

        if(id!==pickItemsRef.current){
            alert("❌錯了錯了錯了❌ 分數-300");
            pickItemsRef.current='';
            return;
        }
        if(id===pickItemsRef.current){
            endPointRef.current=[e.clientX,e.clientY];
            pickItemsRef.current='';
            drawing();
            return;
        };
    };

    const drawing=()=>{
        const canvas=canvasRef.current;
        if(canvas && startPointRef.current.length > 0 && endPointRef.current.length > 0 ){
            // @ts-ignore
            const ctx = canvas.getContext('2d');
            const [startX, startY] = startPointRef.current;
            const [endX, endY] = endPointRef.current;
            const [canvasX,canvasY] =canvasPositionRef.current;
            ctx.beginPath();
            ctx.moveTo(startX-canvasX, startY-canvasY);
            ctx.lineTo(endX-canvasX, endY-canvasY);
            ctx.lineWidth = 3;
            ctx.strokeStyle = "black";
            ctx.stroke();
        }
    };
 
   
    useEffect(()=>{
        const level = localStorage.getItem("level");
        setScore(Number(localStorage.getItem("score")!));
        setLevel(`${asPath.split('/')[2]}-${level}`);
       
    },[]);

    useEffect(()=>{
        if(typeof window==='object' && canvasRef.current!==null){
            // @ts-ignore
            const position=canvasRef.current.getBoundingClientRect();
            canvasPositionRef.current=[position.x,position.y]
        }
    },[])
    return ( <>
        <div>
            <GamePageLayout rules={"遊戲規則： 連連看-請將相關的兩這相連"}  level={level} score={score}>
                <div style={{display:'flex', justifyContent:'space-around',marginTop:'3rem'}}>
                    {data.map((item)=>{
                    return(
                        <div key={item.id}>
                           <Image src={item.src} alt="連連看的圖片" width={300} height={300} />
                           <div style={{textAlign:'center',fontSize:'4rem',cursor:'pointer'}} onClick={(e)=>handlePointClick(e,"start",item.id)}>.</div>
                        </div>
                     
                    )
                    })}
                </div>
             
                <canvas ref={canvasRef} width={1300} height={300} style={{marginLeft:'4.5rem'}} />

                
          
     
                <div style={{display:'flex', justifyContent:'space-around',marginBottom:'3rem'}}>
                    {data.sort(() => Math.random() - 0.5).map((item)=>{
                        return (
                            <div key={item.id} >
                                <div style={{textAlign:'center',fontSize:'4rem',cursor:'pointer'}} onClick={(e)=>handlePointClick(e,"end",item.id)}>.</div>
                                <span style={{fontSize:'2rem'}}>{item.name}</span>
                            </div>
                        )
                    }
                    )}
                </div>
            </GamePageLayout>
        </div>
        <dialog open>
                    <span>You can see me</span>
                </dialog>
    </> );
}
 
export default LineMatch;