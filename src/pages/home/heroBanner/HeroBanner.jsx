import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './style.scss'
import useFetch from '../../../hooks/useFetch';
import { useSelector } from 'react-redux';
import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

function HeroBanner() {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home);
    const { data, loading } = useFetch("/movie/upcoming");

    useEffect(() => {
        const bg = url?.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path
        setBackground(bg);
    }, [data]);

    //so here we will only run the functionality 
    //  when the enter key is pressed
    //  here is an optimization assignment do it on every keyup and apply throttling
    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
        }
    }

    const clickHandler = ()=>{
        if(query.length>0){
            navigate(`/search/${query}`);
        }
    }
    return (
        <div className="heroBanner">
            {!loading && <div className='backdrop-img'>
                <Img src={background} />
            </div>}

            <div className="opacity-layer">
                
            </div>
            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className="title">Welcome.</span>
                    <span className="subTitle">Millions of movies, TV shows and people to discover.
                        Explore now.</span>

                    <div className="searchInput">
                        <input type="text"
                            placeholder="Search for a movie or tv show..."
                            value={query}
                            onChange={(e) => { setQuery(e.target.value) }}
                            onKeyUp={searchQueryHandler}
                        />

                        <button onClick={clickHandler}>
                            Search
                        </button>
                    </div>
                </div>

            </ContentWrapper>

        </div>
    )
}

export default HeroBanner