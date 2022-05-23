import { User } from "../models/User";

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
}
