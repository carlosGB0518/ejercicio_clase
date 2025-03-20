import React, { useState, useEffect } from 'react';
import { db } from './firebaseconfig'; // Importa tu configuración de Firebase
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [usuarioId, setUsuarioId] = useState(null);

  // Función para obtener todos los usuarios de la base de datos
  const obtenerUsuarios = async () => {
    const querySnapshot = await getDocs(collection(db, 'usuarios'));
    const usuariosArray = [];
    querySnapshot.forEach((doc) => {
      usuariosArray.push({ id: doc.id, ...doc.data() });
    });
    setUsuarios(usuariosArray);
  };

  // Función para agregar un nuevo usuariO
  const agregarUsuario = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'usuarios'), { nombre, email });
      setNombre('');
      setEmail('');
      obtenerUsuarios();
    } catch (error) {
      console.error('Error al agregar usuario: ', error);
    }
  };

  // Función para actualizar un usuario
  const actualizarUsuario = async (e) => {
    e.preventDefault();
    if (!usuarioId) return;

    const usuarioRef = doc(db, 'usuarios', usuarioId);
    try {
      await updateDoc(usuarioRef, { nombre, email });
      setNombre('');
      setEmail('');
      setUsuarioId(null);
      obtenerUsuarios();
    } catch (error) {
      console.error('Error al actualizar usuario: ', error);
    }
  };

  // Función para eliminar un usuario
  const eliminarUsuario = async (id) => {
    try {
      await deleteDoc(doc(db, 'usuarios', id));
      obtenerUsuarios();
    } catch (error) {
      console.error('Error al eliminar usuario: ', error);
    }
  };

  // Llamada inicial para cargar usuarios cuando el componente se monta
  useEffect(() => {
    obtenerUsuarios();
  }, []);

  return (
    <div>
      <h1>Gestión de Usuarios</h1>

      {/* Formulario para agregar o editar usuario */}
      <form onSubmit={usuarioId ? actualizarUsuario : agregarUsuario}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">{usuarioId ? 'Actualizar' : 'Agregar'}</button>
      </form>

      {/* Lista de usuarios */}
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>
            <span>{usuario.nombre} - {usuario.email}</span>
            <button onClick={() => { setUsuarioId(usuario.id); setNombre(usuario.nombre); setEmail(usuario.email); }}>Editar</button>
            <button onClick={() => eliminarUsuario(usuario.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
