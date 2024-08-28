import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function LoginPage(){
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);
    async function loginUser(ev){
        ev.preventDefault();
        try{
            const {data} = await axios.post('/login', {
                email,
                password,
            });
            setUser(data);
            alert("Login successful.");
            setRedirect(true);
            } catch {
            alert("Login Failed, check email or password.");
            }
        }

        if(redirect){
            return <Navigate to={'/'} />
        }


        return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-60">
            <h1 className="text-4xl text-center text-gold mb-4">Login</h1>
            <form className="max-w-md mx-auto " onSubmit={loginUser}>
                <input type="email" placeholder="Enter your email"
                    value={email}
                    onChange={ev => setEmail(ev.target.value)}/>
                <input type="password" placeholder="Type in your password"
                    value={password}
                    onChange={ev => setPassword(ev.target.value)}/>
                <button className="primary text-gold">Login</button>
                <div className="text-center py-2 text-gray-400">
                    {`Don't`} have an account? <Link className="underline text-gold" to={'/register'}>Register here.</Link>
                </div>
            </form>
            </div>
        </div>
    );
}