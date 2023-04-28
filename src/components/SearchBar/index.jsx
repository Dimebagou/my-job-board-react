import Button from '../Button';
import { useState } from 'react';
import './index.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SearchBar() {
    const [query1, setQuery1] = useState('');
    const [query2, setQuery2] = useState('');
    const [query3, setQuery3] = useState(null);

    const handleQuery1Change = (event) => {
        setQuery1(event.target.value);
    };

    const handleQuery2Change = (event) => {
        setQuery2(event.target.value);
    };

    const handleQuery3Change = (event) => {
        if (event.target.checked) {
            setQuery3("Full Time");
        } else {
            setQuery3(null);
        }
    };

    const handleSearch = (event) => {
        event.preventDefault();
        const queryParams = [];
        if (query1) {
            queryParams.push(`position=${encodeURIComponent(query1)}`);
        }
        if (query2) {
            queryParams.push(`location=${encodeURIComponent(query2)}`);
        }
        if (query3) {
            queryParams.push(`contract=${encodeURIComponent(query3)}`);
        }
        const queryString = queryParams.join('&');

        if (queryString === '') {
            console.log("Please fill at least one field");
            toast.error('Please fill at least one field')
        } else {

            const url = `/search?${queryString}`;
            window.location.href = url;
        }
    };

    return (
        <>
            <form className="search-bar" onSubmit={handleSearch}>
                <input className='input glass' type="text" placeholder="Filter by title, companies, expertise…" value={query1} onChange={handleQuery1Change} />
                <input className='input map' type="text" placeholder="Filter by location…" value={query2} onChange={handleQuery2Change} />
                <label>
                    <input type="checkbox" onChange={handleQuery3Change} />
                    <span>Full Time Only</span>
                </label>
                <Button type="submit" value="Search" />
            </form>
            <ToastContainer
                style={{ width: "40rem", marginTop: "2rem" }}

                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}

export default SearchBar;
