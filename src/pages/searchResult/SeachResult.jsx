import React, { useEffect,useState} from 'react'
import './style.scss'
import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import "./style.scss"

import { fetchDataFromApi } from '../../utils/api'
import ContentWrapper from '../../components/contentWrapper/ContentWrapper'
import Spinner from '../../components/spinner/Spinner'
import noResult from "../../assets/no-results.png"
import MovieCard from '../../components/movieCard/MovieCard'

function SeachResult() {
  const [data,setData] = useState(null);
  const [pageNum,setPageNum] = useState(1);
  const [loading,setLoading] = useState(false);
  const {query} = useParams();

  const fetchInitialData = () =>{
       setLoading(true);
       fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
       .then((res)=>{
        setData(res)
        setPageNum((prev) => prev+1)
        setLoading(false);
        
       })
  }

  const fetchNextPageData = ()=>{

       fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
       .then((results)=>{
        if(data?.results){
              setData({...data,results:[
                ...data?.results, ...results?.results
              ]})
        }
        else{
          setData(results);
        }

        setPageNum((prev)=>prev+1);
       })
  }

  useEffect(()=>{
    setPageNum(1);
     fetchInitialData();
  },[query])

  return (
    <div className='searchResultsPage'>
         {loading && <Spinner/>}
         {!loading &&(
          <ContentWrapper>
                  {
                    data?.results.length>0 ?(
                        <>
                         <div className="pageTitle">
                          {`Search ${data?.total_results>1? "results":"result"} for '${query}'`}
                         </div>

                         <InfiniteScroll className='content' dataLength={data?.results?.length || []} next={fetchNextPageData} hasMore={pageNum <= data?.total_pages} loader={<Spinner/>}>
                          {data?.results?.map((item,index)=>{
                            if(item.media_type === "person"){
                              return ;
                            }
                            else{
                              return (
                                <MovieCard key={index} data={item} fromSearch={true}/>
                              )
                            }
                          })}
                         </InfiniteScroll>
                        </>
                    ): <span className="resultNotFound">Sorry, Results not found </span>
                    
                  }

          </ContentWrapper>
         )}
    </div>
  )
}

export default SeachResult