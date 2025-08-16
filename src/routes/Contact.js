import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ContactImg from "../assets/img4.jpg";

export default function Contact() {

    return (
        <>


            <Hero
                cName="heroMid"
                heroImg={ContactImg}
                title="Contact"
                btnClass="hide"

            />
        </>
    )
}