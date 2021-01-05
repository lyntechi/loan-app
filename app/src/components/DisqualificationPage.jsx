import React from "react";

function DisqualificationPage(props) {
  return (
    <div className="container">
      <div className="message-container">
        <h1>Important Message:</h1>
        <h2>{props.apiData.disqualifyMessage}</h2>
        <div>
          <p>
            Please call Customer Service to get more information{" "}
            <span>1-800-123-4567</span>
          </p>
          <p>Thank you for taking the time answering the questions!</p>
        </div>
      </div>
    </div>
  );
}

export default DisqualificationPage;
