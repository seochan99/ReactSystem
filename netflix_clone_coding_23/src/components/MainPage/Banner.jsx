import { useEffect, useState } from "react"
import axios from "../../api/axios"
import requests from "../../api/requests"
import {
    BannerContainer, BannerContents, BannerTitle, BannerButton, BannerPlay, BannerInfo, BannerDes, BannerFadeBottom, BannerPlayContainer, BannerIframe
} from './Styled'

export default function Banner() {
    
    const [movie, setMovie] = useState([])
    const [isClicked, setIsClicked] = useState(false)

    useEffect(()=>{
        fetchMovie()
    },[])

    // 여기 세션때 시킬거
    const fetchMovie = async() => {

        // 현재 상영 중인 영화 정보 가져오기
        const request = await axios.get(requests.fetchNowPlaying)
        const movieId = request.data.results[
            Math.floor(Math.random() * request.data.results.length)
        ].id

        //특정 영화의 더 상세한 정보 가져오기 
        const {data : movieDetail} = await axios.get(`movie/${movieId}`,{
            params:{append_to_response:"videos"},
        });
        setMovie(movieDetail)
    }

    const truncate = (str,n)=>{
        return str?.length > n ? str.substr(0,n-1) + "...": str 
    }
    
    if(!isClicked) {
        return(
            <BannerContainer
                movie={movie.backdrop_path}
                style={{backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
            }}
            >
                <BannerContents>
                    <BannerTitle>
                    {movie.title || movie.name || movie.original_name}
                    </BannerTitle>
                    <BannerButton>
                        <BannerPlay onClick={()=>setIsClicked(true)}>Play</BannerPlay>
                        <BannerInfo>More Information</BannerInfo>
                    </BannerButton>
                    <BannerDes>{truncate(movie?.overview,100)}</BannerDes>
                </BannerContents>
                <BannerFadeBottom />
            </BannerContainer>
        )
    } else {
        return(
            <BannerPlayContainer>
                <BannerIframe
                    width="640"
                    height="360"
                    src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=&autoplay=1&mute=1&playlist=${movie.videos.results[0].key}`}
                    title="YouTube video player" 
                    frameborder="0" 
                    allow=" autoplay; fullscreen" allowfullscreen
                    onEnded={()=>setIsClicked(false)}
                />
            </BannerPlayContainer>
    )}
}