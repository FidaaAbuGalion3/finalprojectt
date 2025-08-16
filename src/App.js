import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from "./routes/Home";
import About from "./routes/About";
import Service from "./routes/Service";
import Contact from "./routes/Contact";
import TravelPlan from "./routes/TravelPlan";
import Navbar from "./components/Navbar";

function App() {
    return (
        <div className="App">
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/service" element={<Service />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/travel-plan" element={<TravelPlan />} />
            </Routes>
        </div>
    );
}

export default App;
