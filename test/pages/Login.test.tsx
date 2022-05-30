import * as ReactDOM from 'react-dom';
import Login from '../../src/pages/Login';
import { fireEvent, waitFor } from '@testing-library/react';
import { User } from '../../src/models/User';
import history from '../../src/utils/history';

const someUser: User = {
    name: 'someUser',
    email: 'someEmail'
};

describe('Login component test suite', () => {

    let container: HTMLDivElement;
    const authServiceMock = {
        login: jest.fn()
    };
    const setUserMock = jest.fn();
    const historyMock = history;

    history.push = jest.fn();

    beforeEach(()=> {
        container = document.createElement('div');
        document.body.appendChild(container);
        ReactDOM.render(<Login
            authService={authServiceMock as any}
            setUser={setUserMock}
        />, container);
    });

    test('Render correctly', () => {
        const title = container.querySelector('h2');
        expect(title!.textContent).toBe('Login to spaces');

        const inputs = container.querySelectorAll('input');
        expect(inputs).toHaveLength(2);
        expect(inputs[0].value).toBe('');
        expect(inputs[1].value).toBe('');

        const submitButton = container.querySelectorAll('button');
        expect(submitButton).toHaveLength(1);
        expect(submitButton[0].type).toBe('submit');

        const span = document.querySelector('div.login-message');
        expect(span).not.toBeInTheDocument();
    });

    test('Passes credentials correctly', async() => {
        const inputs = container.querySelectorAll('input');
        const submitButton = container.querySelectorAll('button');

        const username = inputs[0];
        const password = inputs[1];

        fireEvent.change(username, {
            target: {
                value: 'someUser'
            }
        });

        fireEvent.change(password, {
            target: {
                value: 'somePassword'
            }   
        });

        fireEvent.submit(submitButton[0]);

        expect(authServiceMock.login).toBeCalledWith(
            'someUser',
            'somePassword'
        );
    });

    test('Correctly handles login success', async () => {
        authServiceMock.login.mockResolvedValueOnce(someUser);
        const inputs = document.querySelectorAll('input');
        const submitButton = document.querySelectorAll('button');

        const username = inputs[0];
        const password = inputs[1];

        fireEvent.change(username, {
            target: 'someUser'
        });

        fireEvent.change(password, {
            target: {
                value: 'somePassword'
            }   
        });

        fireEvent.submit(submitButton[0]);
        
        const status = await waitFor(() => {
            const message = container.querySelector('div.login-message');
            if (message?.children.length == 1) {
                return {
                    node: message || null,
                    message: message?.querySelector('span'),
                }
            }
            return null;
        });

        expect(status?.node).toBeInTheDocument();

        expect(status?.message).toHaveTextContent('Login successful');
        expect(setUserMock).toBeCalledWith(someUser);
        expect(historyMock.push).toBeCalledWith('/profile');
    });


    test('Correctly handles login failure', async () => {
        authServiceMock.login.mockResolvedValueOnce(undefined);
        const inputs = document.querySelectorAll('input');
        const submitButton = document.querySelectorAll('button');

        const username = inputs[0];
        const password = inputs[1];

        fireEvent.change(username, {
            target: 'someUser'
        });

        fireEvent.change(password, {
            target: {
                value: 'somePassword'
            }   
        });

        fireEvent.submit(submitButton[0]);
        
        const status = await waitFor(() => {
            const message = container.querySelector('div.login-message');
            if (message?.children.length == 1) {
                return {
                    node: message || null,
                    message: message?.querySelector('span'),
                }
            }
            return null;
        });

        expect(status?.node).toBeInTheDocument();
        expect(status?.message).toHaveTextContent('Login failed');
    });

    afterEach(() => {
        document.body.removeChild(container);
        container.remove();
        jest.clearAllMocks();
    });
});

