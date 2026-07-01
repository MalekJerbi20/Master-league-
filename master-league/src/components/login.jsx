import { useState } from "react"
import axios from "axios"
import { Navigate, useNavigate } from "react-router-dom"

function Login () {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({username: "" , password: ""})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    async function handleSubmit (e) {
        e.preventDefault()
        setLoading(true)
        setError("")
        try{
            const res = await axios.post("http://localhost:5000/api/auth/login", formData)
            console.log("response from server", res.data)
            alert("Login Successful")
            navigate('/profile')
        } catch (error) {
            console.error("error during login", error)
            const errorMsg = error.response?.data?.message || error.message
            setError(errorMsg)
            alert("Login Failed: " + errorMsg)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4">
            <div className="card-modern p-8 w-full max-w-md">
                <h1 className="gradient-text text-3xl font-bold mb-2 text-center">Welcome Back</h1>
                <p className="text-gray-400 text-center mb-8">Sign in to your account</p>

                {error && (
                    <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                        <input 
                            type="text" 
                            placeholder="Enter your username"
                            value={formData.username} 
                            onChange={(e) => setFormData( {...formData ,username: e.target.value} )}
                            className="form-input"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                        <input 
                            type="password" 
                            placeholder="Enter your password"
                            value={formData.password} 
                            onChange={(e) => setFormData({...formData , password : e.target.value})} 
                            className="form-input"
                            required
                        />
                    </div>
                    <button 
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="text-center text-gray-400 mt-6">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">
                        Sign up here
                    </a>
                </p>
            </div>
        </div>
    )
}

export default Login