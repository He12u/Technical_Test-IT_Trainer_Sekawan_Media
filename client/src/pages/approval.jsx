import React, { useEffect, useState } from "react";
import instanceURL from "../config/instance";
import Swal from "sweetalert2";
import { Container, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

const ApprovalPage = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchPendingApprovals();
  }, []);

  async function fetchPendingApprovals() {
    try {
      setLoading(true);

      const token = `Bearer ${localStorage.access_token}`;
      const bookingResponse = await instanceURL.get("/bookings", {
        headers: { Authorization: token },
      });
      setBookings(bookingResponse.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  }

  async function approveBooking(id) {
    try {
      const token = `Bearer ${localStorage.access_token}`;
      await instanceURL.put(`/bookings/${id}`, null, {
        headers: { Authorization: token },
      });

      Swal.fire({
        title: "Approved!",
        text: "Pemesanan kendaraan disetujui",
        icon: "success",
      });

      fetchPendingApprovals(); // Refresh list
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  }

  return (
    <Container className="mt-5">
      <h2>Pending Approval</h2>
      {isLoading ? (
        <Spinner animation="border" />
      ) : (
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Driver ID</th>
              <th>Vehicle ID</th>
              <th>Approver ID</th>
              <th>Booking Date</th>
              <th>Return Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.employeeId}</td>
                <td>{booking.driverId}</td>
                <td>{booking.vehicleId}</td>
                <td>{booking.approverId}</td>
                <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                <td>{new Date(booking.returnDate).toLocaleDateString()}</td>
                <td>{booking.status}</td>
                <td>
                  {booking.status === "Approved" ? (
                    ""
                  ) : (
                    <Button
                      variant="primary"
                      onClick={() => approveBooking(booking.id)}
                    >
                      Approve
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ApprovalPage;
