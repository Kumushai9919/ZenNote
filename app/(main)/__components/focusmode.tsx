"use client";

import { useEffect, useState } from "react";
import { useFocusMode } from "@/hooks/use-focus-mode";
import {
  Play,
  RefreshCw,
  CheckSquare,
  Clock,
  Trash,
  ChevronUp,
  ChevronDown,
  PlusCircle,
} from "lucide-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const gradients = [
  "radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(63,70,107,1) 100%)", // Darker blue to dark purple
  "radial-gradient(circle, rgba(90,20,90,1) 0%, rgba(90,40,60,1) 100%)", // Darker burgundy
  "radial-gradient(circle, rgba(0, 50, 130, 1) 0%, rgba(0, 70, 90, 1) 100%)", // Darker blue
  "radial-gradient(circle, rgba(130,70,0,1) 0%, rgba(130,50,50,1) 100%)", // Darker brown
  "radial-gradient(circle, rgba(130,0,90,1) 0%, rgba(130,50,90,1) 100%)", // Darker burgundy mix
  "radial-gradient(circle, rgba(30,90,130,1) 0%, rgba(30,80,180,1) 100%)", // Darker blue
  "radial-gradient(circle, rgba(170,75,107,1) 0%, rgba(107,107,131,1) 100%)", // Darker pink to gray
];

const FocusMode = () => {
  const focusMode = useFocusMode();
  const [background, setBackground] = useState("");
  const [showAllTodos, setShowAllTodos] = useState(false);

  useEffect(() => {
    setBackground(gradients[Math.floor(Math.random() * gradients.length)]);
  }, []);

  // ✅ Timer settings
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [mode, setMode] = useState<"clock" | "timer">("clock");

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (running) {
      timer = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    }
    return () => clearInterval(timer);
  }, [running]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  // ✅ To-Do List API
  const todos = useQuery(api.todos.getTodos) ?? [];
  const addTodo = useMutation(api.todos.addTodo);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);

  const [newTask, setNewTask] = useState("");

  const handleAddTask = async () => {
    if (newTask.trim()) {
      await addTodo({ task: newTask });
      setNewTask("");
    }
  };

  return (
    <div className="relative w-full p-4 rounded-md shadow-md">
      {/* ✅ Background */}
      <div
        className="absolute inset-0 rounded-md"
        style={{
          backgroundImage: background,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="grainy-overlay absolute inset-0 rounded-md"></div>

      {/* ✅ Content */}
      <div className="relative flex flex-col items-center justify-center text-white">
        <div className="flex flex-row justify-center items-center mb-3 gap-4">
          <h2 className="text-lg font-semibold">Focus Mode</h2>
          <button
            onClick={() =>
              setBackground(
                gradients[Math.floor(Math.random() * gradients.length)]
              )
            }
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>

        {/* ✅ Mode Selection */}
        <div className="flex space-x-3 mb-4">
          <button
            onClick={() => setMode("clock")}
            className={`px-3 py-1.5 rounded-md flex items-center text-sm ${
              mode === "clock" ? "text-white" : "text-white"
            }`}
            style={{
              background:
                mode === "clock"
                  ? "linear-gradient(90deg, rgba(176,48,82,0.6), rgba(122,31,53,0.6))"
                  : "linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.1))",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            <Clock className="w-4 h-4 mr-1" /> Time
          </button>
          <button
            onClick={() => setMode("timer")}
            className={`px-3 py-1.5 rounded-md flex items-center text-sm ${
              mode === "timer" ? "text-white" : "text-white"
            }`}
            style={{
              background:
                mode === "timer"
                  ? "linear-gradient(90deg, rgba(176,48,82,0.6), rgba(122,31,53,0.6))"
                  : "linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.1))",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            <Play className="w-4 h-4 mr-1" /> Timer
          </button>
        </div>

        {/* ✅ Current Time */}
        {mode === "clock" && (
          <div className="text-3xl font-bold mt-4 mb-2">
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        )}

        {/* ✅ Timer */}
        {mode === "timer" && (
          <div className="mt-4 mb-2">
            <div className="text-3xl font-bold text-center">
              {formatTime(seconds)}
            </div>
            <div className="flex space-x-4 mt-3">
              <button
                onClick={() => setRunning(!running)}
                className="px-3 py-1 rounded-md flex items-center text-sm text-white"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(215,108,130,0.6), rgba(122,31,53,0.6))",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                }}
              >
                <Play className="w-3 h-3 mr-1" /> {running ? "Pause" : "Start"}
              </button>
              <button
                onClick={() => setSeconds(25 * 60)}
                className="px-3 py-1 rounded-md text-sm text-white"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(128,128,128,0.6), rgba(64,64,64,0.6))",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                }}
              >
                Reset
              </button>
            </div>
          </div>
        )}

        {/* ✅ To-Do List */}
        <div className="mt-6 w-full">
          {/* ✅ Title */}
          <h3 className="text-xs font-bold flex items-center">
            <CheckSquare className="w-4 h-4 mr-2 " /> To-Do List
          </h3>

          {/* ✅ Input for New Tasks */}
          <div className="flex space-x-2 mt-3 ">
            <input
              type="text"
              placeholder="New task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className=" text-sm w-full p-2 text-white border-b border-white/15 focus:border-white focus:outline-none"
            />
            <button
              onClick={handleAddTask}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddTask();
                }
              }}
              className=" px-4 py-2 rounded-lg text-white flex items-center"
            >
              <PlusCircle className="w-4 h-4 mr-1" /> Add
            </button>
          </div>

          {/* ✅ Show first todo */}
          {todos.length >= 1 && (
            <div className="bg-gray-900/50 p-2 rounded-md mt-2 flex items-center justify-between mt-3">
              <CheckSquare
                className={`w-5 h-5 ${
                  todos[0].completed ? "text-green-500" : "text-gray-400"
                }`}
                onClick={() => toggleTodo({ id: todos[0]._id })}
              />
              <span
                className={`flex-1 ml-2 ${
                  todos[0].completed ? "line-through text-gray-400" : ""
                }`}
              >
                {todos[0].task}
              </span>
              <Trash
                className="w-5 h-5  text-[#B03052]"
                onClick={() => deleteTodo({ id: todos[0]._id })}
              />
            </div>
          )}

          {/* ✅ Show remaining todos when expanded */}
          {showAllTodos &&
            todos.slice(1).map((todo) => (
              <div
                key={todo._id}
                className=" mt-2 flex items-center justify-between p-2 bg-gray-900/50 rounded-md mb-2"
              >
                <CheckSquare
                  className={`w-5 h-5 ${
                    todo.completed ? "text-green-600" : "text-gray-400"
                  }`}
                  onClick={() => toggleTodo({ id: todo._id })}
                />
                <span
                  className={`flex-1 ml-2 ${
                    todo.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {todo.task}
                </span>
                <Trash
                  className="w-5 h-5 text-[#B03052]"
                  onClick={() => deleteTodo({ id: todo._id })}
                />
              </div>
            ))}

          {/* ✅ Expand/Collapse Todos */}
          {todos.length > 1 && (
            <button
              onClick={() => setShowAllTodos(!showAllTodos)}
              className="mt-2 flex items-center text-sm text-gray-300"
            >
              {showAllTodos ? "Show Less" : "Show All"}{" "}
              {showAllTodos ? <ChevronUp /> : <ChevronDown />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FocusMode;
