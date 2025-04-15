import React, { useState, useEffect } from "react";
import { Table, Form, Button, Container } from "react-bootstrap";
import ColorSchemesExample from "../components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

function BusRoutes() {
  const [busRoutes, setBusRoutes] = useState([]);
  const [formData, setFormData] = useState({
    bus_no: "",
    destination: "",
    route_length: "",
    first_bus_mon_sat: "",
    first_bus_sunday: "",
    last_bus_mon_sat: "",
    last_bus_sunday: "",
    journey_time: "",
    frequency_mon_sat: "N/A",
    frequency_sunday: "N/A",
    fare: "",
  });

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/busroutes/");
      if (!response.ok) throw new Error("Failed to fetch bus routes");
      const data = await response.json();
      setBusRoutes(data);
    } catch (error) {
      console.error("Error fetching bus routes:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this bus route?")) return;

    try {
      const response = await fetch(`http://localhost:8000/api/busroutes/${id}/`, {
        method: "DELETE",
      });

      if (response.status === 204) {
        alert("Bus route deleted successfully.");
        fetchRoutes();
      } else {
        const data = await response.json();
        alert(`Failed to delete bus route: ${data.error}`);
      }
    } catch (error) {
      console.error("Error deleting bus route:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isPositiveNumber = (value) => !isNaN(value) && Number(value) >= 0;
    const validFrequency = (value) =>
      value === "N/A" || (/^\d+$/.test(value) && parseInt(value) >= 0);

    if (!isPositiveNumber(formData.route_length)) {
      alert("Route Length must be a positive number.");
      return;
    }

    if (!isPositiveNumber(formData.journey_time)) {
      alert("Journey Time must be a positive number.");
      return;
    }

    if (!isPositiveNumber(formData.fare)) {
      alert("Fare must be a positive number.");
      return;
    }

    if (!validFrequency(formData.frequency_mon_sat)) {
      alert("Frequency (Mon-Sat) must be a positive number or 'N/A'.");
      return;
    }

    if (!validFrequency(formData.frequency_sunday)) {
      alert("Frequency (Sunday) must be a positive number or 'N/A'.");
      return;
    }

    const formattedData = {
      ...formData,
      route_length: parseFloat(formData.route_length),
      journey_time: parseFloat(formData.journey_time),
      fare: parseInt(formData.fare),
    };

    try {
      const response = await fetch("http://localhost:8000/api/busroutes/add/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Bus route added successfully!");
        setFormData({
          bus_no: "",
          destination: "",
          route_length: "",
          first_bus_mon_sat: "",
          first_bus_sunday: "",
          last_bus_mon_sat: "",
          last_bus_sunday: "",
          journey_time: "",
          frequency_mon_sat: "N/A",
          frequency_sunday: "N/A",
          fare: "",
        });
        fetchRoutes();
      } else {
        console.error("Failed to add bus route:", data);
        alert(`Error: ${JSON.stringify(data)}`);
      }
    } catch (error) {
      console.error("Error submitting bus route:", error);
    }
  };

  return (
    <>
      <ColorSchemesExample />
      <Container className="mt-5 pt-5">
        <h2 className="text-center mb-4">Bus Routes</h2>

        <Table striped bordered hover responsive className="text-center">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Bus No</th>
              <th>Destination</th>
              <th>Route Length (km)</th>
              <th>First Bus (Mon-Sat)</th>
              <th>First Bus (Sunday)</th>
              <th>Last Bus (Mon-Sat)</th>
              <th>Last Bus (Sunday)</th>
              <th>Journey Time (min)</th>
              <th>Frequency (Mon-Sat)</th>
              <th>Frequency (Sunday)</th>
              <th>Fare (₹)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {busRoutes.length > 0 ? (
              busRoutes.map((route, index) => (
                <tr key={route.id}>
                  <td>{index + 1}</td>
                  <td>{route.bus_no}</td>
                  <td>{route.destination}</td>
                  <td>{route.route_length}</td>
                  <td>{route.first_bus_mon_sat}</td>
                  <td>{route.first_bus_sunday}</td>
                  <td>{route.last_bus_mon_sat}</td>
                  <td>{route.last_bus_sunday}</td>
                  <td>{route.journey_time}</td>
                  <td>{route.frequency_mon_sat}</td>
                  <td>{route.frequency_sunday}</td>
                  <td>{route.fare}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(route.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="13" className="text-muted text-center">
                  No bus routes available.
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        <h3 className="text-center mt-4">Add New Bus Route</h3>
        <Form onSubmit={handleSubmit} className="w-75 mx-auto">
          {[
            { label: "Bus Number", field: "bus_no", type: "text" },
            { label: "Destination", field: "destination", type: "text" },
            { label: "Route Length (km)", field: "route_length", type: "number" },
            { label: "First Bus (Mon-Sat)", field: "first_bus_mon_sat", type: "text" },
            { label: "First Bus (Sunday)", field: "first_bus_sunday", type: "text" },
            { label: "Last Bus (Mon-Sat)", field: "last_bus_mon_sat", type: "text" },
            { label: "Last Bus (Sunday)", field: "last_bus_sunday", type: "text" },
            { label: "Journey Time (min)", field: "journey_time", type: "number" },
            { label: "Frequency (Mon-Sat)", field: "frequency_mon_sat", type: "text" },
            { label: "Frequency (Sunday)", field: "frequency_sunday", type: "text" },
            { label: "Fare (₹)", field: "fare", type: "number" },
          ].map(({ label, field, type }) => (
            <Form.Group className="mb-2" key={field}>
              <Form.Label>{label}</Form.Label>
              <Form.Control
                type={type}
                placeholder={`Enter ${label.toLowerCase()}`}
                value={formData[field]}
                onChange={(e) =>
                  setFormData({ ...formData, [field]: e.target.value })
                }
                required
              />
            </Form.Group>
          ))}

          <div className="d-flex justify-content-center mt-3">
            <Button variant="primary" type="submit">
              Add Route
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
}

export default BusRoutes;