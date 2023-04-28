import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import CardContainer from '../../components/CardContainer';
import { useState, useEffect } from 'react';



const Home = () => {
    const [allJobOffers, setAllJobOffers] = useState(null);

    useEffect(() => {
        const fetchAllJobOffers = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/job-offers');
                const data = await response.json();
                
                setAllJobOffers(data);
                
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllJobOffers();
    }, []);

    return (
        <div className="home">
            <Header />
            <SearchBar />
            {allJobOffers && <CardContainer data={allJobOffers}/>}
        </div>
    );
}

export default Home