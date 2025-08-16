import Hero from "../components/Hero";
import heroImg from "../assets/img1.jpg"
import Destination from "../components/Destination";



export default function Home() {

    return (
        <>

            <Hero
                cName="hero"
                heroImg={heroImg}
                title="Your Journey Your Story"
                text="Choose your journey"
                buttonText="Plan Travel"
                url="/travel-plan"
                btnClass="show"
            />


            <Destination />

        </>

    )
}