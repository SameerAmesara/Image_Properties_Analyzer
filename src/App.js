import { Container, Snackbar, Alert, Grow } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import ImageGallery from "./pages/ImageGallery";
import AnalyzeImage from "./pages/AnalyzeImage";
import ImageUpload from "./pages/ImageUpload";
import { useState, useEffect } from "react";
import { getImages } from "./resources/apiService";

function App() {
  const [images, setImages] = useState([]);
  const [tab, setTab] = useState("gallery");
  const [selectedImage, setSelectedImage] = useState("");
  const [toast, setToast] = useState({ show: false, message: "" });

  const updateSelectedImage = (fileName) => {
    setSelectedImage(fileName);
  };

  const fetchImages = async () => {
    try {
      const response = await getImages();
      if (response && Array.isArray(response.images)) {
        setImages(response.images);
      } else {
        console.error("Invalid response format:", response);
        setImages([]);
      }
    } catch (error) {
      console.error("Failed to fetch images:", error);
      setImages([]);
    }
  };

  const updateTab = (tab) => {
    setTab(tab);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  function GrowTransition(props) {
    return <Grow {...props} />;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Container component="main" sx={{ paddingY: 3 }}>
        <Snackbar
          open={toast.show}
          autoHideDuration={2000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={(e) => setToast({ show: false, message: "" })}
          TransitionComponent={GrowTransition}
        >
          <Alert
            onClose={(e) => setToast({ show: false, message: "" })}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
        {tab === "analyze" ? (
          <AnalyzeImage selectedImage={selectedImage} updateTab={updateTab} />
        ) : tab === "upload" ? (
          <ImageUpload
            setToast={setToast}
            updateSelectedImage={updateSelectedImage}
            updateTab={updateTab}
            fetchImages={fetchImages}
          />
        ) : (
          <ImageGallery
            images={images}
            updateSelectedImage={updateSelectedImage}
            updateTab={updateTab}
          />
        )}
      </Container>
    </Box>
  );
}

export default App;
