import HeroSection from "../components/hero-section/HeroSection";
import Navbar from "../components/navbar/Navbar";
import FeaturedItems from "../components/featured-items/FeaturedItems";

function HomePage() {
    return (
        <>
            <Navbar/>
            <HeroSection/>
            <FeaturedItems/>
        </>
    );
}

export default HomePage;