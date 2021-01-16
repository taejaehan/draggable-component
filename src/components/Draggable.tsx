import React from 'react';

import './draggable.css';

interface Props {
  children : React.ReactNode
}

interface State {
    
}

class Drggable extends React.Component<Props, State>{
	render() {
		return (
			<div className='MainApp'>
                {/* <div className='button' onClick={this.props.showBox.bind(this)}> Show Dialog </div> */}
                { this.props.children }
			</div>

		);
	}
} 
export default Drggable;
