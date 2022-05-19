import React from "react";
import PromptListItem from "./PromptListItem.js"

function PromptList({ promptList, onRemovePrompt }) {

  return(
    <ul>
      {promptList.map((item) =>
        <PromptListItem key={item.id} item={item} onRemovePrompt={onRemovePrompt}/>
      )}
    </ul>
  );
};

export default PromptList;
