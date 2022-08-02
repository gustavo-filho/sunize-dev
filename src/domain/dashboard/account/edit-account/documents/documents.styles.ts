import { AiOutlineCloudDownload } from 'react-icons/ai';
import { HiOutlineDocumentSearch, HiOutlineDocumentText } from 'react-icons/hi';
import styled, { css } from 'styled-components';

interface DocumentContainerProps {
  extended?: boolean;
  drop?: boolean;
}

export const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #f1f1f1;
`;

export const DetailsText = styled.p`
  margin-top: 2rem;
  font-size: 20px;
  color: #f1f1f1;
`;

export const DetailsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  margin-top: 2rem;
  margin-left: 1em;
  list-style: none;

  li {
    color: #f1f1f1;

    &:before {
      content: '\\2022';
      color: #c37331;
      font-weight: bold;
      display: inline-block;
      width: 1em;
      margin-left: -1em;
    }
  }
`;

export const DocumentContainer = styled.div<DocumentContainerProps>`
  display: flex;
  gap: 0.5rem;
  width: 100%;
  margin-top: 2rem;

  ${({ extended, drop }) =>
    extended &&
    css`
      flex-direction: ${drop ? 'column' : 'row'};
      align-items: center;
      justify-content: center;
      min-height: 300px;
      border: 2px dashed ${drop ? '#c37331' : '#f1f1f1'};
      min-height: 300px;
      padding: 1rem;

      cursor: ${drop ? 'pointer' : 'default'};
    `}

  figcaption {
    h1 {
      font-size: 24px;
      font-weight: 500;
      color: #fff;

      &.drop {
        text-align: center;
      }

      &.approved {
        color: #7cfc00;
      }

      &.recused {
        color: #cc0000;
      }

      &.pending {
        color: #ffd500;
      }
    }

    p {
      font-size: 18px;
      color: #f1f1f1;

      &.drop {
        text-align: center;
      }

      span {
        font-weight: bold;
        color: #c37331;
      }
    }
  }
`;

export const DocumentPendingIcon = styled(HiOutlineDocumentSearch)`
  font-size: 48px;
  color: #fff;
`;

export const DocumentIcon = styled(HiOutlineDocumentText)`
  font-size: 48px;
  color: #fff;
`;

export const DocumentDrop = styled(AiOutlineCloudDownload)`
  font-size: 48px;
  color: #fff;
`;
