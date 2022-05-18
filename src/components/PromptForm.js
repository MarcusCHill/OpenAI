import React from "react";

function PromptForm() {

  const handlePromptSubmission = (event) => {
    event.preventDefault()
    console.log(event.target);
  };

  return(
    <form onSubmit={handlePromptSubmission}>
      <label htmlFor="userPrompt">Enter Prompt:</label>
      <br/>
      <textarea name="userPrompt" id="userPrompt" required={true}></textarea>
      <br/>
      <button>Submit</button>
    </form>
  );
};

export default PromptForm;
