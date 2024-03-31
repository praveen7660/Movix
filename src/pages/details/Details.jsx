import React from 'react'
import './style.scss'
import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router-dom';
import DetailsBanner from './detailsBanner/DetailsBanner';
import Cast from './cast/Cast';
import VideosSection from './videoSection/VideoSection';
import Similar from './carousels/Similar';
import Recommendation from './carousels/Recommendations';


function Details() {

  const {mediaType, id} = useParams();
  const {data,loading} = useFetch(`/${mediaType}/${id}/videos`);
  const {data : credits, loading: creditLoading} = useFetch(`/${mediaType}/${id}/credits`)
  
 
  return (
    <div>
        <DetailsBanner video={data?.results?.[0]} crew={credits?.crew}/>

        <Cast data={credits?.cast} loading={creditLoading}></Cast>
        <VideosSection data={data} loading={loading}/>
        <Similar mediaType={mediaType} id={id}></Similar>
        <Recommendation mediaType={mediaType} id={id}></Recommendation>
    </div>
  )
}

export default Details