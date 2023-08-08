const requests={
    fetchNowPlaying: "movie/now_playing",
    fetchNetflixOriginals:"/discover/tv?with_networks=213",
    fetchTrending:"/trending/all/week",
    fetchTopRated:"/movie/top_rated",
    fetchActionMovies:"/discover/movie?with_genres=28",
    fetchComedyMovies:"/discover/movie?with_genres=35",
    fetchHorroryMovies:"/discover/movie?with_genres=27",
    fetchRomanceMovies:"/discover/movie?with_genres=10749",
    fetchDocumentaries:"/discover/movie?with_genres=99",
}

export default requests; //다른파일에도 사용 가능하게 하기 
