import React from "react";
import ImageCard from "../components/ImageCard";
import { Grid, Paper, Typography, Box, Button } from "@mui/material";
import { CloudUploadOutlined } from "@mui/icons-material";

const ImageGallery = (props) => {
  return (
    <Grid container component="main">
      <Grid item xs={12} sm={12}>
        <Paper sx={{ padding: 2, mb: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={8} md={9}>
                <Typography variant="h4" fontWeight={600}>
                  Image Gallery
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4} md={3}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth
                  onClick={(e) => props.updateTab("upload")}
                >
                  <CloudUploadOutlined font />
                  &nbsp; Upload Image
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Grid>
      <Grid container spacing={2} marginTop="2">
        {Array.isArray(props.images) && props?.images?.length > 0 ? (
          props?.images?.map((image, index) => (
            <ImageCard
              key={index}
              updateSelectedImage={props.updateSelectedImage}
              updateTab={props.updateTab}
              image={image}
            />
          ))
        ) : (
          <Grid
            item
            xs={12}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              sx={{
                display: "flex",
                height: "300px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h4">No images available.</Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default ImageGallery;
