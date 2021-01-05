import React, { useState, useEffect } from "react";
import { FcLock } from "react-icons/fc";
import { convertToNumber } from "../utils/convertToNumber";
import { useHistory } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { schemaArray } from "../formSchemas/landingPage";
import { Button } from "@material-ui/core";
// import { currencyFormat } from "../utils/currencyFormat";
import CurrencyFormat from "react-currency-format";

function LandingPage(props) {
  //This is the initial state of the landingpage form
  const [formState, setFormState] = useState({
    price: "",
    make: "",
    model: "",
    income: "",
    creditScore: "",
  });

  //im using the useHistory hook from react-router-dom so that the user
  //is routed to a certain route based on the answers they enter in the form
  const history = useHistory();
  //i set up state to disable button if user leaves input field empty
  const [buttonIsDisabled, setButtonIsDisabled] = useState(true);
  // activeStep is the state I set up so user can move
  //forward and back on the multi step form i created
  const [activeStep, setActiveStep] = useState(0);
  // error is the state I set up so user can be alerted
  //that a value is required on input in order to move forward
  const [error] = useState(" Input field value is required");

  //I am using this useEffect hook so that the code inside can be
  //executed based on any changes of whats inside the dependency array
  useEffect(() => {
    //schemaArray is exported from  "../formSchemas/landingpage"; and it holds
    //all of my form schemas i created using the Yup form validation library
    //itll check each step individually and if the input field is filled in the button will undisable for user
    schemaArray[activeStep].isValid(formState).then((valid) => {
      setButtonIsDisabled(!valid);
    });
  }, [formState, activeStep, error]);

  //my input handler keeps track of the value entered on the input field
  const inputHandler = (e) => {
    //Here I am spreading inside of formState and I used a computated property for e.target.name
    // to able to update the targets value dynamically
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  //my handleNext allows user to keep moving forward on the form
  const handleNext = (e) => {
    e.preventDefault();
    setActiveStep(() => activeStep + 1);
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  //my handleBack allows user to move back on the form
  const handleBack = () => {
    setActiveStep(() => activeStep - 1);
  };
  // Usually I add my form input directly in my jsx however I decided to put them in an array
  //so that when i add formSteps[activeStep] only the first index of the array will display and
  //as i increase the activeStep by clicking next itll keep moving to the next index of the array for each form
  //input to be rendered
  const formSteps = [
    {
      label: "Please Enter Purchase Price",
      input: (
        <CurrencyFormat
          thousandSeparator={true}
          prefix={"$"}
          placeholder="$8,000"
          name="price"
          onChange={inputHandler}
          value={formState.price}
        />
      ),
    },
    {
      label: "Please Enter The Make Of Car",
      input: (
        <input
          placeholder="make"
          name="make"
          onChange={inputHandler}
          value={formState.make}
        />
      ),
    },
    {
      label: "Please Enter The Model Of Car",
      input: (
        <input
          placeholder="model"
          name="model"
          onChange={inputHandler}
          value={formState.model}
        />
      ),
    },
    {
      label: "Please Enter Annual Income",
      input: (
        <CurrencyFormat
          thousandSeparator={true}
          prefix={"$"}
          placeholder="$40,000"
          type="text"
          onChange={inputHandler}
          name="income"
          value={formState.income}
        />
      ),
    },
    {
      label: "Please Enter Your Credit Score",
      input: (
        <input
          type="number"
          placeholder="Enter Credit Score"
          onChange={inputHandler}
          name="creditScore"
          value={formState.creditScore}
          min="300"
          step="0.01"
        />
      ),
    },
  ];
  //I created maxSteps variable to hold the length of the formSteps array
  // to be able to manipulate my next, back and submit button on when they should be rendered to the page.
  const maxSteps = formSteps.length;
  //this allows form from submitting when pressing enter on keyboard
  const onKeyPress = (e) => {
    if (e.which === 13) {
      e.preventDefault();
    }
  };
  const onSubmitHandler = (e) => {
    //e.preventDefault() to avoid the page from automatically refreshing when clicking the form buttons
    e.preventDefault();
    //here I used my convertToNumber function I created to change the users income and price selected from
    //string to a number
    const usersIncome = convertToNumber(formState.income);
    const priceSelected = convertToNumber(formState.price);
    const usersCreditScore = formState.creditScore;
    //these are the calculations I created to determine if user should
    //route to create account or disqualified page
    if (usersCreditScore < 600 || priceSelected > usersIncome) {
      history.push("/disqualified");
    } else if (usersCreditScore > 600 || priceSelected < usersIncome) {
      history.push("/create-account");
    }
  };

  return (
    <div className="container">
      <form onSubmit={onSubmitHandler} onKeyPress={onKeyPress}>
        <div className="steps-tracker">
          {/* the className checks what step on the form the user is
           on so that it can highlight the numbers at the top of the form. I couldnt figure out how to dynamically add
           the numbers so I had to hardcode from 0-4*/}
          <div className="steps">
            <p
              className={
                activeStep === 0 ? "steps-tracker-changer" : "steps-tracker-p"
              }
            >
              1<span className="line"></span>
            </p>
            <p
              className={
                activeStep === 1 ? "steps-tracker-changer" : "steps-tracker-p"
              }
            >
              2<span className="line"></span>
            </p>
            <p
              className={
                activeStep === 2 ? "steps-tracker-changer" : "steps-tracker-p"
              }
            >
              3<span className="line"></span>
            </p>
            <p
              className={
                activeStep === 3 ? "steps-tracker-changer" : "steps-tracker-p"
              }
            >
              4<span className="line"></span>
            </p>
            <p
              className={
                activeStep === 4 ? "steps-tracker-changer" : "steps-tracker-p"
              }
            >
              5
            </p>
          </div>
        </div>

        <h1>Auto Loan Pre-Qualification</h1>
        <h2>Get pre-qualified in just a few minutes</h2>
        <p>
          Answer a few questions to see which personal loans you pre-qualify
          for. The process is quick and easy, and it{" "}
          <span>will NOT affect your credit score.</span>
        </p>

        <div className="form-questions" data-testid="form-inputs">
          <h1>
            {/*formSteps is the array I created above with all my form inputs and labels and i added activeStep to check the index.
           so this really reads as formSteps[0] because activeStep initial state starts at 0*/}
            {formSteps[activeStep].label}
          </h1>
          {/*Here I am checking if the price the user enters is higher than 1,000,000 through the bad request
          coming from the fake rest api I created*/}
          {convertToNumber(formState.price) > 1000000 ? (
            <p className="error-p">
              {props.apiData.priceLimit}
              <FaTimes />
            </p>
          ) : (
            ""
          )}
          {formSteps[activeStep].input}
          <br />
          {/*this checks if button is disabled to throw an error*/}
          {buttonIsDisabled === true ? <p className="error-p">{error}</p> : ""}

          {activeStep !== maxSteps - 1 ? (
            <Button
              color="primary"
              variant="contained"
              disabled={buttonIsDisabled}
              onClick={handleNext}
              style={{ marginTop: "7px" }}
              className={
                buttonIsDisabled === true ? "btn-disabled" : "btn-next"
              }
            >
              Next
            </Button>
          ) : (
            <>
              <Button
                color="primary"
                variant="contained"
                disabled={buttonIsDisabled}
                onClick={onSubmitHandler}
                className={
                  buttonIsDisabled === true ? "btn-disabled" : "btn-next"
                }
              >
                Submit
              </Button>
            </>
          )}

          {activeStep !== 0 && activeStep !== maxSteps ? (
            <Button
              color="primary"
              variant="outlined"
              className="back-btn"
              onClick={handleBack}
              style={{ marginTop: "7px" }}
            >
              back
            </Button>
          ) : (
            ""
          )}
        </div>

        <div className="list-items">
          <div>
            <FcLock className="lock-logo" />
          </div>
          <div>
            <li>This will NOT affect your credit score</li>
            <li>Your info protected with bank-level security</li>
            <li>Won't share your info without approval</li>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LandingPage;
