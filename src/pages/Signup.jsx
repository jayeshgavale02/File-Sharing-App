import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { API_BASE_URL } from "../const.js";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const data = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await fetch(API_BASE_URL + "/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Signup successful!");
        e.target.reset();
        navigate("/Login");
      } else {
        toast.error(result.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-background">
      <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
        <h1 className="text-center mb-4">File Sharing App</h1>
        <div className="card p-4 shadow" style={{ width: "400px" }}>
          <h2 className="text-center mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <Box sx={{ maxWidth: "100%" }}>
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  required
                />
              </Box>
            </div>

            <div className="mb-3">
              <Box sx={{ maxWidth: "100%" }}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  required
                />
              </Box>
            </div>

            <div className="mb-3">
              <Box sx={{ maxWidth: "100%" }}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword((prev) => !prev)}
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </div>

            <Button
              type="submit"
              className="w-100"
              variant="contained"
              style={{ background: "purple", color: "white" }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} style={{ color: "white" }} />
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>

          <div className="mt-3 text-center">
            Already have an account?{" "}
            <Link to="/login" style={{ textDecoration: "none" }}>
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
