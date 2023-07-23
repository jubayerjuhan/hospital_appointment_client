import { useEffect, useState } from "react";
import client from "../../client/client";
import DoctorCard from "../DoctorCard/DoctorCard";
import ModalComponent from "../ModalComponent/ModalComponent";

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState({});

  const [open, setOpen] = useState(false);

  useEffect(() => {
    getDoctors();
  }, []);

  const getDoctors = async () => {
    const { data } = await client.get("doctor/list");
    setDoctors(data.doctors);
  };

  return (
    <div className="d-flex flex-wrap" style={{ gap: "30px" }}>
      <ModalComponent
        open={open}
        setOpen={setOpen}
        selectedDoctor={selectedDoctor}
      />
      {doctors.map((doctor, key) => {
        return (
          <>
            <DoctorCard
              doctor={doctor}
              key={key}
              setOpen={setOpen}
              setSelectedDoctor={setSelectedDoctor}
            />
          </>
        );
      })}
    </div>
  );
};

export default DoctorsList;
