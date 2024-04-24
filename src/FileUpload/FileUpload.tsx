import * as React from "react";
import axios from "axios";

type UploadStatus = "success" | "error" | "loading" | "idle";

interface StatusTextProps {
  status: UploadStatus;
}

function StatusText({ status }: StatusTextProps) {
  switch (status) {
    case "success":
      return <p role="status">Image has been successfully uploaded</p>;
    case "loading":
      return <p role="status">Uploading image...</p>;
    case "error":
      return <p role="status">Image failed to upload</p>;
    default:
      return <p role="status">Image upload status: IDLE</p>;
  }
}

interface FileStatus {
  file: File | null;
  fileUploadHasError: boolean;
}

function FileUpload() {
  const [{ fileUploadHasError, file }, setFileStatus] =
    React.useState<FileStatus>({
      file: null,
      fileUploadHasError: false,
    });

  const [uploadStatus, setUploadStatus] = React.useState<UploadStatus>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const [uploadedFile] = e.target.files as FileList;

    let fileStatus: FileStatus = {
      fileUploadHasError: true,
      file: null,
    };

    if (uploadedFile.type === "image/jpeg") {
      fileStatus = {
        fileUploadHasError: false,
        file: uploadedFile,
      };
    }

    setFileStatus(fileStatus);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setUploadStatus("loading");

    axios
      .post(
        "/api/file-upload",
        { file },
        { headers: { "Content-Type": (file as File).type } }
      )
      .then((data) => setUploadStatus("success"))
      .catch((err) => setUploadStatus("error"));
  };

  return (
    <article>
      <form onSubmit={handleSubmit}>
        <label htmlFor="avatar">Upload Image</label>
        <input
          type="file"
          id="avatar"
          name="avatar"
          accept="image/jpeg"
          aria-invalid={fileUploadHasError}
          aria-describedby="avatar-field-error"
          onChange={handleChange}
        />

        {fileUploadHasError ? (
          <p style={{ color: "red" }} role="alert" id="avatar-field-error">
            Image type is not supported
          </p>
        ) : null}

        <button type="submit" disabled={file === null}>
          Upload
        </button>
      </form>
      <StatusText status={uploadStatus} />
    </article>
  );
}

export default FileUpload;
