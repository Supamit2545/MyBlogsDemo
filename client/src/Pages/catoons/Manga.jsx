import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AOS from 'aos';
import { IoSearchCircle } from "react-icons/io5";
import '../../Styles/Anime.css';
import 'aos/dist/aos.css';

const Manga = () => {
    const [Anime, setAnime] = useState([])
    const [PopAnimes, setPopAnime] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        AOS.init({});
        axios.get('https://api.jikan.moe/v4/top/anime?filter-bypopularity')
            .then((res) => {
                setAnime(res.data.data)
            })
            .catch((err) => { console.log(err) })
    }, [])
    useEffect(() => {
        PopsAnime();
    }, [])
    function PopsAnime() {
        const PopsAnimw = Anime.sort((a, b) => b.popularity - a.popularity);
        const PopAnime = PopsAnimw.slice(0, 5)
        setPopAnime(PopAnime)
    }
    return (
        <div className='anime-container'>
            <div className='anime-header'>
                {/* <div className='anime-pops'>
                <p className='text-4xl font-bold font-mono ml-20 mt-10'>Anime Popular</p>
                <div className='my-10'>
                    <div className='anime-pop-cards'>
                        {PopAnimes.map((pops,index)=>(
                            <div data-aos="zoom-in" className='pop-anime-cards'>
                            <img className='anime-pops-img rounded-2xl' src={pops.images.jpg.image_url} alt=""/>
                            <div className='text-xl font-bold'>{pops.title}</div>
                        </div>
                        ))}
                    </div>
                </div>
            </div> */}
            </div>
            <div className='anime-body'>
                <p className='text-center font-bold font-mono text-4xl'>Manga</p>
                <p className='text-2xl text-center text-red-500 font-bold'>!This Test Only!</p>
                <div className='anime-search'>
                    <input className='anime-search-input' type="text" name="" id="" placeholder='Manga name...' onChange={(e) => { setSearch(e.target.value) }} />
                    <button className='anime-search-btn'><IoSearchCircle /></button>
                </div>
                <div className="anime-card-box">
                    {Anime.filter((val) => {
                        return search.toLowerCase() === '' ? val : val.title.toLowerCase().includes(search)
                    }).map((val, index) => (
                        <div data-aos="zoom-in" className='anime-cards'>
                            <img className='img-anime rounded-2xl' src={val.images.jpg.image_url} alt="" width={150} />
                            <div className='text-xl font-bold'>{val.title}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="anime-footer"></div>
        </div>
    )
}

export default Manga