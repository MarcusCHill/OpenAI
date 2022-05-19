import React from "react";

function PromptListItem({ item, onRemovePrompt }) {

  return(
    <li>
      <span>Prompt:{item.userPrompt}</span>
      <br/>
      <span>OpenAI:{item.openaiResponse}</span>
      <br/>
      <button onClick={() => onRemovePrompt(item.id)}>Remove</button>
    </li>
  );
};

export default PromptListItem;
