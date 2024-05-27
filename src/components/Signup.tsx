"use client"

import { appwriteService } from "@/appwrite/config"
import { useAuth } from "@/context/useAuth"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

const SignUp = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: ""
    })
    const [error, setError] = useState("")

    const { authStatus, setAuthStatus } = useAuth()

    const router = useRouter()

    const create = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const useData = await appwriteService.createUserAccount(formData)
            if (useData) {
                setAuthStatus(true)
                router.push("/profile")
            }
        }
        catch (error: any) {
            setError(error.message)
        }
    }

    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-50 rounded-xl p-10 shadow-sm border border-primary`}>
                <div className="mb-8 flex justify-center">
                    <span className="inline-block w-full max-w-[60px]">
                        <img src="/favicon.ico" alt="Logo" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight text-black">
                    Sign up to create account
                </h2>
                <p className="mt-2 text-center text-base text-gray-600">
                    Already have an account?&nbsp;
                    <Link
                        href="/login"
                        className="font-medium text-primary transition-all text-amber-800 duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={create} className="mt-8">
                    <div className="space-y-5">
                        <div>
                            <label htmlFor="name" className="text-base font-medium text-gray-900">
                                Full Name
                            </label>
                            <div className="mt-2">
                                <input
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="text"
                                    placeholder="Full Name"
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, name: e.target.value }))
                                    }
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="text-base font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, email: e.target.value }))
                                    }
                                    placeholder="Email"
                                    id="email"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="text-base font-medium text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                    type="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            password: e.target.value,
                                        }))
                                    }
                                    id="password"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="inline-flex w-full items-center justify-center rounded-md bg-primary px-3.5 py-2.5 font-semibold bg-amber-800 leading-7 text-white hover:bg-primary/80"
                            >
                                Create Account
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp