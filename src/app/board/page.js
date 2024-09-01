"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  IconButton,
  Tooltip,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { isMobile } from "react-device-detect";

const ItemType = {
  CARD: "card",
};

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks =
      typeof window !== "undefined" ? localStorage.getItem("tasks") : null;
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [newTask, setNewTask] = useState("");
  const [taskPriority, setTaskPriority] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.trim()) {
      const updatedTasks = [
        ...tasks,
        {
          id: Date.now(),
          content: newTask,
          status: "Backlog",
          priority: taskPriority,
        },
      ];
      setTasks(updatedTasks);
      setNewTask("");
      setTaskPriority("");
    }
  };

  const moveTask = (id, targetStatus) => {
    const taskIndex = tasks.findIndex((task) => task.id === id);
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].status = targetStatus;
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleClearAll = () => {
    setTasks([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem("tasks");
    }
  };

  const TaskCard = ({ task }) => {
    const [, drag] = useDrag({
      type: ItemType.CARD,
      item: { id: task.id },
    });

    return (
      <Card
        ref={drag}
        sx={{
          cursor: "pointer",
          backgroundColor:
            task.priority === "High"
              ? "#f48fb1"
              : task.priority === "Medium"
              ? "#ffcc80"
              : task.priority === "Low"
              ? "#a5d6a7"
              : "#ffffff",
          marginBottom: 2,
          borderRadius: "12px",
          padding: 2,
          transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0 6px 18px rgba(0, 0, 0, 0.3)",
          },
          position: "relative",
          border: `1px solid ${
            task.priority === "High"
              ? "#e57373"
              : task.priority === "Medium"
              ? "#ffb74d"
              : task.priority === "Low"
              ? "#81c784"
              : "#cfd8dc"
          }`,
        }}
      >
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          {task.content}
        </Typography>
        <Tooltip title="Delete">
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => handleDeleteTask(task.id)}
            sx={{
              color: "#ff1744",
              position: "absolute",
              right: 8,
              top: 8,
              backgroundColor: "#ffffff",
              "&:hover": {
                backgroundColor: "#f8bbd0",
              },
              borderRadius: "50%",
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Card>
    );
  };

  const TaskColumn = ({ status, children }) => {
    const [, drop] = useDrop({
      accept: ItemType.CARD,
      drop: (item) => moveTask(item.id, status),
    });

    return (
      <Card
        ref={drop}
        sx={{
          background: "rgba(255, 255, 255, 0.85)",
          borderRadius: "15px",
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
          overflow: "hidden",
          height: "100%",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            sx={{
              color: "#008000",
              fontWeight: "bold",
              marginBottom: 2,
              textAlign: "center",
              textShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            {status}
          </Typography>
          {children}
        </CardContent>
      </Card>
    );
  };

  return (
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <Box
        suppressHydrationWarning
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: { xs: "20px", md: "40px" },
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
          maxWidth: "1200px",
          margin: "0 auto",
          mt: { xl: 15, md: 11 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            width: "100%",
            gap: 2,
            marginBottom: 3,
          }}
        >
          <TextField
            select
            label="Task Priority"
            value={taskPriority}
            onChange={(e) => setTaskPriority(e.target.value)}
            sx={{
              flexGrow: 1,
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              borderRadius: "10px",
            }}
          >
            <MenuItem value="">
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: "#cfd8dc",
                    marginRight: 1,
                  }}
                />
                None
              </Box>
            </MenuItem>
            <MenuItem value="High">
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: "#e57373",
                    marginRight: 1,
                  }}
                />
                High
              </Box>
            </MenuItem>
            <MenuItem value="Medium">
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: "#ffb74d",
                    marginRight: 1,
                  }}
                />
                Medium
              </Box>
            </MenuItem>
            <MenuItem value="Low">
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: "#81c784",
                    marginRight: 1,
                  }}
                />
                Low
              </Box>
            </MenuItem>
          </TextField>
          <TextField
            label="New Task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            sx={{
              flexGrow: 2,
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              borderRadius: "10px",
              "& .MuiOutlinedInput-root": {
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                "&:hover": { borderColor: "#008000" },
              },
            }}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddTask}
            sx={{
              backgroundColor: "#008000",
              "&:hover": {
                backgroundColor: "#026b02",
              },
              height: "56px",
              borderRadius: "10px",
              boxShadow: "0 6px 18px rgba(0, 128, 0, 0.4)",
            }}
          >
            Add Task
          </Button>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
            gap: 2,
            width: "100%",
          }}
        >
          {["Backlog", "In Progress", "Completed"].map((status) => (
            <TaskColumn key={status} status={status}>
              {tasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
            </TaskColumn>
          ))}
        </Box>
        <Box sx={{ marginTop: 3 }}></Box>
        <Button
          variant="contained"
          onClick={handleClearAll}
          sx={{
            backgroundColor: "#008000",
            "&:hover": {
              backgroundColor: "#026b02",
            },
            height: "56px",
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            marginTop: 2,
            alignSelf: "flex-end",
          }}
        >
          Clear All
        </Button>
      </Box>
    </DndProvider>
  );
};

export default KanbanBoard;
