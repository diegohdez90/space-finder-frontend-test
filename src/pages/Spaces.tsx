import React, { Component } from 'react';
import SpaceItem from '../components/SpaceItem';
import { Space } from '../models/Space';
import { DataService } from '../services/DataService';

interface Props {
  dataService: DataService
}

interface State {
  spaces: Space[] | undefined
}

class Spaces extends Component<Props, State> {

  state: State = {
    spaces: undefined
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
    
  }

  render() {
    return (
      <div>
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