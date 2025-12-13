import { useState } from "react"

function login () {
    const [formData, setFormData] = useState({username: "" , password: ""})
    function handleSubmit (e) {
        e.preventDefault()
        console.log("form submitted",formData)
    }
    return (
        <div>
            <h1>Login Page</h1>

            <form action="" onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={formData.username} onChange={(e) => setFormData( {...formData ,username: e.target.value} )}/>
                <input type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({...formData , password : e.target.value})} />
                <button type="submit">Login</button> 
            </form>
        </div>
    )
}export default login