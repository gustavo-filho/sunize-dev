import styled, { css } from 'styled-components';

interface DropContainerProps {
  isDragActive: number;
  isDragReject: number;
}

interface UploadMessageProps {
  type?: 'default' | 'error' | 'success';
}

const dragActive = css`
  border-color: #12f572;
`;

const dragReject = css`
  border-color: #e57878;
`;

export const Container = styled.div``;

export const FilesContainer = styled.div`
  background-color: #f9f9f9;
  margin: 0;
  border-radius: 0 0 1rem 1rem;

  li {
    padding: 0.3rem 1rem;
  }

  li:nth-of-type(1) {
    padding-top: 1rem;
  }
`;

export const DropContainer = styled.div<DropContainerProps>`
  position: relative;
  width: 100%;
  min-height: 246px;
  padding: 20px;
  border: 2px dashed #434248;
  border-radius: 4px;
  cursor: pointer;
  background-color: #1e1f32;

  transition: height 0.2s ease;

  ${({ isDragActive }) => !!isDragActive && dragActive}
  ${({ isDragReject }) => !!isDragReject && dragReject}

  span {
    text-align: center;
    color: gray;
    width: 100%;
    display: inline-block;
  }

  p {
    text-align: center;
    margin-top: 20px;

    img {
      max-width: 100%;
      display: block;
      margin: 0 auto;
      color: gray;
    }
  }
`;

const messageColors = {
  default: 'rgba(71,71,71,1)',
  error: '#e57878',
  success: '#12f572',
};

export const UploadMessage = styled.span<UploadMessageProps>`
  display: flex;
  color: ${({ type }) => messageColors[type || 'default']};
  justify-content: center;
  align-items: center;
  padding: 15px 0;
`;

export const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  img {
    width: 100%;
    height: 100%;
    display: block;
  }
`;
