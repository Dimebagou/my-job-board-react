import './index.css';
import Button from '../Button';
import Time from '../Time';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const CardContainer = (data) => {
    const [max, setMax] = useState(12);
    function loadMore() {
        setMax(prevMax => prevMax + 12);
    }

    if (data) {
        const jobOffers = data.data.slice().reverse()
        return (
            <>
                <div className="card-container">
                    {jobOffers.slice(0, max).map((jobOffer) => {
                        return (

                            <Link to={`/job-offer/${jobOffer._id}`} key={jobOffer._id}>
                                <div className="card" key={jobOffer._id
                                }>
                                    <div className="logo" style={{
                                        backgroundColor: jobOffer.logoBackground
                                    }}>
                                        <img src={jobOffer.logo} alt="" />
                                    </div>
                                    <Time time={jobOffer.postedAt} contract={jobOffer.contract}/>
                                    <h3 className="position">
                                        {jobOffer.position}
                                    </h3>
                                    <p className="company">
                                        {jobOffer.company}
                                    </p>
                                    <p className="country">
                                        {jobOffer.location}
                                    </p>
                                </div>
                            </Link>

                        )
                    })}
                </div>
                <div className="load-more">
                    {max < jobOffers.length ? <Button onClick={loadMore} value="Load More" /> : <p>No more offer...</p>}
                </div>
            </>
        )
    }
}

export default CardContainer