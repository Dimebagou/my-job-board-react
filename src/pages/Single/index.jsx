import Header from "../../components/Header";
import Button from "../../components/Button";
import Time from "../../components/Time";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './index.css';

const Single = () => {
    const { id } = useParams();
    const [jobOffer, setJobOffer] = useState(null);
    useEffect(() => {
        const fetchOneJobOffer = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/job-offers/${id}`);
                const data = await response.json();
                setJobOffer(data);
            } catch (error) {
                setJobOffer(null)
                console.log(error);
            }
        }
        fetchOneJobOffer()
    }, [id]);

    const updateThisCard = () => {
        window.location.replace(`/update/${jobOffer._id}`);
    }

    if (jobOffer) {

        function goToUrl() {
            alert("cette fonction goToUrl permettra de naviguer sur le site de la compagnie de l'offre via {jobOffer.website}");
        }


        function deleteThisCard(id) {
            if (window.confirm("Voulez-vous vraiment supprimer cette offre ?")) {
                fetch(`http://localhost:8080/api/job-offers/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => {
                        if (response.ok) {
                            window.location.replace(`/`);
                        } else {
                            alert("Offer not deleted!");
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        }

        const applyNow = (mail) => {
            alert("Cette fonction permettra de postuler à l'offre")
        }

        return (
            <div className="single">
                <Header />
                {jobOffer.name ?
                    <div className="error" >
                        <h1>Offer doesn't exist...</h1>
                        <Link to="/"><Button value="Go Home ?" /></Link>
                    </div>
                    :
                    <>
                        <div className="job-header">
                            <div className="logo" style={{
                                backgroundColor: jobOffer.logoBackground
                            }}>
                                <img src={jobOffer.logo} alt="" />
                            </div>
                            <div className="company">
                                <h2>{jobOffer.company}</h2>
                                <p>{jobOffer.website === "#" ? "example.com" : jobOffer.website}</p>
                            </div>
                            <div className="btn-container"><Button onClick={() => goToUrl()} value="Company Site" /></div>
                        </div>
                        <div className="job-details">
                            <div className="job-details-header">
                                <div className="job-details-header-title">
                                    <Time time={jobOffer.postedAt} contract={jobOffer.contract} />
                                    <h1>{jobOffer.position}</h1>
                                    <p>{jobOffer.location}</p>
                                </div>
                                <div className="btn-container"><Button onClick={() => applyNow(jobOffer.apply)} value="Apply Now" /></div>
                            </div>
                            <div className="job-description">
                                <p>{jobOffer.description}</p>
                            </div>
                            <h2 className="requirements">Requirements</h2>
                            <p className="requirements-content">{jobOffer.requirements.content}</p>
                            <ul className="requirements-items">
                                {jobOffer.requirements.items.map((item) => {
                                    return (
                                        <li key={item}>{item}</li>
                                    )
                                })
                                }
                            </ul>
                            <h2 className="job-role">What You Will Do</h2>
                            <p className="job-role-content">{jobOffer.role.content}</p>
                            <ol className="job-role-items">
                                {jobOffer.role.items.map((item) => {
                                    return (
                                        <li key={item}>{item}</li>
                                    )
                                })
                                }
                            </ol>
                            <div className="adminBtns">
                                <div className="btn-container"><Button onClick={() => updateThisCard(jobOffer._id)} value="Update this offer" /></div>
                                <div className="btn-container"><Button onClick={() => deleteThisCard(jobOffer._id)} value="Delete this offer" /></div>
                            </div>
                        </div>
                        <div className="job-footer">
                            <div className="job-footer-content desktop">
                                <h3>{jobOffer.position}</h3>
                                <p>{jobOffer.company}</p>
                            </div>
                            <div className="btn-container"><Button onClick={() => applyNow(jobOffer.apply)} value="Apply Now" /></div>
                        </div>
                    </>
                }
            </div>
        )
    }


}

export default Single