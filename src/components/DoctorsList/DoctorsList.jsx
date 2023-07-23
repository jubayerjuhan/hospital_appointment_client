import { useEffect, useState } from "react";
import client from "../../client/client";
import DoctorCard from "../DoctorCard/DoctorCard";

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    getDoctors();
  }, []);

  const getDoctors = async () => {
    const { data } = await client.get("doctor/list");
    setDoctors(data.doctors);
  };

  return (
    <div className="d-flex flex-wrap" style={{ gap: "30px" }}>
      {doctors.map((doctor, key) => {
        return (
          <>
            <DoctorCard doctor={doctor} key={key} />
          </>
        );
      })}
    </div>
  );
};

export default DoctorsList;
