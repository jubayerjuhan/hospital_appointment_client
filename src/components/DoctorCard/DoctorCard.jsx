import "./doctorCard.css";

const DoctorCard = ({ doctor }) => {
  console.log(doctor);
  return (
    <div className="card_wrapper">
      <div className="image_wrapper">
        <img
          src={
            `http://localhost:9000/images/${doctor.picture}` ||
            "placeholder-image.jpg"
          }
          className="card_image"
          alt={doctor.name || "Doctor"}
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">{doctor.name || "Dr. John Doe"}</h5>
        <p className="card-text">
          Specialist in: {doctor.specialistIn || "Cardiology"}
        </p>
        <p className="card-text">
          Experience: {doctor.experience || "10 years"}
        </p>
        <button className="btn btn-primary">Book Appointment</button>
      </div>
    </div>
  );
};

export default DoctorCard;
