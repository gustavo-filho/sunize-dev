import { createGlobalStyle } from 'styled-components';
import { theme } from '@shared/styles/theme.constants';

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Montserrat', sans-serif;
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
        --webkit-font-smoothing: antialiased;
        background: ${theme.colors.darkBlueBackground};
        padding-inline: 2rem;
    }
    body, input, textarea, button {
        font-family: 'Montserrat', sans-serif;
        font-weight: 400;
        color: white;
    }
    h1, h2, h3, h4, h5, h6, strong {
        font-weight: 600;
    }
    button { 
        cursor: pointer;
    }
    [disabled] {
        opacity: 0.6;
        cursor: not-allowed;
    }
  
`;
