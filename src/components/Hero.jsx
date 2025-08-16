import "./HeroStyles.css";
import { Link } from "react-router-dom";

export default function Hero(props) {
    return (
        <div className={props.cName}>
            <img alt="heroImg" src={props.heroImg} />
            <div className="heroContent">
                <h1>{props.title}</h1>
                <p>{props.text}</p>
                <Link to={props.url} className={props.btnClass}>
                    {props.buttonText}
                </Link>
            </div>
        </div>
    );
}
