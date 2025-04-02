import React from "react";
import ColorSchemesExample from "../components/Navbar";
import UncontrolledExample from "../components/Carousel";
import AvatarChatbot from "../components/AvatarChatbot"; // Import the chatbot

const Home = () => {
  return (
    <div>
      <ColorSchemesExample />
      <div>
        <UncontrolledExample />
      </div>

      {/* Add the Avatar Chatbot Component */}
      <AvatarChatbot />
    </div>
  );
};

export default Home;
