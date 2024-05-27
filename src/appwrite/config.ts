import { Account, Client, ID } from "appwrite"
import { config } from "../config/config"

type CreateUserAccount = {
    email: string,
    password: string,
    name: string
}

interface LoginUserAccount {
    email: string;
    password: string;
}

const appwriteClient = new Client()
    .setEndpoint(config.appwriteEndpoint)
    .setProject(config.appwriteProjectId);

export const account = new Account(appwriteClient)

class AppwriteService {
    async createUserAccount({ email, password, name }: CreateUserAccount) {
        try {
            const userAccount = await account.create(ID.unique(), email, password, name)

            if (userAccount) {
                return this.login({ email, password })
            }
            return userAccount
        }
        catch (error) {
            throw error
        }
    }

    async login({ email, password }: LoginUserAccount) {
        try {
            return account.createEmailPasswordSession(email, password)
        }
        catch (error) {
            throw error
        }
    }

    async isLoggedIn(): Promise<boolean> {
        try {
            const data = await this.getCurrentUser()
            return Boolean(data)
        }
        catch (error) {
            return false
        }
    }

    async getCurrentUser() {
        try {
            return account.get()
        }
        catch (error) {
            console.log("getCurrentUser error", error)
        }
    }

    async logout() {
        try {
            return account.deleteSession('current')
        }
        catch (error) {
            console.log('logout error', error)
        }
    }
}

export const appwriteService = new AppwriteService()