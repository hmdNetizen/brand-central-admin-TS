export type UploadedFilePayload = {
  url: string;
  fileName: string;
};

export type initStateType = {
  uploadingFile: boolean;
  uploadPercentage: number;
  uploadedFile: UploadedFilePayload | null;
  error: string | null;
};
