import React, { useState } from "react";
import Navbar from "../components/Navbar";
import {
  Card,
  Box,
  Button,
  Checkbox,
  TextField,
  FormControlLabel,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [password, setPassword] = useState("");
  const [isPasswordProtected, setIsPasswordProtected] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCheckboxChange = () => {
    setIsPasswordProtected(!isPasswordProtected);
    if (!isPasswordProtected) {
      setPassword(""); // Clear password if unchecking
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("File:", file);
    console.log("Password Protected:", isPasswordProtected);
    if (isPasswordProtected) {
      console.log("Password:", password);
    }
  };

  return (
    <>
      <Navbar />
      <Box display="flex" justifyContent="center" mt={5}>
        <Card
          sx={{
            width: 360,
            padding: 3,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                backgroundColor: "#d1e7dd",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 2,
              }}
            >
              <CloudUploadIcon style={{ fontSize: "36px", color: "#0f5132" }} />
            </Box>
            <Button
              variant="contained"
              component="label"
              startIcon={<CloudUploadIcon />}
              sx={{ mb: 2 }}
            >
              Upload File
              <input type="file" hidden onChange={handleFileChange} />
            </Button>
          </Box>
          <form onSubmit={handleSubmit}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={isPasswordProtected}
                  onChange={handleCheckboxChange}
                />
              }
              label="Password Protect"
              sx={{ mb: 1 }}
            />
            <TextField
              type="password"
              label="Enter Password"
              variant="outlined"
              value={password}
              onChange={handlePasswordChange}
              fullWidth
              margin="normal"
              disabled={!isPasswordProtected}
              required={isPasswordProtected}
            />

            <Button
              variant="contained"
              color="secondary"
              type="submit"
              fullWidth
              sx={{ mt: 2 }}
            >
              Upload File
            </Button>
          </form>
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            sx={{ mt: 2 }}
          >
            Max file size is 10MB.
          </Typography>
        </Card>
      </Box>
    </>
  );
}

export default FileUpload;
