import React, { useEffect, useState } from "react";
import instanceURL from "../config/instance";
import { Container, Table, Button } from "react-bootstrap";
import { Chart } from "react-google-charts";
import * as XLSX from "xlsx";

const Dashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [chartData, setChartData] = useState([["Vehicle", "Usage"]]);

  useEffect(() => {
    const fetchData = async () => {
      const token = `Bearer ${localStorage.access_token}`;
      const response = await instanceURL.get("/vehicles", {
        headers: { Authorization: token },
      });
      setVehicles(response.data);

      const chartResponse = await instanceURL.get("/bookings", {
        headers: { Authorization: token },
      });

      // Menghitung jumlah penggunaan setiap kendaraan berdasarkan vehicleId
      const usageCount = chartResponse.data.reduce((acc, booking) => {
        acc[booking.vehicleId] = (acc[booking.vehicleId] || 0) + 1;
        return acc;
      }, {});

      // Mengubah data penggunaan ke dalam format yang bisa digunakan oleh Chart
      const usageData = Object.entries(usageCount).map(([vehicleId, usage]) => [
        `ID ${vehicleId}`,
        usage,
      ]);
      setChartData([["Vehicle ID", "Jumlah Pemesanan"], ...usageData]);
    };

    fetchData();
  }, []);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(chartData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Vehicles");
    XLSX.writeFile(wb, "Laporan pemesanan kendaraan.xlsx");
  };

  return (
    <Container className="mt-5">
      <h2>Dashboard</h2>
      <Button onClick={exportToExcel} className="mb-3">
        Export to Excel
      </Button>
      <Chart
        width={"100%"}
        height={"400px"}
        chartType="PieChart"
        loader={<div>Loading Chart...</div>}
        data={chartData}
        options={{
          title: "Riwayat pemakaian",
          pieSliceText: "value", // Menampilkan nilai absolut
          legend: {
            position: "right",
            alignment: "center",
          },
        }}
      />
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Plat</th>
            <th>Type</th>
            <th>Status</th>
            <th>Konsumsi BBM</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id}>
              <td>{vehicle.id}</td>
              <td>{vehicle.name}</td>
              <td>{vehicle.numberPlate}</td>
              <td>{vehicle.type}</td>
              <td>{vehicle.status}</td>
              <td>{vehicle.fuelConsumption}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Dashboard;
