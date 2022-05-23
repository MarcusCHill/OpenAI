import React from "react";
import PromptPresets from "./components/PromptPresets.js";
import PromptForm from "./components/PromptForm.js";
import PromptList from "./components/PromptList.js";

/*
Create function component "App" that returns a React fragment holding all other HTML & function components
Returns heading title "Fun with OpenAI",
PromptPresets component with onAddPrompt handler,
PromptForm component with onAddPrompt handler,
conditional React that will return nothing if promptList state variable has a length of 0,
if propmtList state variable has a length greater than 0 return PromptList component with onRemovePrompt handler and promptList prop.
*/
function App() {

  /*
  Call and destructure React.useState hook to set promptList variable with value defined by setPromptList function.
  promptList is initialized as the previous promptList named "savedPrompts" in localStorage if value is falsly promptList is initialized as an empty array.
  */
  const [promptList, setPromptList] = React.useState(JSON.parse(localStorage.getItem("savedPrompts"))||[]);


  /*
  React.useEffect provides a side effect to be ran based on dependancy.
  If a change occurs in promptList state variable this code is implemented which stores the updated promptList in localStorage
  */
  React.useEffect(() => {
    localStorage.setItem("savedPrompts", JSON.stringify(promptList))
  }, [promptList]);

  /*
  addTodo function accepts newPrompt parameter
  calls setPromptList setter function which accepts an array containing newPrompt item and spreaded promptList items.
  */
  const addPrompt = (newPrompt) => setPromptList([newPrompt, ...promptList]);

  /*
  removeTodo function accepts promptID parameter
  current promptist is then filtered to return a new promptList named listAfterRemovedItem
  listAfterRemovedItem contains all previous list items without the corresponding promptID argument
  calls setPromptList setter function which accepts an array with spreaded listAfterRemovedItem items
  */
  const removePrompt = (promptID) => {
    const listAfterRemovedItem = promptList.filter((item) => item.id !== promptID);
    return(
      setPromptList([...listAfterRemovedItem])
    );
  };

  return (
    <>
      <h1>Fun with OpenAI</h1>
      <h2>Try a preset or enter your own prompt in the input feild below!</h2>
      <p>Learn more about OpenAI and GTP-3 <a href="https://beta.openai.com/"><strong>here.</strong></a></p>
      <section>
        <PromptPresets onAddPrompt={addPrompt}/>
        <PromptForm onAddPrompt={addPrompt}/>
      </section>
      {promptList.length !== 0 &&
        <PromptList promptList={promptList} onRemovePrompt={removePrompt}/>
      }
    </>
  );
};

export default App;
