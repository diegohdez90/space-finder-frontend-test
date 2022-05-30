import React, { Component } from 'react';
import './SpaceItemModal.css';

interface Props {
  show: boolean
  content: string,
  close: () => void
}

class SpaceItemModal extends Component<Props> {

  private onClose = (e: React.MouseEvent<HTMLElement>) => {
    this.props.close()
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className='modal'>
        <div className='modal-content'>
          <h4>You tried to reserve and ...</h4>
          <h5 className='modalText'>{
            this.props.content
          }</h5>
          <button onClick={this.onClose}>OK, close</button>
        </div>
      </div>
    )
  }
}

export default SpaceItemModal