"use client";

import UploadCsv from "./components/UploadCsv";

const Page = () => {
  const handleFileSelected = async (file: File) => {
    console.log("Selected file:", file);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      console.error("Upload failed:", errorBody);
      return;
    }

    const data = await res.json();
    console.log("Parsed rows from server:", data.rows);
    // you can now set state, etc.
  };

  return (
    <main>
      <UploadCsv onFileSelected={handleFileSelected} />
    </main>
  );
};

export default Page;