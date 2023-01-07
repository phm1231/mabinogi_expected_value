import React from 'react';

class OnlyInputNumber extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          empty: ''
        }
      }
      
      handleChange(evt) {
        const empty = (evt.target.validity.valid) ? evt.target.value : this.state.empty;
        this.setState({ empty });
      }
      render() {
        return (
          <input type="text" pattern="[0-9]*" onInput={this.handleChange.bind(this)} value={this.state.empty} />
        )
      }
}

export default OnlyInputNumber