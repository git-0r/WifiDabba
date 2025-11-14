import { User } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signUp: (name: string, email: string) => Promise<boolean>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        const userDataString = await AsyncStorage.getItem("user");
        if (userDataString) {
          setUser(JSON.parse(userDataString) as User);
        }
      } catch (e) {
        console.error("Failed to load user from storage", e);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  const signUp = async (name: string, email: string): Promise<boolean> => {
    try {
      const userData: User = { name, email };
      await AsyncStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      return true;
    } catch (e) {
      console.error("Failed to save user", e);
      return false;
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem("user");
      setUser(null);
    } catch (e) {
      console.error("Failed to remove user", e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signUp, signOut, isLoading }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
