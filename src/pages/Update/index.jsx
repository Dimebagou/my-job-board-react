import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Header from "../../components/Header";
import './index.css';

/* je n'ai pas réussi à faire fonctionner l'update sur requirements et role avec les items */

const Update = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [jobOffer, setJobOffer] = useState(null);

    const [company, setCompany] = useState("");
    const [logo, setLogo] = useState("");
    const [logoBackground, setLogoBackground] = useState("");
    const [website, setWebsite] = useState("");
    const [apply, setApply] = useState("");
    const [position, setPosition] = useState("");
    const [location, setLocation] = useState("");
    const [contract, setContract] = useState("Part Time");
    const [description, setDescription] = useState("");
    const [requirementsContent, setRequirementsContent] = useState("")
    const [requirementsItems1, setRequirementsItems1] = useState("");
    const [requirementsItems2, setRequirementsItems2] = useState("");
    const [requirementsItems3, setRequirementsItems3] = useState("");
    const [requirementsItems4, setRequirementsItems4] = useState("");
    const [roleContent, setRoleContent] = useState("");
    const [roleItems1, setRoleItems1] = useState("");
    const [roleItems2, setRoleItems2] = useState("");
    const [roleItems3, setRoleItems3] = useState("");
    const [roleItems4, setRoleItems4] = useState("");


    useEffect(() => {
        const fetchOneJobOffer = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/job-offers/${id}`);
                const data = await response.json();
                setJobOffer(data);
                setCompany(data.company);
                setLogo(data.logo);
                setLogoBackground(data.logoBackground);
                setWebsite(data.website);
                setApply(data.apply);
                setPosition(data.position);
                setLocation(data.location);
                setContract(data.contract);
                setDescription(data.description);
                setRequirementsContent(data.requirements.content);
                setRequirementsItems1(data.requirements.items[0] ? data.requirements.items[0] : "");
                setRequirementsItems2(data.requirements.items[1] ? data.requirements.items[1] : "");
                setRequirementsItems3(data.requirements.items[2] ? data.requirements.items[2] : "");
                setRequirementsItems4(data.requirements.items[3] ? data.requirements.items[3] : "");
                setRoleContent(data.role.content);
                setRoleItems1(data.role.items[0] ? data.role.items[0] : "");
                setRoleItems2(data.role.items[1] ? data.role.items[1] : "");
                setRoleItems3(data.role.items[2] ? data.role.items[2] : "");
                setRoleItems4(data.role.items[3] ? data.role.items[3] : "");
            } catch (error) {
                setJobOffer(null);
                console.log(error);
            }
        };
        fetchOneJobOffer();

    }, [id]);


    


    const handleSubmit = (event) => {
        event.preventDefault();
        let arrayRequirements = [];
        if (requirementsItems1 !== "") { arrayRequirements.push(requirementsItems1) }
        if (requirementsItems2 !== "") { arrayRequirements.push(requirementsItems2) }
        if (requirementsItems3 !== "") { arrayRequirements.push(requirementsItems3) }
        if (requirementsItems4 !== "") { arrayRequirements.push(requirementsItems4) }

        let arrayRole = [];
        if (roleItems1 !== "") { arrayRole.push(roleItems1) }
        if (roleItems2 !== "") { arrayRole.push(roleItems2) }
        if (roleItems3 !== "") { arrayRole.push(roleItems3) }
        if (roleItems4 !== "") { arrayRole.push(roleItems4) }

        const updatedJobOffer = {
            company: company,
            logo: logo,
            logoBackground: logoBackground,
            website: website,
            apply: apply,
            position: position,
            location: location,
            contract: contract,
            description: description,
            requirements: {
                content: requirementsContent,
                items: arrayRequirements
            },
            role: {
                content: roleContent,
                items: arrayRole
            }
        };

        fetch(`http://localhost:8080/api/job-offers/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedJobOffer)
        })
            .then(response => {
                if (response.ok) {
                    alert("Offer updated!");
                    navigate(`/job-offer/${id}`);
                } else {
                    alert("Offer not updated!");
                }
            })
            .catch(error => {
                console.log(error);
            })
    };

    if (jobOffer) {
        return (
            <div className="update">
                <Header />
                <form onSubmit={handleSubmit}>
                    <h1>Update this offer :</h1>
                    <div className="form-group">
                        <label htmlFor="company">Company :</label>
                        <input type="text" id="company" value={company} onChange={(e) => setCompany(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="logo">Logo URL :</label>
                        <input type="text" id="logo" value={logo} onChange={(e) => setLogo(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="logoBackground">Logo Background Color :</label>
                        <input type="text" id="logoBackground" value={logoBackground} onChange={(e) => setLogoBackground(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="website">Company Website :</label>
                        <input type="text" id="website" value={website} onChange={(e) => setWebsite(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="apply">Apply URL :</label>
                        <input type="text" id="apply" value={apply} onChange={(e) => setApply(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="position">Job Position :</label>
                        <input type="text" id="position" value={position} onChange={(e) => setPosition(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Country :</label>
                        <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="contract">Full Time :</label>
                        <input type="checkbox" id="contract" checked={contract === "Full Time"} value={contract} onChange={(e) => setContract(e.target.checked ? "Full Time" : "Part Time")} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description :</label>
                        <textarea id="description" cols="30" rows="5" value={description} onChange={(e) => setDescription(e.target.value)} required/>
                    </div>
                    <h2>Requirements :</h2>
                    <div className="form-group">
                        <label htmlFor="requirements-content">Requirements Description :</label>
                        <textarea id="requirements-content" cols="30" rows="5" value={requirementsContent} onChange={(e) => setRequirementsContent(e.target.value)} required></textarea>
                    </div>
                    <div className="form-group requirementsAndRoleItems">
                        <label htmlFor="requirements-item">Requirements Items :</label>
                        <input type="text" id="requirements-item" cols="30" rows="5" value={requirementsItems1} onChange={(e) => setRequirementsItems1(e.target.value)} required/>
                        <input type="text" id="requirements-item" cols="30" rows="5" value={requirementsItems2} onChange={(e) => setRequirementsItems2(e.target.value)} />
                        <input type="text" id="requirements-item" cols="30" rows="5" value={requirementsItems3} onChange={(e) => setRequirementsItems3(e.target.value)} />
                        <input type="text" id="requirements-item" cols="30" rows="5" value={requirementsItems4} onChange={(e) => setRequirementsItems4(e.target.value)} />
                    </div>
                    <h2>Role :</h2>
                    <div className="form-group">
                        <label htmlFor="role-content">Role Description :</label>
                        <textarea id="role-content" cols="30" rows="5" value={roleContent} onChange={(e) => setRoleContent(e.target.value)} required></textarea>
                    </div>
                    <div className="form-group requirementsAndRoleItems">
                        <label htmlFor="role-item">Role Items :</label>
                        <input type="text" id="role-item" cols="30" rows="5" value={roleItems1} onChange={(e) => setRoleItems1(e.target.value)} required/>
                        <input type="text" id="role-item" cols="30" rows="5" value={roleItems2} onChange={(e) => setRoleItems2(e.target.value)} />
                        <input type="text" id="role-item" cols="30" rows="5" value={roleItems3} onChange={(e) => setRoleItems3(e.target.value)} />
                        <input type="text" id="role-item" cols="30" rows="5" value={roleItems4} onChange={(e) => setRoleItems4(e.target.value)} />
                    </div>

                    <div className="btn-container">
                        <Button type="submit" value="Update" />
                    </div>
                </form>
            </div>
        )
    }
    else {
        return (
            <div className="update">
                <Header />
                <p>Loading...</p>
            </div>
        );
    }
};

export default Update;



