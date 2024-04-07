import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  CardMedia,
  CircularProgress,
  Button,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import ImageDataAccordion from "./ImageDataAccordion";
import { getImageByName, analyzeImage } from "../resources/apiService";
import { useState, useEffect } from "react";

const AnalyzeImage = (props) => {
  const [imageSrc, setImageSrc] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      if (props.selectedImage) {
        setLoading(true);
        const response = await getImageByName(props.selectedImage);
        setImageSrc(`data:image/jpeg;base64,${response.image}`);
        setLoading(false);
      }
    };

    const fetchImageProperties = async () => {
      const response = await analyzeImage(props.selectedImage);
      setImageData({ ...response });
    };
    fetchImage();
    fetchImageProperties();
  }, [props.selectedImage]);

  return (
    <Grid container component="main" spacing={2}>
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
                  Image Properties Analysis
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Paper sx={{ padding: 2, mt: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h5" fontWeight={600}>
              Uploaded Image
            </Typography>
            {isLoading ? (
              <Box
                sx={{
                  mt: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <Box
                sx={{
                  mt: 1,
                  display: "flex",
                  maxWidth: 560,
                  maxheight: 60,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CardMedia
                  component="img"
                  alt="Uploaded Image"
                  height="250"
                  image={imageSrc}
                  sx={{ borderRadius: "10px" }}
                />
                <Typography variant="h6" sx={{ mt: 2 }} fontWeight={600}>
                  {props.selectedImage}
                </Typography>
              </Box>
            )}
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Paper sx={{ padding: 2, mt: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h5" fontWeight={600}>
              Results
            </Typography>
          </Box>
          {isLoading ? (
            <Box
              sx={{
                mt: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ mt: 1 }}>
              <ImageDataAccordion imageData={imageData} />
            </Box>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AnalyzeImage;
