import Axios from "axios"
import { useState, useEffect } from "react";
import Loader from "./Components/Loader";
import Header from "./Components/Header";
import InputField from "./Components/InputField";
import Button from "./Components/Button";


function App() {
    const [generateMovieData, setGenerateMovieData] = useState(null)
    const [title, setTitle] = useState("")
    const [loading, setLoading] = useState(false)
  
    const fetchMovieData = (e) => {
      e.preventDefault();
      setLoading(true)
      Axios.get(`https://www.omdbapi.com/?&t=${title}&apikey=94343e34`).then((res) => {
        setGenerateMovieData(res.data);
        setLoading(false)
      })
    }

    useEffect(() => {
      const detailsSection = document.querySelector('.details-section');
      detailsSection.scrollIntoView({behavior: 'smooth', block: 'start'})
    },[generateMovieData])
  
  return (
    <div>
        <section className="hero-section">
            <Header/>
            <div className="container">
                <h1 className="hero-header">Get information about any movie or series</h1>
                <p className="hero-subheader">Simply enter the movie or series name in the text field below to see the related information</p>
                <form onSubmit={fetchMovieData}>
                  <InputField onChange={(event) => setTitle(event.target.value)}/>
                  <Button></Button>
                </form>
            </div>            
        </section>

        {loading ? <Loader /> :
        <section className="details-section">
        <img className="poster" src={generateMovieData?.Poster} onError="this.style.display='none'"/>
        <div className="info-container">
          <h1>{generateMovieData?.Title}</h1>
          <p>{generateMovieData?.Year}</p>
          <p className="series">{generateMovieData?.Type}</p>
          <p className="plot">{generateMovieData?.Plot}</p>
          {generateMovieData && <p><span>Stars:</span> {generateMovieData?.Actors}</p> }
          {generateMovieData && <p><span>Rating:</span> {generateMovieData?.Ratings[0].Value}</p> }
          {generateMovieData && <p><span>Season(s):</span> {generateMovieData?.totalSeasons}</p> }
          {generateMovieData && <p><span>Released:</span> {generateMovieData?.Released}</p> }       
          {generateMovieData && <p><span>Runtime:</span> {generateMovieData?.Runtime}</p> }
          {generateMovieData && <p><span>Genre(s):</span> {generateMovieData?.Genre}</p> }
          {generateMovieData && <p><span>Language(s):</span> {generateMovieData?.Language}</p> }
          {generateMovieData && <p><span>Writer(s):</span> {generateMovieData?.Writer}</p> }
          {generateMovieData && <p><span>Award(s):</span> {generateMovieData?.Awards}</p> }
          {generateMovieData && <p><span>Director(s):</span> {generateMovieData?.Director}</p> }
          {generateMovieData && <p><span>Rated:</span> {generateMovieData?.Rated}</p> }
        </div>
        </section>}
    </div>
  )
}

export default App