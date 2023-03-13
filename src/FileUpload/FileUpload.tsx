import * as React from "react";

interface FileStatus {
  file: File | null;
  fileUploadHasError: boolean;
}

function FileUpload() {
  const [{ fileUploadHasError }, setFileStatus] = React.useState<FileStatus>({
    file: null,
    fileUploadHasError: false,
  });

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

  return (
    <article>
      <form>
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
          <p role="alert" id="avatar-field-error">
            Image type is not supported
          </p>
        ) : null}

        <button type="submit" disabled={fileUploadHasError}>
          Upload
        </button>
      </form>
    </article>
  );
}

export default FileUpload;
