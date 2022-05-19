import React from "react";

function PromptListItem({ item, onRemovePrompt }) {

  return(
    <li>
      <span>Prompt:{item.prompt}</span>
      <br/>
      <span>GPT-3:</span>
      <br/>
      <button onClick={() => onRemovePrompt(item.id)}>Remove</button>
    </li>
  );
};

export default PromptListItem;
