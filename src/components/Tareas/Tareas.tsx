import React from 'react';

const Tareas: React.FC = () => {
  return (
    <div className="container mt-5 text-center">
      <h1 className="text-success">🎉 ¡Bienvenido a tu Panel de Tareas!</h1>
      <p>Este es un componente simple de prueba.</p>
      <div className="alert alert-info">
        <strong>Próximamente:</strong> Lista de tareas, creación, edición y más.
      </div>
    </div>
  );
};

export default Tareas;