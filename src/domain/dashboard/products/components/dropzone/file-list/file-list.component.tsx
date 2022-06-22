import {
  FilesData,
  UploadedFilesData,
} from '@domain/dashboard/products/components/dropzone/dropzone.component';
import { Preview, FileInfo, Container } from './file-list.styles';
import { MdCheckCircle, MdError } from 'react-icons/md';

interface FileListData {
  files: FilesData;
  onDelete: CallableFunction;
}

export const FileList = ({ files, onDelete }: FileListData) => {
  return (
    <Container>
      {files.uploadedFiles.map((uploadedFile: UploadedFilesData) => (
        <li key={uploadedFile.id}>
          <FileInfo>
            <Preview src={uploadedFile.preview} />
            <div>
              <strong>{uploadedFile.name}</strong>
              <span>
                {uploadedFile.readableSize}
                {!uploadedFile.error && (
                  <button onClick={() => onDelete(uploadedFile.id)}>
                    Excluir
                  </button>
                )}
              </span>
            </div>
          </FileInfo>

          <div>
            {!uploadedFile.error && <MdCheckCircle size={24} color="#78e5d5" />}
            {uploadedFile.error && <MdError size={24} color="#e57878" />}
          </div>
        </li>
      ))}
    </Container>
  );
};
