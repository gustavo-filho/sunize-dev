// @ts-nocheck

import { Dispatch, SetStateAction, useCallback } from 'react';
import { v4 as uuid } from 'uuid';
import fileSize from 'filesize';

import DropzoneLib from 'react-dropzone';

import {
  DropContainer,
  FilesContainer,
  Container,
  Overlay,
  UploadMessage,
} from './dropzone.styles';
import { FileList } from '@domain/dashboard/products/components/dropzone/file-list/file-list.component';

export interface UploadedFilesData {
  file: any;
  id: string;
  name: string;
  preview: string;
  readableSize: string | number;
  error: boolean;
  size: number;
  type: any;
  arrayBuffer: any;
  slice: any;
  stream: any;
  text: any;
}

export interface FilesData {
  uploadedFiles: UploadedFilesData[];
}

interface DropzoneComponentData {
  title: React.ReactNode | string;
  errorTitle: string;
  img: string;
  accept?: string | string[] | undefined;
  multiple?: boolean;
  sizeKB: number;
  files: FilesData;
  setFiles?: Dispatch<SetStateAction<FilesData>>;
  nameField?: string;
  setFieldValue?: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void;
  overlay?: boolean;
}

export const Dropzone = ({
  title,
  errorTitle,
  img,
  accept,
  multiple = false,
  sizeKB,
  files: filesState,
  setFiles,
  nameField = '',
  setFieldValue,
  overlay = false,
}: DropzoneComponentData) => {
  const handleUpload = useCallback(
    (files: any) => {
      if ((setFieldValue && !nameField) || (!setFieldValue && nameField))
        throw new Error(
          `You can't pass setFieldValue without nameField or reverse`,
        );

      if ((files && !setFiles) || (!files && setFiles))
        throw new Error(`You can't pass files without setFiles or reverse`);

      const uploadedFiles = files.map((file: UploadedFilesData) => ({
        file,
        id: uuid(),
        name: file.name,
        readableSize: fileSize(file.size),
        preview: URL.createObjectURL(file),
        progress: 0,
        uploaded: false,
        error: false,
        url: null,
      }));

      if (!multiple) {
        if (setFieldValue && nameField) {
          setFieldValue(nameField, {
            uploadedFiles: [uploadedFiles],
          });
        }

        if (setFiles) {
          setFiles({
            uploadedFiles: uploadedFiles,
          });
        }
      } else {
        setFiles &&
          setFiles({
            uploadedFiles: filesState.uploadedFiles.concat(uploadedFiles),
          });

        if (setFieldValue && nameField) {
          setFieldValue(nameField, {
            uploadedFiles: filesState.uploadedFiles.concat(uploadedFiles),
          });
        }
      }
    },
    [setFiles, filesState.uploadedFiles, multiple, nameField, setFieldValue],
  );

  const handleDelete = useCallback(
    (id: string) => {
      const newFiles = filesState.uploadedFiles.filter(
        (file: UploadedFilesData) => file.id !== id,
      );

      if (setFieldValue && nameField)
        setFieldValue(nameField, { uploadedFiles: newFiles });

      if (setFiles && filesState)
        setFiles({
          uploadedFiles: newFiles,
        });
    },
    [filesState, nameField, setFieldValue, setFiles],
  );

  const renderDragMessage = useCallback(
    (isDragActive: any, isDragReject: any) => {
      if (!isDragActive) {
        return <UploadMessage>{title}</UploadMessage>;
      }

      if (isDragReject) {
        return <UploadMessage type="error">{errorTitle}</UploadMessage>;
      }

      return <UploadMessage type="success">Solte o arquivo aqui</UploadMessage>;
    },
    [errorTitle, title],
  );
  // @ts-ignore
  return (
    <Container>
      <DropzoneLib
        accept={accept}
        onDropAccepted={handleUpload}
        multiple={multiple}
        maxSize={sizeKB}
      >
        {({ getRootProps, getInputProps, isDragActive, isDragReject }: any) => (
          <DropContainer
            {...getRootProps()}
            className="dropzone"
            isDragActive={Number(isDragActive)}
            isDragReject={Number(isDragReject)}
          >
            <input {...getInputProps()} />
            {renderDragMessage(isDragActive, isDragReject)}
            <p>
              <img src={img} alt="Imagem" />
            </p>

            {overlay && filesState && !!filesState.uploadedFiles.length && (
              <Overlay>
                <img src={filesState.uploadedFiles[0].preview} alt="Preview" />
              </Overlay>
            )}
          </DropContainer>
        )}
      </DropzoneLib>
      {!overlay && (
        <FilesContainer>
          {filesState && !!filesState.uploadedFiles.length && (
            <FileList files={filesState} onDelete={handleDelete} />
          )}
        </FilesContainer>
      )}
    </Container>
  );
};
