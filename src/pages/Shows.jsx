import React,{ useState,useEffect } from 'react'
import "../styles/Shows.css"
import {Link ,useParams} from 'react-router-dom'
export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
  });
const Shows = () => {
    const {id} = useParams();
    const [status, setStatus] = useState("")
    const [shows, setShows] = useState([])

    useEffect(() => {
    const showShows=async()=>{
        setStatus(STATUSES.LOADING)
        try {
            const res= await fetch(`https://api.tvmaze.com/shows/${id}`)
            const data = await res.json()
        setShows([data])
        setStatus(STATUSES.IDLE)
        } catch (error) {
        console.log(error);
        setStatus(STATUSES.ERROR)
        }
    }
    showShows()
  }, [id])
if (status === STATUSES.LOADING) {
    return <h2 style={{fontSize:"5rem"}}>Loading....</h2>;
}
if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
}
  return (
    <>
        {
            shows.map((e)=>{
                function createMarkup() {return {__html: e.summary}}
                return(
                    <div className="container_p" key={e.id}>
                        <div className="imgBox">
                            <img src={e.image.original} alt="show"/>
                        </div>
                        <div className="aboutBox">
                            <h1 className="title_p">{e.name}</h1>
                            <h2 className="lan_p">{e.language}</h2>
                            <h3 className="desc_p" dangerouslySetInnerHTML={createMarkup()}></h3>
                            <h2 className="status_p">Status: {e.status}</h2>
                            <button className="btn_p"><a href={e.url}>Watch Now</a></button>
                            <Link to="/" className='btn2_p'>Go Back</Link>
                        </div>
                    </div>
                )
            })
        }
    </>
  )
}

export default Shows