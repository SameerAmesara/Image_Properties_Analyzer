import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import {
  ArrowBack,
  CloudUpload,
  RotateLeftOutlined,
  UploadFileOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import { uploadImage } from "../resources/apiService";

const ImageUpload = (props) => {
  const [base64, setBase64] = useState("");
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [isLoading, setLoading] = useState(false);

  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBase64(reader.result);
      setError("");
    };
    reader.onerror = (error) => {
      setError("Error reading file: ", error.message);
    };
  };

  const isValidFile = (file) => {
    // Check for file type
    if (!["image/png", "image/jpeg"].includes(file.type)) {
      setError("File type must be .png or .jpg");
      return false;
    }

    // Check for file size (100MB)
    if (file.size > 100 * 1024 * 1024) {
      setError("File size must be under 100MB");
      return false;
    }

    return true;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && isValidFile(file)) {
      convertToBase64(file);
      setFileName(file.name);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && isValidFile(file)) {
      convertToBase64(file);
      setFileName(file.name);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const uploadImageListener = async (e) => {
    setLoading(true);
    const response = await uploadImage({ imageData: base64, fileName });
    props.setToast({ show: true, message: response.message });
    props.fetchImages();
    props.updateTab("gallery");
    setLoading(false);
  };

  return (
    <Grid container component="main">
      <Grid item xs={12}>
        <Paper sx={{ padding: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={4} md={3}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => props.updateTab("gallery")}
                >
                  <ArrowBack font />
                  &nbsp; Back to gallery
                </Button>
              </Grid>
              <Grid
                item
                xs={12}
                sm={8}
                md={9}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5" fontWeight={600}>
                  Upload Your Image
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Grid>
      <Grid container spacing={2} marginTop={1}>
        <Grid item xs={12}>
          <Paper sx={{ padding: 2, height: "76vh" }}>
            <Box
              sx={{
                padding: 2,
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
                borderRadius: "10px",
              }}
            >
              {base64 ? (
                <Box
                  sx={{
                    display: "flex",
                    maxWidth: 560,
                    maxheight: 100,
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    height="370"
                    image={base64}
                    sx={{ borderRadius: "10px" }}
                  />
                  <Typography variant="h6" sx={{ mt: 2 }} fontWeight={600}>
                    {fileName}
                  </Typography>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    border: "2px dashed blue",
                    width: "100%",
                    height: "60vh",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "10px",
                  }}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <input
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    accept="image/png, image/jpeg"
                    id="fileInput"
                  />
                  <label htmlFor="fileInput">
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <CloudUpload
                        sx={{
                          width: "30%",
                          height: "20%",
                          color: "blue",
                          cursor: "pointer",
                        }}
                      />
                      <Typography variant="h6" color="blue" component="span">
                        Browse files to Upload
                      </Typography>
                    </Box>
                  </label>
                </Box>
              )}
              {error ? (
                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "10px",
                  }}
                >
                  <Typography variant="h5">{error}</Typography>
                </Box>
              ) : isLoading ? (
                <Box sx={{ mt: 1 }}>
                  <CircularProgress />
                </Box>
              ) : (
                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "10px",
                  }}
                >
                  <Box sx={{ marginRight: 1 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={(e) => {
                        setBase64("");
                        setError("");
                      }}
                    >
                      <RotateLeftOutlined />
                      &nbsp; Reset
                    </Button>
                  </Box>
                  <Box sx={{ marginLeft: 1 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={uploadImageListener}
                    >
                      <UploadFileOutlined />
                      &nbsp; Upload
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ImageUpload;
