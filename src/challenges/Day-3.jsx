import React, { useState } from 'react';
import { Plus, Minus, Check } from 'lucide-react';
import { useNavigate } from 'react-router';
import Footer from '../Footer';

const TodoItem = ({ todo, toggleComplete, removeItem }) => {
  return (
    <div
      className={`
      flex items-center p-2 my-2 rounded-md border border-gray-200 
      transition-all duration-300 ease-in-out transform
      ${todo.completed ? 'bg-gray-50' : 'bg-white'}
      hover:shadow-md hover:border-gray-300
    `}
    >
      <button
        onClick={() => toggleComplete(todo.id)}
        className="flex-shrink-0 mr-3 focus:outline-none"
        style={{ transition: 'all 0.3s' }}
      >
        <div
          className={`
          w-6 h-6 rounded-sm flex items-center justify-center
          transition-all duration-300 ease-in-out
          ${
            todo.completed
              ? 'bg-green-500 border-green-500'
              : 'bg-white border-gray-400 hover:border-gray-600'
          }
          border-2 relative overflow-hidden
        `}
        >
          <div
            className={`
            absolute inset-0 bg-green-400 origin-left
            ${todo.completed ? 'scale-x-100' : 'scale-x-0'}
            transition-transform duration-300 ease-in-out
          `}
          />

          <Check
            className={`
              text-white z-10
              transition-all duration-300 ease-in-out
              ${
                todo.completed
                  ? 'opacity-100 transform scale-100'
                  : 'opacity-0 transform scale-0'
              }
            `}
            strokeWidth={3}
            size={16}
            style={{
              transitionDelay: todo.completed ? '0.1s' : '0s',
            }}
          />
        </div>
      </button>

      <div className="flex-grow relative overflow-hidden text-left">
        <span
          className={`
            inline-block transition-all duration-300 ease-in-out
            ${todo.completed ? 'text-gray-400' : 'text-gray-700'}
          `}
        >
          {todo.text}
        </span>

        {/* Strikethrough line with gradient */}
        <div
          className={`
            absolute inset-y-1/2 left-0 h-px w-full
            bg-gradient-to-r from-green-300 via-green-500 to-green-300
            transition-transform duration-500 ease-in-out
            ${todo.completed ? 'transform scale-x-100' : 'transform scale-x-0'}
          `}
          style={{ transformOrigin: 'left' }}
        />
      </div>

      <button
        onClick={() => removeItem(todo.id)}
        className={`
          flex-shrink-0 ml-2 rounded-full p-1
          transition-all duration-300 ease-in-out
          hover:bg-red-100 hover:text-red-500
          focus:outline-none
          opacity-0 group-hover:opacity-100 hover:opacity-100
          text-red-400
        `}
        aria-label="Remove item"
      >
        <Minus size={18} />
      </button>
    </div>
  );
};

const TodoList = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([
    { id: 1, text: 'Peerlist Day 1 Challenge', completed: true },
    { id: 2, text: 'Peerlist Day 2 Challenge', completed: true },
    { id: 3, text: 'Peerlist Day 3 Challenge', completed: false },
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [nextId, setNextId] = useState(4);
  const [itemToRemove, setItemToRemove] = useState(null);

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo = {
        id: nextId,
        text: newTodo,
        completed: false,
      };

      setTodos([...todos, todo]);
      setNewTodo('');
      setNextId(nextId + 1);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeItem = (id) => {
    setItemToRemove(id);
    setTimeout(() => {
      setTodos(todos.filter((todo) => todo.id !== id));
      setItemToRemove(null);
    }, 500);
  };

  const handleGoBack = () => {
    return navigate('/');
  };

  return (
    <main className="relative min-h-screen">
      {/* Main Content */}
      <section className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-orange-500 via-gray-800 to-blue-600 px-4">
        <section className="text-center">
          <h1
            className="text-5xl font-bold text-white mb-4 tracking-wide"
            style={{ textShadow: '0 0 20px rgba(255,255,255,0.4)' }}
          >
            UI Animation{' '}
            <span className="relative inline-block">
              Challenge{' '}
              <span class="absolute top-0 -right-10 md:-right-8 text-sm text-white tracking-tight font-bold">
                Day 3
              </span>
            </span>
          </h1>
          <div className="w-full max-w-2xl h-0.5 bg-white/50 mx-auto"></div>

          <div className="my-10 max-w-md mx-auto p-6 bg-slate-100 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
              Todo List
            </h1>

            <div className="flex mb-4 overflow-hidden rounded-md shadow-sm border border-gray-300 focus-within:ring-2 focus-within:ring-orange-500 focus-within:border-transparent">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Add a new task..."
                className="flex-grow px-4 py-3 border-none focus:outline-none text-gray-700"
              />
              <button
                onClick={addTodo}
                className="px-4 py-2 bg-orange-500 text-white hover:bg-orange-600 focus:outline-none transition-colors duration-300 flex items-center justify-center cursor-pointer"
                aria-label="Add todo"
              >
                <Plus size={20} />
              </button>
            </div>

            <div className="space-y-1">
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className={`
              transition-all duration-500 ease-in-out transform group
              ${
                itemToRemove === todo.id
                  ? 'opacity-0 -translate-x-20 h-0 my-0 py-0 overflow-hidden'
                  : 'opacity-100 translate-x-0'
              }
              ${
                todos.indexOf(todo) === todos.length - 1 && todos.length > 1
                  ? 'animate-slide-in'
                  : ''
              }
            `}
                  style={{
                    animationDuration: '0.5s',
                  }}
                >
                  <TodoItem
                    todo={todo}
                    toggleComplete={toggleComplete}
                    removeItem={removeItem}
                  />
                </div>
              ))}
            </div>

            {todos.length === 0 && (
              <p className="text-center text-gray-500 mt-4 py-6">
                No tasks yet. Add one above!
              </p>
            )}

            {/* CSS Keyframes for slide animation */}
            <style jsx>{`
              @keyframes slideIn {
                from {
                  opacity: 0;
                  transform: translateY(20px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }

              @keyframes leaf {
                0% {
                  opacity: 0;
                  transform: translateY(0) rotate(0deg);
                }
                50% {
                  opacity: 1;
                }
                100% {
                  opacity: 0;
                  transform: translateY(40px) rotate(45deg);
                }
              }

              .animate-slide-in {
                animation: slideIn 0.5s ease-out forwards;
              }
            `}</style>
          </div>

          <Footer handleGoBack={handleGoBack} />
        </section>
      </section>
    </main>
  );
};

export default TodoList;
