import React, { useState, useEffect } from 'react';
import { Form, Button, ListGroup, Container } from 'react-bootstrap';
import ColorSchemesExample from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function Feedback() {
  const [feedback, setFeedback] = useState('');
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const response = await fetch('http://localhost:8000/feedback/feedback/');
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setFeedbackList(data);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) {
      alert('Please enter some feedback');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/feedback/feedback/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedback }),
      });

      if (response.ok) {
        alert('Feedback submitted successfully!');
        setFeedback('');
        fetchFeedback(); // Update feedback list immediately
      } else {
        alert('Failed to submit feedback');
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <>
      {/* Fixed Navbar at Top */}
      <ColorSchemesExample />

      <Container className="mt-5 pt-5">
        <h2 className="text-center mb-4">Submit Feedback</h2>

        <Form onSubmit={handleSubmit} className="mb-4 w-50 mx-auto"> {/* Centered & Reduced Width */}
          <Form.Group controlId="feedbackTextarea">
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Enter your feedback..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </Form.Group>
          
          {/* Centering the Submit Button */}
          <div className="d-flex justify-content-center mt-2">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>

        <h2 className="text-center mb-3">Previous Feedback</h2>
        <ListGroup className="w-50 mx-auto">
          {feedbackList.length > 0 ? (
            feedbackList.map((item, index) => (
              <ListGroup.Item key={index}>{item.feedback}</ListGroup.Item>
            ))
          ) : (
            <p className="text-muted text-center">No feedback available.</p>
          )}
        </ListGroup>
      </Container>
    </>
  );
}

export default Feedback;
