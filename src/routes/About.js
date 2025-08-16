import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AboutImg from "../assets/img5.jpg";

export default function About() {

    return (
        <>


                <Hero
                    cName="heroMid"
                    heroImg={AboutImg}
                    title="About Us"

                    btnClass="hide"

                />

        </>
    )
}