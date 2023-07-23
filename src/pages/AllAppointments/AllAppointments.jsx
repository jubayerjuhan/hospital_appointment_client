import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import client from "../../client/client";
import { toast } from "react-hot-toast";
import dayjs from "dayjs";

const AllAppointments = () => {
  const [appointments, setAppointments] = useState([]);
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

  const handleDelete = async (id) => {
    try {
      const { data } = await client.delete(
        `appointment/delete-appointment/${id}`
      );
      if (data.success) return fetchAllAppointments();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
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
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(appointment._id)}
                    >
                      Delete
                    </button>
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

export default AllAppointments;
