import React from 'react'
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
    ]

  return (
    <div style={{textAlign:'center', zoom:0.5, margin:300}}>
        <h1>Worldcup</h1>
        <div style={{display : 'flex', flexDirection:'row' }}>
            <img src={swift} onClick={()=> alert('SWIFT')}/>
            <img src={java} onClick={()=> alert('java')}/>
        </div>
    </div>
  )
}

export default Worldcup