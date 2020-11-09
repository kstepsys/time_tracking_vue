import HttpClient from './HttpClient';
export default class User {
    static async createUser(email, password) {
        const client = new HttpClient();
        try {
            await client.instance.post('users', {
                email: email,
                password: password
            });

            return true;
        } catch {

            return false;
        }
    }

    static async login(email, password) {
        const client = new HttpClient();
        try {
            const loginResponse = await client.instance.post('users/login', {
                email: email,
                password: password
            });
            const jwtToken = loginResponse.data;
            sessionStorage.setItem('jwt', jwtToken);

            return true
        } catch {
            
            return false;
        }
    }
}