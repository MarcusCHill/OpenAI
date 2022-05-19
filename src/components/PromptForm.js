import React from "react";

const randomKey = length => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

function PromptForm({ onAddPrompt }) {

  const [userPrompt, setUserPrompt] = React.useState("");

  const handlePromptChange = (event) => {
    const newUserPrompt = event.target.value;
    setUserPrompt(newUserPrompt);
  };

  const handlePromptSubmission = (event) => {
    event.preventDefault();
    let parameters = {
      prompt: userPrompt,
      temperature: 0.7,
      max_tokens: 64,
    };

    fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
      method: "POST",
      headers: {
       "Content-Type": "application/json",
       Authorization: `Bearer ${process.env.REACT_APP_CLIENT_SECRET}`,
      },
     body: JSON.stringify(parameters),
    })
    .then(response => response.json())
    .then(data =>
      onAddPrompt({ userPrompt: userPrompt, openaiResponse: data.choices[0].text, id: randomKey(20) }) 
    );
    setUserPrompt("");
  };

  return(
    <form onSubmit={handlePromptSubmission}>
      <label htmlFor="userPrompt">Enter Prompt:</label>
      <br/>
      <textarea name="userPrompt" id="userPrompt" onChange={handlePromptChange} value={userPrompt} required={true}></textarea>
      <br/>
      <button>Submit</button>
    </form>
  );
};

export default PromptForm;
