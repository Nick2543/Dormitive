import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage(){
    const [name, setName] = useState('');
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    async function registerUser(ev){
        ev.preventDefault();
        try{
            await axios.post('/register', {
                name,
                email,
                password,
            });
            alert("Registration done successfully. You can login now.");
        } catch {
            alert("Registration failed, either email already in use or try again later");
        }

    }
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-60">
            <h1 className="text-4xl text-center text-gold mb-4">Register</h1>
            <form className="max-w-md mx-auto " onSubmit={registerUser}>
                <input type="text" placeholder="Enter your name"
                    value={name}
                    onChange={ev => setName(ev.target.value)} />
                <input type="email" placeholder="Enter your email"
                    value={email}
                    onChange={ev => setEmail(ev.target.value)}/>
                <input type="password" placeholder="Type in your password"
                    value={password}
                    onChange={ev => setPassword(ev.target.value)}/>
                <button className="primary text-gold">Register</button>
                <div className="text-center py-2 text-gray-400">
                    Have an account already? <Link className="underline text-gold" to={'/login'}>Login here.</Link>
                </div>
            </form>
            </div>
        </div>
    );
}