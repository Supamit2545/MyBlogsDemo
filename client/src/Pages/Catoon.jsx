import React, { useState , useEffect } from 'react'
import '../Styles/Catoon.css'
import Anime from './catoons/Anime'
import Manga from './catoons/Manga'
import Novel from './catoons/Novel'

const Catoon = () => {
  const [catoontab , setCatoontab] = useState(1)
  
  const ActiveCtab = (index) =>{
    setCatoontab(index)
    localStorage.setItem("CatoonTab" , index)
  }
  function initializeTab() {
    const saveTab = localStorage.getItem('CatoonTab');
    const activeindex = saveTab ? parseInt(saveTab, 10) : 0;

    setCatoontab(activeindex);
  }

  useEffect(()=>{
      initializeTab()
  },)
  return (
    <div className='Catoon-Container'>
      <div className='Catoon-Header'>
        <div className="Catoon-nav">
          <ul className='Catoon-cat flex justify-around py-5'>
            <button className={`catoon-tab ${catoontab === 1 ? "active":""}`} onClick={(e)=>{ActiveCtab(1)}}>Anime</button>
            <button className={`catoon-tab ${catoontab === 2 ? "active":""}`} onClick={(e)=>{ActiveCtab(2)}}>Manga</button>
            <button className={`catoon-tab ${catoontab === 3 ? "active":""}`} onClick={(e)=>{ActiveCtab(3)}}>Novel</button>
          </ul>
        </div>
      </div>
      <div className='Catoon-Body'>
        <div className={`Catoon-contents ${catoontab === 1 ? "active":""}`}>
          <Anime/>
        </div>
        <div className={`Catoon-contents ${catoontab === 2 ? "active":""}`}>
          <Manga/>
        </div>
        <div className={`Catoon-contents ${catoontab === 3 ? "active":""}`}>
          <Novel/>
        </div>
      </div>
      <div className='Catoon-Footer '></div>
    </div>
  )
}

export default Catoon