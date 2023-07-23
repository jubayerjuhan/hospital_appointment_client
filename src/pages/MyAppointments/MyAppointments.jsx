import { useCallback, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import client from "../../client/client";
import { toast } from "react-hot-toast";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

const MyAppointments = () => {
  const { user } = useSelector((state) => state.user);
  const [appointments, setAppointments] = useState([]);

  const fetchAllAppointments = useCallback(async () => {
    try {
      const { data } = await client.get(
        `appointment/get-user-appointments/${user._id}`
      );
      setAppointments(data.appointments);
      if (data.appointments.length === 0)
        return toast.error("No Appointment Available");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }, [user._id]);

  useEffect(() => {
    fetchAllAppointments();
  }, [fetchAllAppointments]);

  return (
    <>
      <Navbar />
      <div className="sectionPadding">
        <div className="container mt-5">
          <h3 className="mb-4">Patient Appointments</h3>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Start From</th>
                <th>End To</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment, key) => (
                <tr key={key}>
                  <td>{appointment.patient.name}</td>
                  <td>{appointment.doctor.name}</td>
                  <td>
                    {dayjs(appointment.startFrom).format(
                      " DD MMMM YYYY, h:mm a"
                    )}
                  </td>
                  <td>
                    {dayjs(appointment.endTo).format(" DD MMMM YYYY, h:mm a")}
                  </td>
                  <td>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default MyAppointments;
