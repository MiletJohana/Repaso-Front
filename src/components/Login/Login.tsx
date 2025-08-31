import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirigir
import './Login.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false); // Estado de carga

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 🌐 Aquí enviamos los datos al backend Django
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      // ✅ Si el login es exitoso
      if (data.success) {
        // Opcional: guardar usuario en localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        // Redirigir a la página de tareas
        navigate('/tareas');
      } else {
        // ❌ Si las credenciales son incorrectas
        setError(data.message || 'Credenciales inválidas');
      }
    } catch (err) {
      // ❌ Error de conexión (ej. backend apagado)
      setError('No se pudo conectar con el servidor. Intenta más tarde.');
      console.error('Error al conectar con el backend:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-background">
      <div className="login-card">
        <h2 className="login-title">Iniciar Sesión</h2>

        {/* Mensaje de error */}
        {error && (
          <div className="alert alert-danger p-2 mb-3 text-center" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Campo de Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo electrónico
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              required
            />
          </div>

          {/* Campo de Contraseña */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {/* Botón de envío */}
          <button
            type="submit"
            className="btn btn-primary login-btn w-100"
            disabled={loading}
          >
            {loading ? 'Cargando...' : 'Ingresar'}
          </button>
        </form>

        <div className="text-center mt-3">
          <small className="text-muted">
            ¿No tienes cuenta? <a href="#register">Regístrate</a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;