import "./herosection.css";
import heroImage from "../../assets/doctor-holding-something-white-background_1368-5813-removebg-preview.png";

const HeroSection = () => {
  return (
    <div className="sectionPadding herosection">
      <div className="cta_section">
        <h3 className="hero_title text-primary">
          Healthcare at Your Fingertips
        </h3>
        <p className="hero_subtitle text-muted">
          Find and Schedule Appointments with Top Specialists
        </p>

        <button className="cta_btn btn-primary">Book Appointment</button>
      </div>
      <div className="image_section">
        <img src={heroImage} alt="doctor" />
      </div>
    </div>
  );
};

export default HeroSection;
