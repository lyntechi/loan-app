import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { formSchema } from "../formSchemas/createAccount";
import { Button } from "@material-ui/core";

function CreateAccount(props) {
  //This is the initial state of the create account form
  const [formState, setFormState] = useState({
    username: "",
    password: "",
    confirmation: "",
  });
  //This is the initial state for errors that will pop up if form isnt properly validated
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    confirmation: "",
  });
  //i set up state to disable button if user leaves input field empty
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
  //my input handler keeps track of the value entered on the input field
  const inputHandler = (e) => {
    //Here I am spreading inside of formState and I used a computated property for e.target.name
    // to able to update the targets value dynamically
    setFormState({ ...formState, [e.target.name]: e.target.value });
    //The Yup library for form validation will take my formSchema I created and check each
    //input field that matched the e.target.name
    Yup.reach(formSchema, e.target.name)
      //validate will check if the e.target.value meets the formSchemas requirements I have set up.
      .validate(e.target.value)
      //if the values are validated i set the errors to "" so they can clear
      .then(() => {
        setErrors({ ...errors, [e.target.name]: "" });
      })
      //if the values arented properly validated itll display the errors coming from the errors state
      .catch((err) => {
        setErrors({ ...errors, [e.target.name]: err.errors[0] });
      });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    //this will check the formSchema I created exported from "../formSchemas/createAccount"
    //to check if all input fields have values and if they dont button will stay disabled.
    formSchema.isValid(formState).then((valid) => {
      setButtonIsDisabled(!valid);
    });
  });
  return (
    <div className="container">
      <form onSubmit={onSubmitHandler}>
        <h5>
          Important Message:{" "}
          <img src={props.apiData.positiveFlag} alt="" className="green-flag" />
        </h5>

        <p>Great News! Based on your answers, You have been Pre-approved!</p>

        <p>Please Create An Account</p>
        <p className="error-p">{errors.username}</p>
        <input
          placeholder="username"
          value={formState.username}
          onChange={inputHandler}
          name="username"
        />
        <br />
        <p className="error-p">{errors.password}</p>
        <input
          placeholder="password"
          value={formState.password}
          onChange={inputHandler}
          name="password"
          type="password"
        />
        <br />
        <p className="error-p">
          {formState.password === formState.confirmation
            ? ""
            : errors.confirmation}
        </p>
        <input
          placeholder="re-enter password"
          value={formState.confirmation}
          onChange={inputHandler}
          name="confirmation"
          type="password"
        />

        <Button
          color="primary"
          variant="contained"
          disabled={buttonIsDisabled}
          className={
            buttonIsDisabled === true ? "submit-disabled" : "create-account-btn"
          }
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default CreateAccount;
