export interface User {
  id: string;
  phone: string;
  name?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (phone: string, password: string) => Promise<boolean>;
  register: (phone: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}
