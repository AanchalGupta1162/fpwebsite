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
    frequency_mon_sat: "",
    frequency_sunday: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/busroutes/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

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
          frequency_mon_sat: "",
          frequency_sunday: "",
          fare: "",
        });
        fetchRoutes();
      } else {
        alert("Failed to add bus route");
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

        {/* Table for Displaying Bus Routes */}
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
            </tr>
          </thead>
          <tbody>
            {busRoutes.length > 0 ? (
              busRoutes.map((route, index) => (
                <tr key={index}>
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
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className="text-muted text-center">
                  No bus routes available.
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        {/* Form to Add New Bus Route */}
        <h3 className="text-center mt-4">Add New Bus Route</h3>
        <Form onSubmit={handleSubmit} className="w-75 mx-auto">
          <Form.Group className="mb-2">
            <Form.Label>Bus Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter bus number"
              value={formData.bus_no}
              onChange={(e) => setFormData({ ...formData, bus_no: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Destination</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter destination"
              value={formData.destination}
              onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Route Length (km)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter route length"
              value={formData.route_length}
              onChange={(e) => setFormData({ ...formData, route_length: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>First Bus (Mon-Sat)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first bus timing"
              value={formData.first_bus_mon_sat}
              onChange={(e) => setFormData({ ...formData, first_bus_mon_sat: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>First Bus (Sunday)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first bus timing"
              value={formData.first_bus_sunday}
              onChange={(e) => setFormData({ ...formData, first_bus_sunday: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Last Bus (Mon-Sat)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last bus timing"
              value={formData.last_bus_mon_sat}
              onChange={(e) => setFormData({ ...formData, last_bus_mon_sat: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Last Bus (Sunday)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last bus timing"
              value={formData.last_bus_sunday}
              onChange={(e) => setFormData({ ...formData, last_bus_sunday: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Journey Time (min)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter journey time"
              value={formData.journey_time}
              onChange={(e) => setFormData({ ...formData, journey_time: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Fare (₹)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter fare"
              value={formData.fare}
              onChange={(e) => setFormData({ ...formData, fare: e.target.value })}
              required
            />
          </Form.Group>

          {/* Submit Button Centered */}
          <div className="d-flex justify-content-center mt-3">
            <Button variant="primary" type="submit">
              Add Route
            <br/>
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
}

export default BusRoutes;
