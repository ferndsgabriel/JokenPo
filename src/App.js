import React,{ useRef, useState } from 'react';
import './App.css';//
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const gameOptionsList = ['paper','scissors','stone'];
  const [unlocked, setUnlocked] = useState(false);
  const [cpuPlay, setCpuPlay] = useState();
  const [myPlay, setMyPlay] = useState();
  const [cpuScore, setCpuScore] = useState(0);
  const [myScore, setMycore] = useState(0);
  const animationPlayRef = useRef(null);
  const [result, setResult] = useState ('');
  let interval;
  
  const handlePlay = (index) => {
    setUnlocked(true);
    const mathPlay = Math.floor(Math.random() * gameOptionsList.length);
    setCpuPlay(mathPlay);
    setMyPlay(index);

    animationPlayRef.current?.classList.add('animationPlay');
    let win;

    if (index === mathPlay) {
      toast.warning('Game tied');
    } else {
        switch (index) {
            case 0:
                win = (mathPlay === 2);
                break;
            case 1:
                win = (mathPlay === 0);
                break;
            case 2:
                win = (mathPlay === 1);
                break;
            default:
                return;
        }

        if (win === true) {
            setMycore(myScore + 1);
            setResult('Win');
            toast.success('Win');
        }else {
            setCpuScore(cpuScore + 1);
            setResult('Defeat');
            toast.error('Defeat')
        }
    }//pode dar undefined caso de empate;

    interval = setInterval(()=>{
      startNewGame();
        setCpuPlay(0);
  setMyPlay(0)
    },4000);

    
};


const startNewGame = () =>{
  animationPlayRef.current?.classList.remove('animationPlay');
  clearInterval(interval);
    setCpuPlay(0);
    setMyPlay(0)
    setUnlocked(false);
}

const resetGame = () =>{
  animationPlayRef.current?.classList.remove('animationPlay');
  clearInterval(interval);
  setUnlocked(false);
  setCpuPlay(0);
  setMyPlay(0);
  setCpuScore(0);
  setMycore(0);
}
  return (
    <>
      <main className='container'>
        
          <section className='section'>
            <div className='infosGame'>
              <div className='scores'>
                <span>You:{myScore}</span>
                <span>CPU:{cpuScore}</span>
              </div>
              <button onClick={resetGame} className='buttonNewGame'><span>New game</span></button>
            </div>
            <article className='viewPlay' ref={animationPlayRef}>
              <img src={`${gameOptionsList[cpuPlay]}.png`} alt={gameOptionsList[1]}/>
              <img src={`${gameOptionsList[myPlay]}.png`} alt={gameOptionsList[0]}/>
            </article>
            <div className='containerOptions'>
            {gameOptionsList.map((item, index)=>{
              return(
              <button className='buttonOptions' key={index}
              onClick={()=>handlePlay(index)} disabled={unlocked}>
                  <img src={`${item}.png`} alt='item'/>
              </button>
              )
            })}
            </div>
          </section>      
      </main>
      <ToastContainer
position="bottom-center"
autoClose={2000}
limit={1}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
    </>
  );
}

export default App;
