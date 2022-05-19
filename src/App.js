import React from "react";
import PromptForm from "./components/PromptForm.js"
import PromptList from "./components/PromptList.js"

function App() {

  const [promptList, setPromptList] = React.useState([]);

  const addPrompt = (newPrompt) => setPromptList([...promptList, newPrompt]);

  const removePrompt = (promptID) => {
    const newPromptList = promptList.filter((item) => item.id !== promptID);
    return(
      setPromptList([...newPromptList])
    );
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Fun with GPT-3</h1>
      <PromptForm onAddPrompt={addPrompt}/>
      <PromptList promptList={promptList} onRemovePrompt={removePrompt}/>
    </div>
  );
};

export default App;
