import { backend } from './configs/axiosConfig'

const UserApi = {
    async getUser(email: string) {
        return await backend.get('/users?email=' + email)
    }
}

export { UserApi }
