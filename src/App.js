import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/search.css';
import axios from 'axios';
import './css/movielist.css';
import MovieCard from './Components/MovieCard';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';


function App() {
    const [movies, setMovies] = useState([]);
    const [search_movie, setSearctMovie] = useState('')

    // pagination
    const [current_page, setCurrentPage] = useState(1)
    const [total_page, setTotalPage] = useState(0)
    const [year, setYear] = useState(2022)
    const [language, setLanguage] = useState('en')

    const base_API_URL = 'https://api.themoviedb.org/3/'
    const discover = 'discover'
    const API_KEY = 'df66830aefe6dae29343993ebfe45c4c';

    const fetchMovies = async (search_movie) => {
        console.log('current page value from api', current_page)
        let type = (search_movie) ? 'search' : discover;

        let result = await axios(`${base_API_URL}${type}/movie`,
            {
                params: {
                    api_key: API_KEY,
                    page: current_page,
                    query: search_movie,
                    year: year,
                    language: language
                }

            })

        let { results } = result.data
        setMovies(results)
        setTotalPage(result.data.total_pages)
    }

    useEffect(() => {
        fetchMovies()
    }, []);


    const searchMovie = (e) => {
        let search_name = e.target.value.trim()

        if (search_name.length >= 3) {
            setSearctMovie(search_name)
            fetchMovies(search_name)
        } else if(search_name.length == 0){
            setSearctMovie('')
        }
    }
    useEffect(() => {
        fetchMovies()
    }, [search_movie]);

    // handle pagination

    function handlePageClick({ selected: selectedPage }) {
        // debugger;
        let current_page_value = selectedPage + 1
        console.log('current page from set function ', current_page_value)
        setCurrentPage(current_page_value);
        
        console.log('current page', current_page)
        fetchMovies()
    }
    // useEffect(()=>{
    // },[current_page])


    return (
        <div className="App">
            <div className="wrapper">
                <div className="container">
                    <form role="search" method="get" className="search-form form" action="">
                        <label>
                            <input type="search" className="search-field" onChange={searchMovie} placeholder="Search Movie..." />
                        </label>
                    </form>
                </div>
            </div>
            <div className='filter mb-4'>
                <h2 className=''>Filter</h2>
                <div className='d-flex'>
                    <div className='col-sm-6'>
                        <select className='form-control' onChange={(e)=>{setYear(e.target.value); fetchMovies()}}>
                            <option selected="true" disabled>Select Year</option>
                            <option value="2022">2022</option>
                            <option value="2021">2021</option>
                            <option value="2020">2020</option>
                        </select>
                    </div>
                    <div className='col-sm-6'>
                        <select className='form-control' onChange={(e)=>{setLanguage(e.target.value); fetchMovies()}}>
                            <option selected="true" disabled>Select Language</option>
                            <option value="en">English</option>
                            <option value="hi">Hindi</option>
                            <option value="ko">Korean</option>
                        </select>
                    </div>
                </div>
            </div>
            {
                movies.map(movies_item =>
                    <MovieCard key={movies_item.id} movie={movies_item} />
                )
            }
            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={total_page}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
            />
        </div>
    );
}

export default App;
