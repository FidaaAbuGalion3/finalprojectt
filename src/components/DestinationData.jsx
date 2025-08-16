import "./DestinationStyles.css"
import {Component} from "react";
import Img1 from "../assets/safari.png";
import Img2 from "../assets/imgOne.jpg";

class DestinationStyles extends Component {
    render() {

        return(

                <div className={this.props.className}>
                    <div className="desText">

                        <h2>{this.props.heading}</h2>
                        <p>{this.props.text}</p>

                    </div>

                    <div className="image">
                        <img alt="img" src={Img1}/>
                        <img alt="img" src={Img2}/>
                    </div>

                </div>



        )

    }
}

export default DestinationStyles;