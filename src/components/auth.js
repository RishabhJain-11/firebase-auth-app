import { auth, googleProvider } from '../config/firebase'; // Import Firebase authentication and Google provider
import { createUserWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'; // Import Firebase auth methods
import { useState, useEffect } from 'react'; // Import React hooks
import '../styles/auth.css'; // Import CSS for styling

export const Auth = () => {
    const [email, setEmail] = useState(""); // State to hold email input
    const [password, setPassword] = useState(""); // State to hold password input
    const [user, setUser] = useState(null); // State to hold the signed-in user's information

    // Listen to auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); // Update the user state when auth state changes
        });

        return () => unsubscribe(); // Cleanup the listener on unmount
    }, []);

    // Function to handle sign-in with email and password
    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error(error); // Log any errors
        }
    }

    // Function to handle sign-in with Google
    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.error(error); // Log any errors
        }
    }

    // Function to handle logout
    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error(error); // Log any errors
        }
    }

    return (
        <div className="auth-container"> {/* Container for the auth form */}
            <div className="auth-form"> {/* Form container */}
                {user ? ( // If user is signed in, show user info and logout button
                    <div className="user-info">
                        <h2>Welcome, {user.displayName || "User"}!</h2> {/* Display user's name or fallback */}
                        <button onClick={logout} className="auth-button logout-button">Logout</button>
                    </div>
                ) : ( // If no user is signed in, show sign-in form
                    <>  
                        <input 
                            type='username'
                            placeholder='Username'
                            onChange={(e) => setUser(e.target.value)}
                            className='auth-input'
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="auth-input"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="auth-input"
                        />
                        <button onClick={signIn} className="auth-button">Sign In</button>
                        <button onClick={signInWithGoogle} className="auth-button google-button">Sign in with Google</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Auth; // Export the Auth component as default