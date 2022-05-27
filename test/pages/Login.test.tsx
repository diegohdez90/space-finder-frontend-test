import { createRoot } from 'react-dom/client';
import Login from '../../src/pages/Login';

describe('Login component test suite', () => {

    let container: HTMLDivElement;
    const authServiceMock = {
        login: jest.fn()
    };
    const setUserMock = jest.fn();

    beforeEach(()=> {
        container = document.createElement('div');
        document.body.appendChild(container);
        const root = createRoot(container);
        root.render(<Login
            authService={authServiceMock as any}
            setUser={setUserMock}
        />);
    });

    test('Initial test', () => {
        expect(true).toBeTruthy();
    });

    afterEach(() => {
        document.body.removeChild(container);
        container.remove();
        jest.clearAllMocks();
    });
});

