import './index.css';

const Button = (props) => {
    const { onClick, value } = props;
    return (
        <button className='btn' onClick={onClick}>{value}</button>
    )
}

export default Button