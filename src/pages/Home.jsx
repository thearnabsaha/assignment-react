import React,{ useState,useEffect } from 'react'
import Footer from '../Components/Footer'
import {Link} from 'react-router-dom'
import "../styles/Home.css"
export const STATUSES = Object.freeze({
  IDLE: 'idle',
  ERROR: 'error',
  LOADING: 'loading',
});
const Home = () => {
  const [shows, setShows] = useState([])
  const [status, setStatus] = useState("")
  useEffect(() => {
    const showShows=async()=>{
      setStatus(STATUSES.LOADING)
      try {
        const res= await fetch("https://api.tvmaze.com/search/shows?q=all")
        const data = await res.json()
        setShows(data)
        setStatus(STATUSES.IDLE)
      } catch (error) {
        console.log(error);
        setStatus(STATUSES.ERROR)
      }
    }
    showShows()
  }, [])
    if (status === STATUSES.LOADING) {
        return <h2 style={{fontSize:"5rem"}}>Loading....</h2>;
    }
    if (status === STATUSES.ERROR) {
        return <h2>Something went wrong!</h2>;
    }
  return (
    <>
      <h1 className='heading'>Welcome to Shows 24</h1>
      <div className='container'>
        {
          shows.map((e)=>{
            return(
              <div key={e.show.id} className="show">
                <img src={e.show.image.original } alt="show" className='showImg'/>
                <h1 className='showTitle'>{e.show.name}</h1>
                <h2 className='showPrice'>Genre: {[...e.show.genres].join(",")}</h2>
                <button className='btn'><Link to={`/${e.show.id}`} >View Summary</Link></button>
              </div>
            )
          })
        }
      </div>
      <Footer/>
    </>
  ) 
}

export default Home