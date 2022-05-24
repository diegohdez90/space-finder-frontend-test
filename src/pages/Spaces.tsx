import React, { Component } from 'react';
import SpaceItem from '../components/SpaceItem';
import SpaceItemModal from '../components/SpaceItemModal';
import { Space } from '../models/Space';
import { DataService } from '../services/DataService';

interface Props {
  dataService: DataService,
}

interface State {
  spaces: Space[] | undefined
  showModal: boolean,
  modalContent: string
}

class Spaces extends Component<Props, State> {

  state: State = {
    spaces: undefined,
    showModal: false,
    modalContent: ''
  }

  componentDidMount() {
    this.props
      .dataService
      .getSpaces()
      .then(res => {
        this.setState({
          spaces: res
        });
      });
  }

  onReserveSpace = (spaceId: string) => {
    this.props
      .dataService
      .reserveSpace(spaceId)
      .then(res => {
        if (res) {
          this.setState({
            showModal: true,
            modalContent: `You reserved space ${res}`
          });
        } else {
          this.setState({
            showModal: true,
            modalContent: 'You can\'t reserve this space'
          });
        }
      });
  }

  private onClose = () => {
    this.setState({
      showModal: false,
      modalContent: ''
    });
  }

  render() {
    return (
      <div>
        {this.state.showModal &&
          <SpaceItemModal
            close={this.onClose}
            content={this.state.modalContent}
            show={this.state.showModal}
          />}
        {
          this.state.spaces && this.state.spaces.map(space => (
            <SpaceItem
              spaceId={space.spaceId}
              name={space.name}
              location={space.location}
              reserveSpace={this.onReserveSpace}
            />
          ))
        }
      </div>
    )
  }
}

export default Spaces;