import React from "react";

/*
Creat function component "PromptListItem" that accepts destructed props item and onRemovePrompt and returns a list element displaying user prompt and AI response
*/
function PromptListItem({ item, onRemovePrompt }) {

  return(
    <li>
      <p>Prompt: {item.userPrompt}</p>
      <p>OpenAI:{item.openaiResponse}</p>
      {/*onClick event calls onRemovePrompt inline handler accepting the items ID used to filter and remove this list element within the App component*/}
      <button id="removeButton" onClick={() => onRemovePrompt(item.id)}>Remove</button>
    </li>
  );
};

export default PromptListItem;
