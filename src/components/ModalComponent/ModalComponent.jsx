import { Modal } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useState } from "react";
import { toast } from "react-hot-toast";
import client from "../../client/client";
import { useSelector } from "react-redux";

const ModalComponent = ({ open, setOpen, selectedDoctor }) => {
  const { user } = useSelector((state) => state.user);
  const [appointment, setAppointment] = useState({});

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (fieldName, e) => {
    setAppointment({ ...appointment, [fieldName]: e });
  };

  const handleSubmit = () => {
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
