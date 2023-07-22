import { useEffect, useState } from "react";
import client from "../../client/client";

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
      {doctors.map((doctor, key) => {
        return <p key={key}>{doctor.name}</p>;
      })}
    </div>
  );
};

export default Homepage;
