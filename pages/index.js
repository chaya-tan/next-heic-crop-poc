import Head from "next/head";
import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Cropper from "react-easy-crop";
import styles from "../styles/Home.module.css";
// import heic2any from "heic2any";

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

  useEffect(() => {}, []);

  const onUploadImage = (e) => {
    console.log("e", e);
    const fileUploaded = e.target.files[0];
    if (fileUploaded.type === "image/heic") {
      const heic2any = require("heic2any");
      const reader = new FileReader();
      reader.readAsArrayBuffer(fileUploaded);
      reader.onload = function () {
        const resultArray = new Int8Array(reader.result);
        const fileBlob = new Blob([resultArray.buffer], { type: "image/jpeg" });
        heic2any({
          blob: fileBlob,
          toType: "image/jpeg",
        }).then((jpegBlob) => {
          setFile(jpegBlob);
        });
        setFile(fileBlob);
      };
    } else {
      setFile(fileUploaded);
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="file"
        onChange={onUploadImage}
        accept="image/*, image/heic"
      />
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
