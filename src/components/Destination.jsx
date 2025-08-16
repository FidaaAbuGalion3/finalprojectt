import DestinationData from "./DestinationData";
import "./DestinationStyles.css"
import Img1 from "../assets/safari.png";
import Img2 from "../assets/imgOne.jpg";

const Destination = () =>{
    return (

        <div className="destination">
            <h1>Popular Destination</h1>
            <p> tourasssssssss dlkaf kdfl fdsll flfl aldjc csff</p>

            <DestinationData
                className="firstDes"
                heading="Destination"
                text="Destination fs"

                img1={Img1}
                img2={Img2}
            />

            <DestinationData
                className="firstDesReverse"
                heading="Destination"
                text="Destination fs"

                img1={Img1}
                img2={Img2}
            />


        </div>

    )
}
export default Destination;