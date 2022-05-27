import ReactDOM from 'react-dom';
import Login from '../../src/pages/Login';
import { fireEvent, waitFor } from '@testing-library/react';
import { User } from '../../src/models/User';

const user: User = {
    name: 'John Doe',
    email: 'jdoe@mail.com'
};

describe('Login component test suite', () => {

    let container: HTMLDivElement;
    const authServiceMock = {
        login: jest.fn()
    };
    const setUserMock = jest.fn();

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
                value: 'user'
            }   
        });

        fireEvent.change(password, {
            target: {
                value: '1234'
            }   
        });

        fireEvent.submit(submitButton[0]);

        expect(authServiceMock.login).toBeCalledWith(
            'user',
            '1234'
        );
    });

    test('Correctly handles login access', async () => {
        authServiceMock.login.mockResolvedValueOnce(user);
        const inputs = container.querySelectorAll('input');
        const submitButton = container.querySelectorAll('button');

        const username = inputs[0];
        const password = inputs[1];

        fireEvent.change(username, {
            target: {
                value: 'user'
            }   
        });

        fireEvent.change(password, {
            target: {
                value: '1234'
            }   
        });

        fireEvent.click(submitButton[0]);

        const status = await waitFor(() => {
            container.querySelector('div.login-message');
        });

        expect(status).toBeInTheDocument();
        expect(status.querySelector('span')).toHaveTextContent('Login successful');
    });

    afterEach(() => {
        document.body.removeChild(container);
        container.remove();
        jest.clearAllMocks();
    });
});

