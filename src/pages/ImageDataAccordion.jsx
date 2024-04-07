import React from "react";
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ImageDataAccordion = ({ imageData }) => {
  const renderColorBox = (color, index, array) => (
    <React.Fragment key={index}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          my: 1,
          p: 1,
          width: "100%",
        }}
      >
        <Box
          sx={{
            width: 24,
            height: 24,
            bgcolor: color.HexCode,
            mr: 2,
            border: "1px solid",
            borderColor: "divider",
          }}
        />
        <Typography variant="body2" sx={{ flexGrow: 1 }}>
          {color.HexCode}, RGB({color.Red}, {color.Green}, {color.Blue}),{" "}
          {color.CSSColor}
        </Typography>
        <Typography variant="body2">
          {color.PixelPercent.toFixed(2)}%
        </Typography>
      </Box>
      {index < array.length - 1 && <Divider />} {/* Add this line */}
    </React.Fragment>
  );

  const renderQuality = (quality, includeDivider = true) => (
    <>
      <Box sx={{ width: "100%", pt: 2 }}>
        <Typography variant="subtitle1" fontWeight={600}>
          Image Quality
        </Typography>
        {quality?.Brightness !== undefined && (
          <>
            {includeDivider && <Divider sx={{ my: 1 }} />}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                my: 1,
              }}
            >
              <Typography variant="body2">Brightness:</Typography>
              <Typography variant="body2">
                {quality?.Brightness.toFixed(2)}
              </Typography>
            </Box>
          </>
        )}
        {quality?.Sharpness !== undefined && (
          <>
            {includeDivider && <Divider sx={{ my: 1 }} />}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                my: 1,
              }}
            >
              <Typography variant="body2">Sharpness:</Typography>
              <Typography variant="body2">
                {quality?.Sharpness.toFixed(2)}
              </Typography>
            </Box>
          </>
        )}
        {quality?.Contrast !== undefined && (
          <>
            {includeDivider && <Divider sx={{ my: 1 }} />}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                my: 1,
              }}
            >
              <Typography variant="body2">Contrast:</Typography>
              <Typography variant="body2">
                {quality?.Contrast.toFixed(2)}
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </>
  );

  return (
    <Box>
      <Accordion defaultExpanded sx={{ backgroundColor: "#f8f8f8" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight={600}>
            Full Image Properties
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="subtitle1" fontWeight={600}>
            Dominant Colors
          </Typography>
          <Divider />
          {imageData?.ImageProperties?.DominantColors?.length > 0
            ? imageData?.ImageProperties?.DominantColors?.map(renderColorBox)
            : null}
          {renderQuality(imageData?.ImageProperties?.Quality)}
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ backgroundColor: "#f8f8f8" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight={600}>
            Foreground Properties
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="subtitle1" fontWeight={600}>
            Dominant Colors
          </Typography>
          <Divider />
          {imageData?.ImageProperties?.Foreground?.DominantColors?.length > 0
            ? imageData?.ImageProperties?.Foreground?.DominantColors.map(
                renderColorBox
              )
            : null}
          {renderQuality(imageData?.ImageProperties?.Foreground?.Quality)}
        </AccordionDetails>
      </Accordion>

      <Accordion sx={{ backgroundColor: "#f8f8f8" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" fontWeight={600}>
            Background Properties
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="subtitle1" fontWeight={600}>
            Dominant Colors
          </Typography>
          <Divider />
          {imageData?.ImageProperties?.DominantColors?.length > 0
            ? imageData?.ImageProperties?.Background?.DominantColors?.map(
                renderColorBox
              )
            : null}
          {renderQuality(imageData?.ImageProperties?.Background?.Quality)}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ImageDataAccordion;
