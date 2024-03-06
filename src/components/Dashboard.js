import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Add, CloudUpload, Edit, Cancel } from '@mui/icons-material';

const initialWorkspaces = [
  { id: 1, name: 'Workspace 1', files: [] },
  { id: 2, name: 'Workspace 2', files: [] },
];

const Dashboard = () => {
  const [workspaces, setWorkspaces] = useState(initialWorkspaces);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [isUploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [editedFileName, setEditedFileName] = useState('');
  const [editedFileContent, setEditedFileContent] = useState('');

  const handleAddWorkspace = () => {
    const newWorkspace = {
      id: workspaces.length + 1,
      name: `Workspace ${workspaces.length + 1}`,
      files: [],
    };
    setWorkspaces((prevWorkspaces) => [...prevWorkspaces, newWorkspace]);
  };

  const handleWorkspaceClick = (workspace) => {
    setSelectedWorkspace(workspace);
  };

  const handleUploadFile = () => {
    // Simulating file upload, you can replace this with your actual upload logic
    const newFile = { name: 'NewFile.side', content: '' };
    setWorkspaces((prevWorkspaces) =>
      prevWorkspaces.map((ws) =>
        ws.id === selectedWorkspace.id
          ? { ...ws, files: [...ws.files, newFile] }
          : ws
      )
    );
    setUploadDialogOpen(false);
    
  };

  const handleEditFile = (file) => {
    setSelectedFile(file);
    setEditedFileName(file.name);
    setEditedFileContent(file.content);
  };

  const handleSaveFile = () => {
    setWorkspaces((prevWorkspaces) =>
      prevWorkspaces.map((ws) =>
        ws.id === selectedWorkspace.id
          ? {
              ...ws,
              files: ws.files.map((file) =>
                file === selectedFile
                  ? { ...file, name: editedFileName, content: editedFileContent }
                  : file
              ),
            }
          : ws
      )
    );
    setSelectedFile(null);
  };

  const handleCancelEdit = () => {
    setSelectedFile(null);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" sx={{ width: 240 }}>
        <List>
          {workspaces.map((workspace) => (
            <ListItem
              key={workspace.id}
              button
              onClick={() => handleWorkspaceClick(workspace)}
            >
              <ListItemText primary={workspace.name} />
            </ListItem>
          ))}
          <ListItem button onClick={handleAddWorkspace}>
            <ListItemIcon>
              <Add />
            </ListItemIcon>
            <ListItemText primary="Add Workspace" />
          </ListItem>
        </List>
      </Drawer>

      <div style={{ marginLeft: 240, padding: 20 }}>
        {selectedWorkspace && (
          <div>
            <Typography variant="h5" gutterBottom>
              Workspace: {selectedWorkspace.name}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CloudUpload />}
              onClick={() => setUploadDialogOpen(true)}
            >
              Upload .side file
            </Button>
            {selectedWorkspace.files.map((file) => (
              <div key={file.name}>
                <Typography variant="subtitle1">{file.name}</Typography>
                <IconButton onClick={() => handleEditFile(file)}>
                  <Edit />
                </IconButton>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Dialog */}
      <Dialog open={isUploadDialogOpen} onClose={() => setUploadDialogOpen(false)}>
        <DialogTitle>Upload .side file</DialogTitle>
        <DialogContent>
          <input
            type="file"
            accept=".side"
            onChange={(e) => console.log(e.target.files)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUploadDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleUploadFile}>Upload</Button>
        </DialogActions>
      </Dialog>

      {/* Edit File Dialog */}
      <Dialog
        open={selectedFile !== null}
        onClose={handleCancelEdit}
      >
        <DialogTitle>Edit File</DialogTitle>
        <DialogContent>
          <TextField
            label="File Name"
            fullWidth
            value={editedFileName}
            onChange={(e) => setEditedFileName(e.target.value)}
          />
          <TextField
            label="File Content"
            fullWidth
            multiline
            rows={4}
            value={editedFileContent}
            onChange={(e) => setEditedFileContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelEdit} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveFile} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dashboard;
