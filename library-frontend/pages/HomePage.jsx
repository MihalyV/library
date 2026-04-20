import HeroSection from "../components/hero-section/HeroSection";
import Navbar from "../components/navbar/Navbar";
import FeaturedItems from "../components/featured-items/FeaturedItems";
import WhyUs from "../components/why-us-section/WhyUs";
import RegistrationSection from "../components/registration-section/RegistrationSection";
import Footer from "../components/footer/Footer";

function HomePage() {
    return (
        <>
            <HeroSection/>
            <FeaturedItems/>
            <WhyUs/>
            <RegistrationSection/>
        </>
    );
}

export default HomePage;