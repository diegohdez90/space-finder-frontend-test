import ReactDOM from 'react-dom';
import Login from '../../src/pages/Login';
import { fireEvent, waitForElementToBeRemoved } from '@testing-library/react';

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

        const res = await expect(authServiceMock.login).toBeCalledWith(
            'user',
            '1234'
        );

        console.log('res', res);
        
    });

    afterEach(() => {
        document.body.removeChild(container);
        container.remove();
        jest.clearAllMocks();
    });
});

