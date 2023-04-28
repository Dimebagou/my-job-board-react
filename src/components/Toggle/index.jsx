import './index.css';


const Toggle = () => {
    return (
        <div className="toggle">
            <img className="themeIcon sun" src="/img/sun.svg" alt="" />
            <label className="switch">
                <input type="checkbox" />
                <span className="slider round"></span>
            </label>
            <img className="themeIcon moon" src="/img/moon.svg" alt="" />
        </div>
    );
};

export default Toggle;