import React from 'react';
import InputPrice from './components/InputPrice';
import SelectList from './components/SelectList';
class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username:null,
        };
    }

  render() {
    return (
        <div className="App">
          <header className="App-header">
            <div>
              <InputPrice></InputPrice>
              <SelectList title={['1234567890', 'b', 'c', 'd']}></SelectList>
            </div>
          </header>
        </div>
    );
  }
}

export default App;