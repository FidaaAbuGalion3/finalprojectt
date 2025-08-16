import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ServiceImg from "../assets/img2.jpg";

export default function Service() {

    return (
        <>



            <Hero
                cName="heroMid"
                heroImg={ServiceImg}
                title="Service"
                btnClass="hide"

            />
        </>
    )
}