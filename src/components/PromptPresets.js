import React from "react";
import randomKey from "./randomKey.js"

/*
Create function component "PromptPresets" that accepts destructed prop onAddPrompt and returns a React fragment containing a heading and list of buttons to be used as preset prompts
unordered list with list elements that contain a button with onClick event handler.
*/
function PromptPresets({ onAddPrompt }) {

  /*Create handle function "handlePresetSubmission" that accepts an onClick event to facilitate fetch API POST.*/
  const handlePresetSubmission = (event) => {
    /*
    parameters used for API call
    propmt is set as predetermined text content.
    temperature must be between 0 and 1 where higher values means the model will take more risks.
    max_tokens is the maximum number of tokens to generate in the completion.
    */
    let parameters = {
      prompt: event.target.textContent,
      temperature: 0.6,
      max_tokens: 100,
    };

    fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
      method: "POST",
      headers: {
       "Content-Type": "application/json",
       /*
       REACT_APP_CLIENT_SECRET not secure.
       Only use for application and testing purposes.
       */
       Authorization: `Bearer ${process.env.REACT_APP_CLIENT_SECRET}`,
      },
     body: JSON.stringify(parameters),
    })
    .then(response => response.json())
    .then(data =>
      /*Call onAddPrompt prop to pass object containing the user's prompt, fetched AI response, and an id. Used in addPrompt function within App component*/
      onAddPrompt({ userPrompt: event.target.textContent, openaiResponse: data.choices[0].text, id: randomKey(20) })
    );
  };

  return(
      <ul>
        <li><button onClick={handlePresetSubmission}>This OpenAI API is so cool!</button></li>
        <li><button onClick={handlePresetSubmission}>If you were a type of fruit which would you be and why?</button></li>
        <li><button onClick={handlePresetSubmission}>Share your thoughts on this quote: "Lord, we know what we are, but know not what we may be." - Ophelia</button></li>
        <li><button onClick={handlePresetSubmission}>Translate to spanish: Hello, my name is Marcus Hill. I enjoy software development!</button></li>
        <li><button onClick={handlePresetSubmission}>Write 1-3 sentences about unicorns who study STEM.</button></li>
        <li><button onClick={handlePresetSubmission}>Share two thoughtful affirmations.</button></li>
      </ul>
  );
};

export default PromptPresets;
