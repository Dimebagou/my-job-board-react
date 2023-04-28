import moment from 'moment';
import './index.css';

const Time = ({ time, contract }) => {
    return (
        <div className="time">
            {moment(time).fromNow()}<span className='point'> • </span>{contract}
        </div>
    )
}

export default Time