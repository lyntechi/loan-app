import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchApiData } from "../actions/messagesActions";

function DisqualificationPage(props) {
  const { fetchApiData } = props;
  useEffect(() => {
    fetchApiData();
  }, [fetchApiData]);
  return (
    <div className="container">
      <div className="message-container">
        <h1>Important Message:</h1>
        {props.message.map((message) => {
          return <h2 key={message.id}>{message.disqualifyMessage}</h2>;
        })}

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

const mapStateToProps = (state) => {
  return {
    message: state.messagesReducer.apiData.messages,
  };
};
export default connect(mapStateToProps, { fetchApiData })(DisqualificationPage);
