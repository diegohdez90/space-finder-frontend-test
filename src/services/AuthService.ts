import { User } from '../models/User';
import { UserAttribute } from '../models/UserAttribute';

export class AuthService {
    public async login(
        username: string,
        password: string
    ) : Promise<User | undefined> {
        if(username === 'user' && password === '1234') {
            return {
                name: 'John Doe',
                email: 'jdoe@mail.com'
            }
        }
        return undefined
    }

    public async getUserAttributes(user: User): Promise<UserAttribute[]> {
        const result: UserAttribute[] = [];
        result.push({
            name: 'description',
            value: 'Best user ever'
        });
        result.push({
            name: 'job',
            value: 'Engineer'
        });
        result.push({
            name: 'age',
            value: '25'
        });
        result.push({
            name: 'experience',
            value: '6 years'
        });

        return result;
    }
}
