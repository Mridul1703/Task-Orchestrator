"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  IconButton,
} from "@mui/material";
import { FaCheck } from "react-icons/fa";

export default function TicketManager() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [email, setEmail] = useState("");
  const [desc, setDesc] = useState("");
  const [errors, setErrors] = useState({});

  const getLocalStorageItem = (key) => {
    if (typeof window !== "undefined") {
      return JSON.parse(window.localStorage.getItem(key) || "[]");
    }
    return [];
  };

  const setLocalStorageItem = (key, value) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  };

  useEffect(() => {
    const storedTasks = getLocalStorageItem("tickets");
    setTasks(storedTasks);
  }, []);

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sendEmail`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email,
          task,
          desc,
        }),
      });

      if (response.ok) {
        alert("Email sent successfully");
        setTask("");
        setEmail("");
        setDesc("");
      } else {
        alert("Failed to send email");
      }
    } catch (err) {
      console.log(err.message);
    }

    const newErrors = {};
    if (!task.trim()) newErrors.task = "Task is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!desc.trim()) newErrors.desc = "Description is required";
    if (!emailRegex.test(email)) newErrors.email = "Invalid email format";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const newTask = {
          id: Date.now(),
          task,
          email,
          desc,
          createdAt: new Date().toLocaleString(),
        };

        const storedTasks = getLocalStorageItem("tickets");
        storedTasks.push(newTask);
        setLocalStorageItem("tickets", storedTasks);

        alert("Ticket submitted successfully!");

        // Instead of using window.location.reload(), update the state
        setTasks(storedTasks);
        setTask("");
        setEmail("");
        setDesc("");
      } catch (err) {
        console.error(err.message);
        alert("Failed to submit ticket");
      }
    }
  };

  const handleComplete = (id) => {
    console.log("handleComplete called with id:", id);
    const storedTasks = getLocalStorageItem("tickets");
    const updatedTasks = storedTasks.filter((task) => task.id !== id);
    setLocalStorageItem("tickets", updatedTasks);
    setTasks(updatedTasks);
    alert(`Ticket ${id} marked as completed`);
  };

  return (
    <>
      <Box sx={{ maxWidth: 500, margin: "auto", padding: 3 }}>
        <Card
          elevation={3}
          sx={{
            backgroundColor: "#1d1d1d",
            color: "#ffffff",
            marginBottom: 2,
            transition: "transform 0.3s",
            "&:hover": {
              transform: "translateY(-10px)",
              boxShadow: "0 5px 15px rgba(0, 128, 0, 0.2)",
            },
            width: "100%",
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              gutterBottom
              sx={{ textAlign: "center", fontWeight: "bold" }}
            >
              Raise a Ticket
            </Typography>
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Assign Task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    required
                    InputLabelProps={{
                      style: { color: "#ffffff" },
                    }}
                    InputProps={{
                      style: { color: "#ffffff" },
                      sx: {
                        "&.MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#008000",
                          },
                          "&:hover fieldset": {
                            borderColor: "#026b02",
                          },
                        },
                      },
                    }}
                  />
                  {errors.task && (
                    <Typography color="error">{errors.task}</Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Recipient's Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    InputLabelProps={{
                      style: { color: "#ffffff" },
                    }}
                    InputProps={{
                      style: { color: "#ffffff" },
                      sx: {
                        "&.MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#008000",
                          },
                          "&:hover fieldset": {
                            borderColor: "#026b02",
                          },
                        },
                      },
                    }}
                  />
                  {errors.email && (
                    <Typography color="error">{errors.email}</Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Task Description"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    required
                    InputLabelProps={{
                      style: { color: "#ffffff" },
                    }}
                    InputProps={{
                      style: { color: "#ffffff" },
                      sx: {
                        "&.MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#008000",
                          },
                          "&:hover fieldset": {
                            borderColor: "#026b02",
                          },
                        },
                      },
                    }}
                  />
                  {errors.desc && (
                    <Typography color="error">{errors.desc}</Typography>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: "#008000",
                      "&:hover": {
                        backgroundColor: "#026b02",
                      },
                      color: "#ffffff",
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ maxWidth: 1200, margin: "auto", padding: 3 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ textAlign: "center", fontWeight: "bold", pb: 2 }}
        >
          {!tasks.length ? (
            <>No Tickets Raised</>
          ) : (
            <>View Tickets ({tasks.length})</>
          )}
        </Typography>
        <Grid container spacing={4}>
          {tasks.map((task) => (
            <Grid item xs={12} sm={6} md={4} key={task.id}>
              <StyledCard {...task} handleComplete={handleComplete} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}

const StyledCard = ({ id, task, email, desc, createdAt, handleComplete }) => {
  return (
    <Card
      sx={{
        backgroundColor: "#1d1d1d",
        color: "#ffffff",
        marginBottom: 2,
        width: "100%",
        transition: "transform 0.3s",
        "&:hover": {
          transform: "translateY(-10px)",
          boxShadow: "MUIBoxShadow",
        },
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          sx={{
            color: "#008000",
            fontWeight: "bold",
            textAlign: "center",
            pb: 1
          }}
        >
          {task}
        </Typography>
        <Typography variant="body1">Description: {desc}</Typography>
        <Typography variant="subtitle1">Assigned to: {email}</Typography>
        <Typography variant="subtitle1">Created at: {createdAt}</Typography>
        <IconButton onClick={() => handleComplete(id)} size="small">
          <FaCheck />
        </IconButton>
      </CardContent>
    </Card>
  );
};
