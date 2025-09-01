import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Registro: React.FC = () => {
  const [nombre, setNombre] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validación básica
    if (!nombre || !email || !password) {
      setError('Todos los campos son obligatorios');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      // 🌐 Enviar datos al backend Django
      const response = await fetch('http://localhost:8000/api/registro/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: nombre,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // ✅ Registro exitoso
        alert('Registro completado. Ahora puedes iniciar sesión.');
        navigate('/'); // Redirige al login
      } else {
        // ❌ Error desde el backend
        setError(data.message || 'Error en el registro');
      }
    } catch (err) {
      // ❌ Error de conexión
      setError('No se pudo conectar con el servidor. Intenta más tarde.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-background">
      <div className="login-card">
        <h2 className="login-title">Crear Cuenta</h2>

        {error && (
          <div className="alert alert-danger p-2 mb-3 text-center" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Campo Nombre */}
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre completo
            </label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Juan Pérez"
              required
            />
          </div>

          {/* Campo Email */}
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

          {/* Campo Contraseña */}
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
              minLength={6}
              required
            />
          </div>

          {/* Botón de envío */}
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>

        <div className="text-center mt-3">
          <small className="text-muted">
            ¿Ya tienes cuenta?{' '}
            <a href="/" style={{ textDecoration: 'underline' }}>
              Inicia sesión
            </a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Registro;