import * as ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router';
import NavBar from '../../src/components/NavBar';
import { User } from '../../src/models/User';
import { getByTestId } from '@testing-library/react';

describe('Navbar test suite', () => {
    let container: HTMLDivElement;
    const someUser: User = {
        name: 'someName',
        email: 'someEmail'
    };
    const baseLink = 'http://localhost';

    test('renders correctly with user', () => {
        container = document.createElement('div');
        document.body.appendChild(container);
        ReactDOM.render(
            <MemoryRouter>
                <NavBar
                    user={someUser}
                />
            </MemoryRouter>, container);
        
        const links = container.querySelectorAll('a');
        expect(links[0].href).toBe(baseLink + '/');
        expect(links[1].href).toBe(baseLink + '/profile');
        expect(links[2].href).toBe(baseLink + '/spaces');
        expect(links[3].href).toBe(baseLink + '/logout');
    });

    test('renders correctly with user using data-test', () => {
        container = document.createElement('div');
        document.body.appendChild(container);
        ReactDOM.render(
            <MemoryRouter>
                <NavBar
                    user={someUser}
                />
            </MemoryRouter>, container);
        const homeLink = getByTestId(container, 'home-link') as HTMLAnchorElement;
        expect(homeLink.href).toBe(baseLink + '/');

        const profileLink = getByTestId(container, 'profile-link') as HTMLAnchorElement;
        expect(profileLink.href).toBe(baseLink + '/profile');

        const spacesLink = getByTestId(container, 'spaces-link') as HTMLAnchorElement;
        expect(spacesLink.href).toBe(baseLink + '/spaces');
    });

    test('renders correctly without user using data-test', () => {
        container = document.createElement('div');
        document.body.appendChild(container);
        ReactDOM.render(
            <MemoryRouter>
                <NavBar
                    user={undefined}
                />
            </MemoryRouter>, container);

        const loginLink = getByTestId(container, 'login-link') as HTMLAnchorElement;
        expect(loginLink.href).toBe(baseLink + '/login');
    });

    afterEach(() => {
        document.body.removeChild(container);
        container.remove();
    });
})
