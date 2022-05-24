import { Space } from "../models/Space";

export class DataService {
    public async getSpaces(): Promise<Space[]> {
        const spaces: Space[] = [];
        spaces.push({
            name: 'Location',
            location: 'Paris',
            spaceId: '123'
        });
        spaces.push({
            name: 'Location',
            location: 'Paris',
            spaceId: '123'
        });
        spaces.push({
            name: 'Location',
            location: 'Paris',
            spaceId: '123'
        });
        spaces.push({
            name: 'Location',
            location: 'Paris',
            spaceId: '123'
        });
        spaces.push({
            name: 'Location',
            location: 'Paris',
            spaceId: '123'
        });
        return spaces;
    }
}
