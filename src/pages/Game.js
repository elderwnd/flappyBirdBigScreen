import { useEffect, useState } from "react";
import Bird from "../components/Bird"
import Wall from "../components/Wall"
const birdInitialValue = 105;
var i = -1;
function Game(){
    const [score,setScore] = useState(0)
    const [birdPosition,setBirdPosition] = useState(birdInitialValue)
    const [walls,setWalls] = useState([]);
    const [enableGame,setEnableGame] = useState(false);
    const [lastScore,setLastScore] = useState(0)
    const [gameOver,setGameOver] = useState("none")
    const [gravity,setGravity] = useState(50)
    function getDate(){
        var date = new Date();
        return date.getDay()+"."+(date.getMonth()+1)+"."+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes();
    }

    const getValueFromWall = (wallPosition,wallHeight,_score) =>{
        //console.log(wallPosition);
        if(wallPosition>1761 && wallPosition<1911 && enableGame){
            if(!(birdPosition>wallHeight && birdPosition<(wallHeight+95))){
                setEnableGame(false);
                setGameOver("block");
                setLastScore(score);
            }
        }
    }

    function downPosition(){
        if((birdPosition+4)<450 && enableGame){
            setBirdPosition(birdPosition => birdPosition + 4)
        }
        if(i === gravity || i === -1){
            generateWall()
            i=0;
        }else{
            i = i+1;
        }
        scoreInc()
        fastLevel()
    }

    function upPosition(){
        if(enableGame){
            if((birdPosition-8)<5){
                setBirdPosition(5);
            }else{
                setBirdPosition(birdPosition => birdPosition - 8);
            }
        }
    }
    function fastLevel(){
        if((score%200 === 0) && (gravity !== 0)){
            setGravity(gravity=>gravity-5);
        }
    }
    var randomValueForHeightOfWall = 0;
    function generateWall(){
        if(enableGame){
            randomValueForHeightOfWall = Math.floor(Math.random()*(300-20)+20);
            setWalls(prev=>[...prev,randomValueForHeightOfWall]);
        }
        
    }

    function scoreInc(){
        setScore(score=> score + 1)
    }

    
    useEffect(()=>{
        let birdInterval = null;
       if(enableGame){
            birdInterval = setInterval(downPosition,100);
            return(()=>{
                clearInterval(birdInterval);
            })
       } 
    })
    
    function stopGame(){
        setEnableGame(false);
    }
    function startGame(){
        setBirdPosition(birdInitialValue)
        setWalls([])
        setScore(0)
        setEnableGame(true);
        setGameOver("none")
    }

    return(
        <div className="gameBox">
            <div className="gameBody" onClick={()=>upPosition()}>
                <Bird _top={birdPosition}/>
                {
                    walls.map((wall,index) =>
                        <Wall _height={wall}  sendValue={getValueFromWall} key={index} _enableGame={enableGame} />
                    )
                }      
                <h1>{score}</h1>
            </div>
            <div className="gameFooter">
                <button onClick={()=>startGame()} >Start</button>
                <button onClick={()=>stopGame()}>Stop</button>
                <span>Son Score : {lastScore}<br />{getDate()}</span>
            </div>
            <div className="gameOver" style={{display:gameOver}}>
                <h1>Kaybettiniz</h1>
                <span>Score : {score}</span><br />
                <button onClick={()=>startGame()} >Yeni Oyun</button>
            </div>
        </div>
    )
}
export default Game