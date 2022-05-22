import React from "react";
import randomKey from "./randomKey.js"

/*
Create function component "PromptForm" that accepts destructed prop onAddPrompt and returns a form that allows users to create thier own prompts.
Returns form with className "promptForm" and onSubmit event calling handlePromptSubmission handler function
form contains label, input with onChange event calling handlePromptChange handler function, and button.
*/
function PromptForm({ onAddPrompt }) {

  /*
  Call and destructure React.useState hook to set userPrompt variable with value defined by setUserPrompt function.
  userPrompt is initialized as an empty string.
  */
  const [userPrompt, setUserPrompt] = React.useState("");

  /*Create handlePromptChange handler function that accepts an onChange event to track user input*/
  const handlePromptChange = (event) => {
    const newUserPrompt = event.target.value
    /*
    if the value's length is not 0 add "labelTransition" class to label element and "inputTransition" class to input element
    else remove "labelTransition" class from label element and "inputTransition" class from input element
    */
    if (newUserPrompt.length !== 0){
      event.target.previousSibling.classList.add("labelTransition");
      event.target.classList.add("inputTransition");
    } else {
      event.target.previousSibling.classList.remove("labelTransition");
      event.target.classList.remove("inputTransition");
    };
    /*call setUserPrompt setter function to set userPrompt as the newUserPrompt*/
    setUserPrompt(newUserPrompt);
  };

  /*Create handlePromptSubmission handler function that accepts an onSubmit event to facilitate fetch API post*/
  const handlePromptSubmission = (event) => {
    /*Prevents default onSubmit action to prevent rerendering*/
    event.preventDefault();
    /*
    propmt is set as userPrompt.
    temperature must be between 0 and 1 where higher values means the model will take more risks.
    max_tokens is the maximum number of tokens to generate in the completion.
    */
    let parameters = {
      prompt: userPrompt,
      temperature: 0.6,
      max_tokens: 64,
    };

    fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
      method: "POST",
      headers: {
       "Content-Type": "application/json",
       /*REACT_APP_CLIENT_SECRET not secure, only use for application and testing purposes.*/
       Authorization: `Bearer ${process.env.REACT_APP_CLIENT_SECRET}`,
      },
     body: JSON.stringify(parameters),
    })
    .then(response => response.json())
    .then(data =>
      /*Call onAddPrompt prop to pass object containing the user's prompt, fetched AI response, and an id. Used in addPrompt function within App component*/
      onAddPrompt({ userPrompt: userPrompt, openaiResponse: data.choices[0].text, id: randomKey(20) })
    );
    /*
    call setUserPrompt setter function to set userPrompt to an empty string
    remove "labelTransition" class from label element
    remove "inputTransition" class from input element
    */
    setUserPrompt("");
    event.target.children[0].classList.remove("labelTransition");
    event.target.children[1].classList.remove("inputTransition");
  };

  return(
    <form className="promptForm" onSubmit={handlePromptSubmission}>
      <label htmlFor="userPrompt">Prompt:</label>
      <input name="userPrompt" id="userPrompt" placeholder="Enter any prompt here." autoComplete="off" onChange={handlePromptChange} value={userPrompt} required={true}></input>
      <button id="formButton">Submit</button>
    </form>
  );
};

export default PromptForm;
