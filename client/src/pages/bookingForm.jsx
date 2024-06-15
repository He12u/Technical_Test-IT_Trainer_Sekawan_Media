import React, { useState, useEffect } from "react";
import instanceURL from "../config/instance";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const BookingForm = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [approvers, setApprovers] = useState([]);

  const [employeeId, setEmployeeId] = useState("");
  const [driverId, setDriverId] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [approverId, setApproverId] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const token = `Bearer ${localStorage.access_token}`;
      const vehiclesResponse = await instanceURL.get("/vehicles", {
        headers: { Authorization: token },
      });
      setVehicles(vehiclesResponse.data);

      const approversResponse = await instanceURL.get("/employees/approvers", {
        headers: { Authorization: token },
      });
      setApprovers(approversResponse.data);

      const employeesResponse = await instanceURL.get("/employees", {
        headers: { Authorization: token },
      });
      setEmployees(employeesResponse.data);

      const driversResponse = await instanceURL.get("/drivers", {
        headers: { Authorization: token },
      });
      setDrivers(driversResponse.data);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = `Bearer ${localStorage.access_token}`;
      await instanceURL.post(
        "/bookings",
        {
          employeeId,
          driverId,
          vehicleId,
          approverId,
          bookingDate,
          returnDate,
        },
        { headers: { Authorization: token } }
      );

      Swal.fire({
        title: "Berhasil!",
        text: "Pemesanan kendaraan berhasil, menunggu persetujuan atasan",
        icon: "success",
      });

      navigate("/booking");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Form Pemesanan Kendaraan</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBookingEmployee">
          <Form.Label>Pihak yang melakukan pemesanan</Form.Label>
          <Form.Control
            as="select"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
          >
            <option value="">Pilih karyawan</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.fullName}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formBookingDriver">
          <Form.Label>Driver</Form.Label>
          <Form.Control
            as="select"
            value={driverId}
            onChange={(e) => setDriverId(e.target.value)}
            required
          >
            <option value="">Pilih driver</option>
            {drivers.map((driver) => (
              <option key={driver.id} value={driver.id}>
                {driver.fullName}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formVehicle">
          <Form.Label>Kendaraan</Form.Label>
          <Form.Control
            as="select"
            value={vehicleId}
            onChange={(e) => setVehicleId(e.target.value)}
            required
          >
            <option value="">Pilih kendaraan</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formApprover">
          <Form.Label>Pihak yang menyetujui pemesanan</Form.Label>
          <Form.Control
            as="select"
            value={approverId}
            onChange={(e) => setApproverId(e.target.value)}
            required
          >
            <option value="">Pilih approver</option>
            {approvers.map((approver) => (
              <option key={approver.id} value={approver.id}>
                {approver.fullName}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formBookingDate">
          <Form.Label>Tanggal Booking</Form.Label>
          <Form.Control
            type="date"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formReturnDate">
          <Form.Label>Tanggal Pengembalian</Form.Label>
          <Form.Control
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {isLoading ? "Loading…" : "Kirim"}
        </Button>
      </Form>
    </Container>
  );
};

export default BookingForm;
