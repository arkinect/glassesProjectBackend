import { createContext, useContext, useEffect, useState } from "react";
import { BackendURL } from "../..";
import { useLocation } from "react-router-dom";
import { AuthContextType, User } from "../../interfaces";

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  loading: true,
  setAuth: () => {},
  setUser: () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch(`${BackendURL}/auth/check`, { credentials: "include" });
                if (res.ok) {
                    const data = await res.json();
                    if (data.user) {
                        setUser(data.user);
                        setIsAuthenticated(true);
                    }
                    else {
                        setUser(null);
                        setIsAuthenticated(false);
                    }
                }
            } 
            catch (err) {
                setUser(null);
                setIsAuthenticated(false);
            } 
            finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    // every time route changes check is auth status 
    const { pathname } = useLocation();
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch(`${BackendURL}/auth/check`, { credentials: "include" });
                if (res.ok) {
                    const data = await res.json();
                    if (data.user) {
                        setUser(data.user);
                        setIsAuthenticated(true);
                    } 
                    else {
                        setUser(null);
                        setIsAuthenticated(false);
                    }
                } 
                else {
                    setUser(null);
                    setIsAuthenticated(false);
                }
            } 
            catch {
                setUser(null);
                setIsAuthenticated(false);
            }
        };
        checkAuth();
    }, [pathname]);

    // expose logout method
    const logout = () => {
        sessionStorage.clear();
        setIsAuthenticated(false); 
        setUser(null);
        window.location.href = `${BackendURL}/auth/logout`;
    };

    return (
        <AuthContext.Provider 
            value={{ 
                isAuthenticated, 
                user, 
                loading, 
                setAuth: setIsAuthenticated, 
                setUser, 
                logout, }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);