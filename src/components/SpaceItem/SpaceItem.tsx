import React, { Component } from 'react';
import './SpaceItem.css';

interface Props {
  spaceId: string,
  name: string,
  location: string,
  photoUrl?: string,
  reserveSpace: (spaceId: string) => void
}

class SpaceItem extends Component<Props> {

  private renderImage = () => {
    if (this.props.photoUrl) {
      return <img src={this.props.photoUrl} alt="space" srcSet={this.props.photoUrl} />
    }
    return <img src='https://via.placeholder.com/150' alt="no-available" srcSet='https://via.placeholder.com/150' />
  }

  private onReserveSpace = (e: React.MouseEvent<HTMLElement>) => {
    this.props.reserveSpace(this.props.spaceId)
  }

  render() {
    return (
      <div className='spaceComponent'>
        {this.renderImage()}
        <label className='name'>{this.props.name}</label>
        <label className='spaceId'>{this.props.spaceId}</label>
        <label className='location'>{this.props.location}</label>
        <button
          onClick={this.onReserveSpace}
        >Reserve</button>
      </div>
    )
  }
}

export default SpaceItem;
