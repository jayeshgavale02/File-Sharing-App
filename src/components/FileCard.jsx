import React from 'react';
import { Card, CardContent, CardActions, IconButton, Typography, Box } from '@mui/material';
import { Visibility as VisibilityIcon, Share as ShareIcon } from '@mui/icons-material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { toast } from 'react-toastify';
import DescriptionIcon from '@mui/icons-material/Description';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const FileCard = ({ file }) => {
  const { originalName, sharedLink, typeOfFile ,password ,_id } = file;

  const handleCopyLink = () => {
    if (sharedLink && password) {
        const userPassword = prompt('Enter the password to access the file:');
        if (userPassword === password) {
            navigator.clipboard.writeText(sharedLink);
            toast.success('Link copied to clipboard!');
        } else {
          toast.error('Incorrect password. Please try again.');
        }
      } else {
        window.open(sharedLink, '_blank');
      }
  };

  const navigate = useNavigate();
  
  const handleViewFile = () => {
    const fileID = _id;

    if (password) {
      const userPassword = prompt('Enter the password to access the file:');
      
      if (userPassword === password) {
        navigate(`/file-info/${encodeURIComponent(sharedLink)}/${fileID}`);
      } else {
        toast.error('Incorrect password. Please try again.');
      }
    } else {
      navigate(`/file-info/${encodeURIComponent(sharedLink)}/${fileID}`);
    }
  };

  const renderFileIcon = () => {
    if (typeOfFile.includes('image')) {
      return <ImageIcon sx={{ fontSize: 40 }} />;
    }
    if (typeOfFile.includes('audio')) {
      return <AudiotrackIcon sx={{ fontSize: 40 }} />;
    }
    if (typeOfFile.includes('video')) {
      return <VideoLibraryIcon sx={{ fontSize: 40 }} />;
    }
    if (typeOfFile.includes('msword') || typeOfFile.includes('officedocument')) {
      return <DescriptionIcon sx={{ fontSize: 40 }} />;
    }
    if (typeOfFile.includes('pdf')) {
      return <PictureAsPdfIcon sx={{ fontSize: 40 }} />;
    }
    return <InsertDriveFileIcon sx={{ fontSize: 40 }} />;
  };

  return (
    <Card
      sx={{
        width: 250,
        margin: '10px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '2px',
        backgroundColor: 'white',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: '50px', backgroundColor: '#f5f5f5'}}>
        {renderFileIcon()}
      </Box>
      <CardContent sx={{ padding: '8px', textAlign: 'center' }}>
        <Typography variant="body2" noWrap>{originalName}</Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'center', padding: '8px' }}>
        <IconButton onClick={handleViewFile}>
          <VisibilityIcon />
        </IconButton>
        <IconButton onClick={handleCopyLink}>
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};


// Parent Component using Flexbox
const FileCardRow = ({ files }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',  // Allows wrapping on smaller screens
        justifyContent: 'center',  // Centers the items
        marginTop : '35px'
      }}
    >
      {files.map((file, index) => (
        <FileCard file={file} key={index} />
      ))}
    </Box>
  );
};

export default FileCardRow;
