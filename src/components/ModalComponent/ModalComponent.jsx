import { Modal } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import client from "../../client/client";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const ModalComponent = ({ open, setOpen, selectedDoctor }) => {
  const { user, loggedIn } = useSelector((state) => state.user);
  const [appointments, setAppointments] = useState([]);
  const [appointment, setAppointment] = useState({});

  const handleClose = () => {
    setOpen(false);
  };

  // slotChecker

  const slotChecker = (e) => {
    appointments.map((appointment) => {
      console.log(appointment.doctor._id, selectedDoctor);
      if (appointment.doctor._id === selectedDoctor) {
        // console.log(dayjs(appointment.startFrom).format("HH:mm"));
        if (
          dayjs(e).format("DD-MM-YYYY HH:mm") ===
          dayjs(appointment.startFrom).format("DD-MM-YYYY HH:mm")
        )
          toast.error(
            "The Doctor Doesnot Have a Empty Slot, On The Time You Selected"
          );
        return false;
      }
      return true;
    });
  };

  const handleChange = (fieldName, e) => {
    setAppointment({ ...appointment, [fieldName]: e });
    slotChecker(e);
  };

  const handleSubmit = () => {
    if (!loggedIn) window.location.href = "/login";
    const slotAvailable = slotChecker(appointment.startFrom);

    if (!slotAvailable) return;

    if (!appointment.startFrom || !appointment.endTo)
      return toast.error("Select Appointment Time");
    const diffInHours = appointment.endTo.diff(appointment.startFrom, "hour");

    if (diffInHours > 1)
      return toast.error("Maximum Appointment Duration Is One Hour");

    bookAppointment();
  };

  const bookAppointment = async () => {
    try {
      const { data } = await client.post("/appointment/create-appointment", {
        ...appointment,
        doctor: selectedDoctor,
        patient: user._id,
      });

      if (data.success) {
        toast.success("Appointment Booking Successful");
        handleClose();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  // fetch all apppointment
  useEffect(() => {
    fetchAllAppointments();
  }, []);

  const fetchAllAppointments = async () => {
    try {
      const { data } = await client.get("appointment/get-all-appointments");
      setAppointments(data.appointments);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="d-flex align-items-center justify-content-center"
    >
      <div
        className="modalBody bg-white"
        style={{ padding: "40px", width: "400px" }}
      >
        <h5 className="mb-4 text-bold">Book Appointment </h5>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateTimePicker"]}>
            <DateTimePicker
              label="Appointment Starts From"
              onChange={(e) => handleChange("startFrom", e)}
            />
            <DateTimePicker
              label="Appointment Ends To"
              onChange={(e) => handleChange("endTo", e)}
            />
          </DemoContainer>
        </LocalizationProvider>

        <button className="btn btn-primary w-100 mt-4" onClick={handleSubmit}>
          Book Appointment
        </button>
      </div>
    </Modal>
  );
};

export default ModalComponent;
