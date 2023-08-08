import React, { useEffect, useReducer, useState } from 'react'
import swift from './assets/images/swift.png'
import java from './assets/images/java.jpeg'

import react from './assets/images/react.jpeg'
import cote from './assets/images/이코테.jpeg'
import cpp from './assets/images/cpp.png'
import js from './assets/images/js.png'
import nexon from './assets/images/넥슨mod.png'
import { useRecoilState } from 'recoil'
import { EpisodeStore } from './store/episode'






// reducer
function reducer(state, action) {
    if(action.type === "StartGame"){
        return {
            ...state, // 기존에 있던것들을 복사
            game : action.value,// 게임만 바꿔줌
        }
    }else if(action.type === "leftClick"){
        // game의 마지막 경기인지 아닌지 확인
        if(state.game.length > 1 && state.round + 1 > state.game.length / 2){
            return{
                ...state,
                round : 0,
                nextGame : [],
                game : state.nextGame.concat(state.game[action.value]),
                stat:{
                    ...state.stat,
                    [state.game[action.value].name] : state.stat[state.game[action.value].name] + 1
                },
            }
        }
        // 마지막 경기가 아닐때
        else{
            return {
                ...state,
                round : state.round + 1,
                nextGame : state.nextGame.concat(state.game[action.value]),
                stat:{
                    ...state.stat,
                    [state.game[action.value].name] : state.stat[state.game[action.value].name] + 1
                }
            };
        }
    }
    return state;
}

function Worldcup() {
    // 사진 후보
    const candidate=[
        {name:"swift", src:swift},
        {name:"java", src:java},
        {name:"react", src:react},
        {name:"cote", src:cote},
        {name:"cpp", src:cpp},
        {name:"js", src:js},
        {name:"nexon", src:nexon},
        {name:"jss", src:js},
    ]

    const initialState={
        "swift" : 0,
        "java" : 0,
        "react" : 0,
        "cote" : 0,
        "cpp" : 0,
        "js" : 0,
        "nexon" : 0,
        "jss" : 0,
    };

    // 게임 배열 
    const [game,setGame] = useState([]);
    // 라운드
    const [round,setRound] = useState(0);

    // 다음 게임 배열
    const [nextGame,setNextGame] = useState([]);

    // 
    const [stat,setStat] = useState({
        "swift" : 0,
        "java" : 0,
        "react" : 0,
        "cote" : 0,
        "cpp" : 0,
        "js" : 0,
        "nexon" : 0,
        "jss" : 0,
    });


    // (state: any, action: any)
    //
    const [state,dispach] = useReducer(reducer,initialState)



    // 전역 상태 활용
    const[epi,setEpi]=useRecoilState(EpisodeStore);


    // 첫 시작시 
    useEffect(()=>{
        setEpi(1);
        const munja = localStorage.getItem("월드컵");
        // 데이터가 없을때..
        if( munja !== null){
            // null이 아닐때 parse진행
            setStat(JSON.parse(munja));
        }
        const suffledCandidate = candidate.map(c=>{
            return {name : c.name, src : c.src, order: Math.random()}
        }).sort((l,r)=>{
            return l.order - r.order;
        });
        
        dispach({
            type:"StartGame",
            value:suffledCandidate,
        });


        // 전체 배열에 게임 배열 넣어주기 
    //     setGame(candidate.map( c =>{
    //         return {name : c.name, src : c.src, order: Math.random()}
    //     }).sort((l,r)=>{
    //         return l.order - r.order;
    //     }));
    // },[])
    },[])



    epi 
    useEffect(()=>{
            if(epi===1) document.title = "1";
            else if (epi===2) document.title = "2";
            else if (epi>3) document.title = "3보다큼";
    },[epi])

    // 라운드가 바뀔때마다 처리 
    useEffect(()=>{
        // 게임 배열이 1개 이상이고, 라운드가 게임 배열의 절반보다 크면
        // 빼먹으면 안됨!
        if(state.game.length>1 && round + 1 > state.game.length / 2){
            setGame(nextGame);
            setNextGame([]);
            setRound(0);
        }

    },[round])

    // 결승자 출력
    if(state.game.length === 1){
        localStorage.setItem("월드컵",JSON.stringify(state.stat));
        return <div style={{textAlign:'center', margin:'100'}}>
            <p>이상형 월드컵 우승</p>
            <img src={state.game[0].src} style={{width:"30%"}}/><p>{state.game[0].name}/</p>
            <table>
                {state.game.map(item =>{
                    return <tr key={item.name}>
                        <td>{item.name}</td>
                        <td>{state.stat[item.name]}</td>
                    </tr>
                })}
            </table>
            </div>
    }

    if(state.game.length === 0 || state.round + 1 > state.game.length /2) return <div>loading...</div>
    const left = state.round *2, right = state.round * 2 + 1;

    const leftFunction = () =>{
        dispach({type:"leftClick", value:left})
        console.log("LEFT FUNCTION");
        
        // 나머지 스탯은 동일
        // 이전꺼에서 한개 업
        // setStat({
        //     ...stat,
        //     [game[left].name] : prevStat[game[left].name] + 1
        // });
        // setNextGame((prev)=>prev.concat(game[left]))
        // setRound(round => round + 1);
    }



        // setStat((prevStat)=> {
        //     prevStat[game[left].name] = prevStat[game[left].name] + 1;
        //     return prevStat;
        // }
        // );


 

    const rightFunction = () =>{
        dispach({type:"rightClick", value:right});
        // setStat((prevStat)=> 
        // {
        //     prevStat[game[right].name] = prevStat[game[right].name] + 1;
        // }
        // );
        // setNextGame((prev)=> prev.concat(game[right]));
        //     setRound(round => round + 1);
    };

  return (
    <div style={{textAlign:'center', zoom:0.5, margin:300}}>
        <h1>Worldcup {round + 1} / {game.length/2} <b>{game.length === 2 ? "결승" : game.length+"강"}</b></h1>
        <div style={{display : 'flex', flexDirection:'row' }}>
            {/* <imgt src={game[0].src}/>
            error가 발생함 -> 처음에는게임이 빈 배열이기에... game[0]이 없음 */}
      
            <img src={game[left].src} onClick={()=>{
                alert(game[left].name + "를 선택하였습니다.");
                leftFunction();
            }}/>
            
            <img src={game[right].src} onClick={()=>{
                alert(game[right].name + "를 선택하였습니다.");
                rightFunction();
            }}/>

            {/* <img src={swift} onClick={()=> alert('SWIFT')}/>
            <img src={java} onClick={()=> alert('java')}/> */}
        </div>
    </div>
  )
}

export default Worldcup