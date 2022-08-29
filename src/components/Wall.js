import { useEffect,useState } from "react";
const wallInitialValue = 0;
function Wall({_height,sendValue,_enableGame}){
    let bottomHeight = Math.abs(470-(_height + 80));
    let wallInterval = null;

    const [wallPosition,setWallPosition] = useState(wallInitialValue)
    
    sendValue(wallPosition,_height);
    useEffect(()=>{
        if(_enableGame){
            wallInterval = setInterval(positionControl,30);
            return(()=>{
                clearInterval(wallInterval);
            })
        }
    })

    function positionControl(){
        if(wallPosition<1920 && _enableGame){
            setWallPosition(wallPosition => wallPosition+3);
        }
    }
    return(
        <>
            <div className="bodyWall" style={{right:wallPosition}} >
                <div className="topWall" style={{height:_height}}> 
                </div>
                <div className="bottomWall" style={{height:bottomHeight}}>
                </div>
            </div>
        </>
    )
}
export default Wall