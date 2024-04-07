import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
} from "@mui/material";
import { TroubleshootOutlined } from "@mui/icons-material";

const ImageCard = (props) => {
  return (
    <Grid item xs={12} sm={4} md={3}>
      <Card
        sx={{
          borderRadius: "10px",
          padding: 2,
          maxWidth: 345,
        }}
      >
        <CardMedia
          component="img"
          alt={props.image.fileName}
          height="140"
          image={props.image.url}
          sx={{ borderRadius: "10px" }}
        />
        <CardContent sx={{ paddingY: "3px" }}>
          <Box
            textAlign="center"
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"column"}
          >
            <Typography variant="h6" fontWeight={600}>
              {props.image.fileName}
            </Typography>
          </Box>
        </CardContent>
        <CardActions margin="0">
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            onClick={(e) => {
              props.updateSelectedImage(props.image.fileName);
              props.updateTab("analyze");
            }}
          >
            <TroubleshootOutlined />
            &nbsp; Analyze
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default ImageCard;
