import React, { useState, useEffect } from 'react';
import ColorSchemesExample from '../components/Navbar';

function Feedback() {
  const [feedback, setFeedback] = useState('');
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/feedback/')
      .then(response => response.json())
      .then(data => setFeedbackList(data))
      .catch(error => console.error("Error fetching feedback:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/feedback/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedback }),
      });
      if (response.ok) {
        alert('Feedback submitted successfully!');
        setFeedback('');
      } else {
        alert('Failed to submit feedback');
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div>
      <ColorSchemesExample />
      <h2>Submit Feedback</h2>
      <form onSubmit={handleSubmit}>
        <textarea 
          value={feedback} 
          onChange={(e) => setFeedback(e.target.value)} 
          placeholder="Enter your feedback..."
          rows="4" cols="50"
        />
        <button type="submit">Submit</button>
      </form>

      <h2>Previous Feedback</h2>
      <ul>
        {feedbackList.map((item, index) => (
          <li key={index}>{item.feedback}</li>
        ))}
      </ul>
    </div>
  );
}

export default Feedback;
