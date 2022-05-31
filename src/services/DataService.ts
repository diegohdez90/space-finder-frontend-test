import { Space } from "../models/Space";

export class DataService {

    private spaces: Space[];
    constructor() {
        this.spaces = 
        [{
            name: 'Location',
            location: 'Paris',
            spaceId: '123'
        }, {
            name: 'Location',
            location: 'Paris',
            spaceId: '124'
        }, {
            name: 'Location',
            location: 'Paris',
            spaceId: '125'
        }, {
            name: 'Location',
            location: 'Paris',
            spaceId: '126'
        }, {
            name: 'Location',
            location: 'Paris',
            spaceId: '127'
        }];
    }

    public async getSpaces(): Promise<Space[]> {
        return this.spaces;
    }

    public async reserveSpace(spaceId: string): Promise<string | undefined> {
        const res = this.spaces.find(space => space.spaceId === spaceId);
        if (res) {
            return '5555';
        }
        return undefined;
    }
}
