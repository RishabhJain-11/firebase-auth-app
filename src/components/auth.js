import { auth, googleProvider } from '../config/firebase'; 
import { createUserWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'; 
import { useState, useEffect } from 'react'; 
import '../styles/auth.css'; 

export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, []);

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error(error);
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error(error);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                {user ? (
                    <div className="user-info">
                        <h2>Welcome, {user.displayName || "User"}!</h2>
                        <button onClick={logout} className="auth-button logout-button">Logout</button>
                    </div>
                ) : (
                    <>
                        <h1>Create your account</h1>
                        <button onClick={signInWithGoogle} className="auth-button google-button">Sign in with Google</button>
                        <hr className="divider" />
                        <input
                            type="email"
                            placeholder="Email Address"
                            onChange={(e) => setEmail(e.target.value)}
                            className="auth-input"
                        />
                        <input
                            type="text"
                            placeholder="First Name"
                            onChange={(e) => setFirstName(e.target.value)}
                            className="auth-input"
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            onChange={(e) => setLastName(e.target.value)}
                            className="auth-input"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="auth-input"
                        />
                        <input
                            type="text"
                            placeholder="Company Name (Optional)"
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="auth-input"
                        />
                        <div className="checkbox-container">
                            <input type="checkbox" id="privacy" />
                            <label htmlFor="privacy">
                                I accept the <a href="/">Privacy Policy</a> and <a href="/">Terms of Service</a>
                            </label>
                        </div>
                        <div className="captcha-container">
                            <span>I'm not a robot</span>
                        </div>
                        <button onClick={signIn} className="auth-button">Sign Up</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Auth;
