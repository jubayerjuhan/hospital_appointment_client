import DoctorsList from "../../components/DoctorsList/DoctorsList";
import Navbar from "../../components/Navbar/Navbar";

const BookAppointment = () => {
  return (
    <>
      <Navbar />
      <div className="sectionPadding">
        <DoctorsList />
      </div>
    </>
  );
};

export default BookAppointment;
