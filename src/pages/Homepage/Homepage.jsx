import { useEffect, useState } from "react";
import client from "../../client/client";
import Navbar from "../../components/Navbar/Navbar";
import HeroSection from "../../components/HeroSection/HeroSection";

const Homepage = () => {
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    getDoctors();
  }, []);

  const getDoctors = async () => {
    const { data } = await client.get("doctor/list");
    setDoctors(data.doctors);
  };
  return (
    <div>
      <Navbar />
      <HeroSection />
      {/* {doctors.map((doctor, key) => {
        return <p key={key}>{doctor.name}</p>;
      })} */}
    </div>
  );
};

export default Homepage;
