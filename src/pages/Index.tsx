import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/products");
    }
  }, [user, navigate]);

  if (user) {
    return null; // или loading spinner
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">
          Добро пожаловать!
        </h1>
        <p className="text-xl text-gray-600 mb-8">Магазин премиальных очков</p>
        <div className="space-y-4">
          <Link to="/login" className="block">
            <Button className="w-full bg-primary hover:bg-primary/90">
              Войти
            </Button>
          </Link>
          <Link to="/register" className="block">
            <Button variant="outline" className="w-full">
              Зарегистрироваться
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
