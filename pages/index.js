import Head from "next/head";
import { useState, useCallback } from "react";
import Image from "next/image";
import Cropper from "react-easy-crop";
import styles from "../styles/Home.module.css";

export default function Home() {
  // const [crop, setCrop] = useState({ aspect: 16 / 9 });
  const src =
    "https://images.unsplash.com/photo-1621763595125-551ba19c2643?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80";

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const [file, setFile] = useState();

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    // console.log(croppedArea, croppedAreaPixels);
  }, []);

  const onUploadImage = (e) => {
    console.log("e", e);
    const fileUploaded = e.target.files[0];
    setFile(fileUploaded);
  };
  return (
    <div className={styles.container}>
      <input type="file" onChange={onUploadImage} accept="image/*" />
      {file && (
        <Cropper
          image={URL.createObjectURL(file)}
          crop={crop}
          zoom={zoom}
          aspect={4 / 3}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      )}
    </div>
  );
}
