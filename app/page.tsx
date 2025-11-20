"use client";

import UploadCsv from "./components/UploadCsv";

const Page = () => {
  const handleFileSelected = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  console.log("Upload response:", data);
};

  return (
    <main>
      <UploadCsv onFileSelected={handleFileSelected} />
    </main>
  );
};

export default Page;