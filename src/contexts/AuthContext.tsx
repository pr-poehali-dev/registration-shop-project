import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthContextType, User } from "@/types/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (phone: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    // Симуляция API запроса
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Проверяем существующих пользователей
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const existingUser = users.find(
      (u: any) => u.phone === phone && u.password === password,
    );

    if (existingUser) {
      const userData = { id: existingUser.id, phone: existingUser.phone };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      setIsLoading(false);
      return true;
    }

    setIsLoading(false);
    return false;
  };

  const register = async (
    phone: string,
    password: string,
  ): Promise<boolean> => {
    setIsLoading(true);

    // Симуляция API запроса
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Проверяем, существует ли пользователь
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const existingUser = users.find((u: any) => u.phone === phone);

    if (existingUser) {
      setIsLoading(false);
      return false;
    }

    // Создаем нового пользователя
    const newUser = {
      id: Date.now().toString(),
      phone,
      password,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    const userData = { id: newUser.id, phone: newUser.phone };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
