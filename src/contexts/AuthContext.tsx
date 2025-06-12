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
    const checkAuth = () => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          localStorage.removeItem("user");
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (phone: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    try {
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
        return true;
      }

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    phone: string,
    password: string,
  ): Promise<boolean> => {
    setIsLoading(true);

    try {
      // Симуляция API запроса
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Проверяем, существует ли пользователь
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const existingUser = users.find((u: any) => u.phone === phone);

      if (existingUser) {
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

      return true;
    } finally {
      setIsLoading(false);
    }
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
