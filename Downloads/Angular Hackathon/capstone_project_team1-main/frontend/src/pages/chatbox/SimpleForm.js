import React, { Component } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import Post from "./Post";

const theme = {
  background: "#eeeaf1",
  fontFamily: "High",
  headerBgColor: "#5a287d",
  headerFontColor: "#f6f5f3",
  headerFontSize: "1rem",
  botBubbleColor: "white",
  botFontColor: "#646068",
  userBubbleColor: "#5a287d",
  userFontColor: "#f6f5f3",
  botTextAlign:"left",
  
  bubbleStyle: {
    textAlign: "left", // or "right" for user bubbles
    display: "inline-block",
    // You can add more styling properties here as needed
  }
};

const config = {
  headerTitle: "Message us",
  // height: "80vh",
  floating: true
};

class SimpleForm extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <ChatBot
          id="chatbot"
          steps={[
            {
              id: "name",
              message: 
              "Hi there. I'm Cora, your digital assistant.I keep a record of this conversation to allow me to keep improving the customer experience.Please provide your phone number so that our technical member will call you shortly and clear your all queries.",
              trigger: "firstname"
            },
            {
              id: "firstname",
              user: true,
              trigger: "q-submit"
            },
            {
              id: "q-submit",
              message: "Do you wish to submit?",
              trigger: "submit"
            },
            {
                id: "submit",
                options: [
                  { value: "y", label: "Yes", trigger: "end-message" },
                  { value: "n", label: "No", trigger: "no-submit" }
                ]
              },
            {
              id: "no-submit",
              message: "Your information was not submitted.",
              end: true
            },
            {
              id: "end-message",
              component: <Post />,
              asMessage: true,
              end: true
            }
          ]}
          {...config}
        />
      </ThemeProvider>
    );
  }
}

export default SimpleForm;
