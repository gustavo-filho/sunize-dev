import { createGlobalStyle } from 'styled-components';
import { theme } from '@shared/styles/theme.constants';

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Nunito', sans-serif;
    }
    input, textarea {
        color: #FFF;
        outline: 0;   
        border: 0;
    }
    html {
        @media (max-width: 1080px) {
            font-size: 93.75%;
        }
        @media (max-width: 720px) {
            font-size: 87.5%;
        }
    } 
    body {
        ::-webkit-scrollbar {
      width: 7px;
    }

    /* Trackbar */
    ::-webkit-scrollbar-track {
      background: #1f1f2b;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #c27c2c;
      border-radius: 7px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: rgba(194, 124, 44);
    }

    @media (max-width: 500px) {
      ::-webkit-scrollbar {
        width: 4px;
      }
    }
    }
    a {
      text-decoration: none;
    }
    body {
        --webkit-font-smoothing: antialiased;
        background: ${theme.colors.darkBlueBackground};
    }
    body, input, textarea, button {
        font-family: 'Nunito', sans-serif;
        font-weight: 300;
    }
    h1, h2, h3, h4, h5, h6 {
        color: #FFF;
        font-weight: 300;
    }
    strong {
        font-weight: 700;
    }
    button { 
        cursor: pointer;
    }
    [disabled] {
        opacity: 0.6;
        cursor: not-allowed;
    }

    p {
        margin: 0;
    }
  
`;
