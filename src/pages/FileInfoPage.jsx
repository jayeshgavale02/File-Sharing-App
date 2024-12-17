import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Divider,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { jwtDecode } from "jwt-decode";

const FileInfoPage = () => {
  const { fileUrl, fileID } = useParams();
  const [fileData, setFileData] = useState({});
  const [newFileName, setNewFileName] = useState("");
  const [password, setPassword] = useState("");
  const [isRenameChecked, setIsRenameChecked] = useState(false);
  const [isPasswordChecked, setIsPasswordChecked] = useState(false);
  const [isDeleteChecked, setIsDeleteChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const fetchFileData = async () => {
    if (!token) {
      setError("You need to be logged in to access this file");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:5000/api/files/fileid/${fileID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setFileData(data.files[0]); // Adjust if API response structure is different
      // console.log(data.files[0]);
    } catch (error) {
      console.error("Error fetching file data:", error);
      setError("Failed to fetch file data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFileData();
  }, [fileID]);

  const handleRename = async () => {
    if (!newFileName) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/files/rename/${fileID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ newFileName }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to rename file");
      }

      setFileData((prevData) => ({ ...prevData, originalName: newFileName }));
      setNewFileName("");
      alert("File renamed successfully");
    } catch (error) {
      console.error("Error renaming file:", error);
      setError("Failed to rename file. Please try again later.");
    }
  };

  const handlePasswordSet = async () => {
    if (!password) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/files/password/${fileID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ password }), // hashPassword function can be added if needed
        }
      );

      if (!response.ok) {
        throw new Error("Failed to set password");
      }

      setPassword("");
      setFileData((prevData) => ({ ...prevData, isPasswordProtected: true }));
      alert("Password set successfully");
    } catch (error) {
      console.error("Error setting password:", error);
      setError("Failed to set password. Please try again later.");
    }
  };

  const handleDelete = async () => {
    if (!isDeleteChecked) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/files/delete/${fileID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete file");
      }

      alert("File deleted successfully");
    } catch (error) {
      console.error("Error deleting file:", error);
      setError("Failed to delete file. Please try again later.");
    }
  };

  const renderFilePreview = () => {
    if (!fileUrl) {
      return <Typography variant="body2">Loading file preview...</Typography>;
    }
    const fileExtension = fileUrl.split(".").pop().toLowerCase();
    const decodedFileUrl = decodeURIComponent(fileUrl);

    switch (fileExtension) {
      case "mp4":
        return (
          <video width="100%" height="100%" controls src={decodedFileUrl} />
        );
      case "mp3":
        return <audio controls src={decodedFileUrl} />;
      case "pdf":
        return (
          <iframe
            src={decodedFileUrl}
            width="100%"
            height="100%"
            title="PDF Preview"
          />
        );
      case "jpg":
      case "jpeg":
      case "png":
        return (
          <img
            src={decodedFileUrl}
            alt={fileData.originalName}
            style={{ width: "100%", height: "100%" }}
          />
        );
      case "doc":
      case "docx":
        return (
          <iframe
            src={`https://docs.google.com/gview?url=${decodedFileUrl}&embedded=true`}
            width="100%"
            height="100%"
            title="Document Preview"
          />
        );
      default:
        return (
          <Typography variant="body2" color="error">
            Unsupported file type
          </Typography>
        );
    }
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 4
        }}
      >
        <Box
          sx={{
            width: "50%",
            backgroundColor: "#fff",
            padding: 2,
            boxShadow: 2,
            display: "flex",
            borderRadius: 2,
            
          }}
        >
          <Box sx={{ width: "50%", paddingRight: 2 }}>
            {renderFilePreview()}
          </Box>
          <Box sx={{ width: "50%", paddingLeft: 2 }}>
            <Typography variant="h6">
              {fileData.originalName || "File Name"}
            </Typography>
            <Divider sx={{ marginY: 1 }} />
            <Typography variant="body2">
              File Status:{" "}
              {fileData.password === null
                ? "Not Password Protected"
                : "Password Protected"}
            </Typography>
            <Typography variant="body2">
              Upload Date:{" "}
              {fileData.createdAt
                ? new Date(fileData.createdAt).toLocaleString()
                : "N/A"}
            </Typography>
            <Typography variant="body2">
              Last Update Date:{" "}
              {fileData.updatedAt
                ? new Date(fileData.updatedAt).toLocaleString()
                : "N/A"}
            </Typography>

            <FormControlLabel
              control={
                <Checkbox
                  checked={isRenameChecked}
                  onChange={(e) => setIsRenameChecked(e.target.checked)}
                />
              }
              label="Rename File"
              sx={{ marginTop: 2 }}
            />

            <Box display="flex" alignItems="center" gap={2} marginTop={1}>
              <TextField
                label="New Name"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                size="small"
                disabled={!isRenameChecked} // Disable TextField if checkbox is unchecked
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleRename}
                disabled={!isRenameChecked} // Optionally disable button if checkbox is unchecked
              >
                Change
              </Button>
            </Box>

            <FormControlLabel
              control={
                <Checkbox
                  checked={isPasswordChecked}
                  onChange={(e) => setIsPasswordChecked(e.target.checked)}
                />
              }
              label="Set Password"
              sx={{ marginTop: 2 }}
            />
         
              <Box display="flex" alignItems="center" gap={2} marginTop={1}>
                <TextField
                  label="New Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  size="small"
                  disabled={!isPasswordChecked} // Disable TextField if checkbox is unchecked
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handlePasswordSet}
                  disabled={!isPasswordChecked} // Optionally disable button if checkbox is unchecked

                >
                Change
                </Button>
              </Box>
       
            <FormControlLabel
              control={
                <Checkbox
                  checked={isDeleteChecked}
                  onChange={(e) => setIsDeleteChecked(e.target.checked)}
                />
              }
              label="Are you sure you want to delete this file?"
              sx={{ marginTop: 2 }}
            />
            {isDeleteChecked && (
              <Box marginTop={1}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDelete}
                >
                  Delete File
                </Button>
              </Box>
            )}

            {error && (
              <Typography variant="body2" color="error" marginTop={2}>
                {error}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default FileInfoPage;
