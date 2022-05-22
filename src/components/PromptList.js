import React from "react";
import PromptListItem from "./PromptListItem.js"

/*
Create function component "PromptList" that accepts destructed props promptList and onRemovePrompt and returns a heading and unordered list
*/
function PromptList({ promptList, onRemovePrompt }) {
  return(
    <section id="responseSection">
        <h3>Responses:</h3>
        <ul>
          {/*using .map method iterate over promptList array to delcare PromptListItem component with key, item, and, onRemovePrompt props*/
          promptList.map((item) =>
            <PromptListItem key={item.id} item={item} onRemovePrompt={onRemovePrompt}/>
          )}
        </ul>
    </section>
  );
};

export default PromptList;
