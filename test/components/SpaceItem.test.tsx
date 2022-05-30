import * as ReactDOM from 'react-dom';
import SpaceItem from '../../src/components/SpaceItem';

describe('Space component test suite', () => {
    let container: HTMLDivElement;
    const reserveSpaceMock = jest.fn();

    describe('Test with photo profile', () => {

        beforeEach(() => {
            container = document.createElement('div');
            document.body.appendChild(container);
            ReactDOM.render(<SpaceItem
                location='Mexico'
                name='Office'
                reserveSpace={reserveSpaceMock}
                spaceId='1234'
            />, container);
        });

        test('Basic render', () => {

        });

        afterEach(() => {
            document.body.removeChild(container);
            container.remove();
            jest.clearAllMocks();
        });
    });

    describe('Test without photo profile', () => {

    });



});