import React from 'react';
import Drggable from './components/Draggable';
import Box from './components/Box';

const App: React.FC = () => {
  return (
    <div className="App">
      <Drggable >
        <Box />
      </Drggable>
    </div>
  );
}

export default App;
