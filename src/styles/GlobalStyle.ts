import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background: ${({ theme }) => theme.colors.background};
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #333;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.colors.primary};
  }

  /* Estilos do Header */
  header nav button {
    background: transparent;
    border: 2px solid white;
    color: white;
    margin: 0 0.5rem;
    padding: 0.5rem 1.5rem;
    cursor: pointer;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.95rem;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
  }

  header nav button:hover {
    background: white;
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  header nav button:active {
    transform: translateY(0);
  }

  .desktop-nav {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .mobile-menu-btn {
    display: none;
    background: transparent;
    border: none;
    color: white;
    cursor: pointer;
    padding: 0.5rem;
  }

  /* Modal Styles */
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal form {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    min-width: 400px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }

  .modal h2 {
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .modal input {
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border: 2px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    font-size: 1rem;
  }

  .modal input:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  .modal button {
    width: 100%;
    padding: 0.75rem;
    margin-top: 0.5rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
  }

  .modal button[type="submit"] {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }

  .modal button[type="submit"]:hover {
    background: #004a2f;
    transform: translateY(-2px);
  }

  .modal button[type="button"] {
    background: ${({ theme }) => theme.colors.lightGray};
    color: #333;
  }

  .modal button[type="button"]:hover {
    background: #bbb;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .desktop-nav {
      display: none !important;
    }
    
    .mobile-menu-btn {
      display: block !important;
    }

    .modal form {
      min-width: 90%;
      margin: 1rem;
    }

    header {
      padding: 1rem !important;
    }

    header h1 {
      font-size: 1.5rem;
    }
  }

  @media (max-width: 480px) {
    header h1 {
      font-size: 1.2rem;
    }

    section {
      padding: 1rem !important;
    }
  }
`;