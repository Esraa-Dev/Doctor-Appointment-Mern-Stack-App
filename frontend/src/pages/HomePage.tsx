import Hero from "../components/Hero";
import SpecialityMenu from "../components/features/SpecialityMenu";
import TopDoctors from "../components/features/TopDoctors";
import Banner from "../components/features/Banner";

const HomePage = () => {
    return (
        <div className="bg-white">
            <Hero />
            <SpecialityMenu/>
            <TopDoctors />
            <Banner />
        </div>
    )
}

export default HomePage