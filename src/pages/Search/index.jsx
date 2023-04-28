import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import CardContainer from '../../components/CardContainer';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './index.css';

const Search = () => {
    const [resultsJobOffers, setResultsJobOffers] = useState(null);
    const [error, setError] = useState(false);
    const queries = useLocation().search;
    console.log(queries);


    useEffect(() => {
        const fetchAllJobOffers = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/search${queries}`);
                const data = await response.json();

                if (!response.ok) {
                    setError(true);
                } else {
                    setResultsJobOffers(data);
                }



            } catch (error) {
                console.log(error);
            }
        }
        fetchAllJobOffers();
    }, []);

    return (

        <div className="results">

            <Header />
            <SearchBar />
            {error && <h1 className='center'>No offer corresponds to your search... Try again</h1>}
            {resultsJobOffers && <CardContainer data={resultsJobOffers} />}
        </div>
    );
}

export default Search