import React, { useEffect, useState } from 'react'
import swift from './assets/images/swift.png'
import java from './assets/images/java.jpeg'

import react from './assets/images/react.jpeg'
import cote from './assets/images/이코테.jpeg'
import cpp from './assets/images/cpp.png'
import js from './assets/images/js.png'
import nexon from './assets/images/넥슨mod.png'


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


    // 첫 시작시 
    useEffect(()=>{
        const munja = localStorage.getItem("월드컵");
        // 데이터가 없을때..
        if( munja !== null){
            // null이 아닐때 parse진행
            setStat(JSON.parse(munja));
        }
        // 전체 배열에 게임 배열 넣어주기 
        setGame(candidate.map( c =>{
            return {name : c.name, src : c.src, order: Math.random()}
        }).sort((l,r)=>{
            return l.order - r.order;
        }));
    },[])

    // 라운드가 바뀔때마다 처리 
    useEffect(()=>{
        // 게임 배열이 1개 이상이고, 라운드가 게임 배열의 절반보다 크면
        // 빼먹으면 안됨!
        if(game.length>1 && round + 1 > game.length / 2){
            setGame(nextGame);
            setNextGame([]);
            setRound(0);
        }

    },[round])

    // 결승자 출력
    if(game.length === 1){
        localStorage.setItem("월드컵",JSON.stringify(stat));
        return <div style={{textAlign:'center', margin:'100'}}>
            <p>이상형 월드컵 우승</p>
            <img src={game[0].src} style={{width:"30%"}}/><p>{game[0].name}/</p>
            <table>
                {game.map(item =>{
                    return <tr key={item.name}>
                        <td>{item.name}</td>
                        <td>{stat[item.name]}</td>
                    </tr>
                })}
            </table>
            </div>
    }

    if(game.length === 0 || round + 1 > game.length /2) return <div>loading...</div>
    const left = round *2, right = round * 2 + 1;

    const leftFunction = () =>{
        console.log("LEFT FUNCTION");
        
        // 나머지 스탯은 동일
        // 이전꺼에서 한개 업
        setStat({
            ...stat,
            [game[left].name] : prevStat[game[left].name] + 1
        });




        // setStat((prevStat)=> {
        //     prevStat[game[left].name] = prevStat[game[left].name] + 1;
        //     return prevStat;
        // }
        // );


        setNextGame((prev)=>prev.concat(game[left]))
        setRound(round => round + 1);
    }

    const rightFunction = () =>{
        setStat((prevStat)=> 
        {
            prevStat[game[right].name] = prevStat[game[right].name] + 1;
        }
        );
        setNextGame((prev)=> prev.concat(game[right]));
            setRound(round => round + 1);
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