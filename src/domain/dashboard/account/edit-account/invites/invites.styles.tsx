import styled from 'styled-components'
import { shade } from 'polished'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  max-width: 1640px;
  margin: 60px auto 0px auto;
  padding: 0 6%;
  position: relative;
  animation: animeTop 0.7s ease;

  @keyframes animeTop {
    from {
      transform: translateY(10px);
    }
    to {
      transform: translateY(0);
    }
  }

  > h1 {
    font-size: 28px;
    margin-bottom: 32px;
    font-weight: 200;
    line-height: 27px;
    font-family: 'Poppins',sans-serif;
    color: white;
  }

  > h2 {
    font-size: 20px;
    font-weight: 400;
    color: rgba(129, 129, 129, 1);
    margin-bottom: 2rem;
  }

  > header {
    display: flex;
    flex-direction: row-reverse;
    max-width: 1210px;
  }

  @media (max-width: 380px) {
    padding: 0 2%;
  }

  @media (max-width: 350px) {
    .links {
      display: flex;
      justify-content: space-between;
      margin: 0;
    }
    > a {
      font-size: 13px;
      position: relative;
      top: 2px;
    }
  }
`

export const InviteLink = styled.section`
  width: 100%;
  margin: 1.5rem 0;
  margin-bottom: 3rem;
  color: #848484;

  label {
    font-size: 1.3rem;
    display: block;
    margin-bottom: 0.6rem;
    font-size: #848484;
  }

  input {
    height: 40px;
    width: 100%;
    border: 1px solid rgb(67, 66, 72);
    color: rgb(209, 209, 209);
    padding-left: 0.5rem;
    font-size: 1rem;
    border-radius: 0.3rem;
    background-color: rgb(30, 31, 50);

    :hover {
      border: 1px solid ${shade(0.1, 'rgb(86, 94, 168)')};
    }
  }

  button {
    cursor: pointer;
    width: 100%;
    height: 40px;
    border: 0;
    background-color: ${shade(0.1, 'rgb(86, 94, 168)')};
    color: white;
    margin-top: 0.5rem;
    font-size: 1.1rem;
    border-radius: 0.3rem;
    transition: background-color 0.2s ease;

    :hover {
      background-color: ${shade(0.3, 'rgb(86, 94, 168)')};
    }
  }
`

export const BoxWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1030px;
  background-color: rgb(39, 41, 61);
  padding: 50px;
  border-radius: 0 0 20px 20px;
  margin-bottom: 30px;

  @media (max-width: 380px) {
    padding: 10px;
  }
`

export const NotificationSingle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 2.5rem;

  h1 {
    color: #848484;
    margin-bottom: 1rem;
    font-size: 1.2rem;
  }

  main {
    display: flex;

    div {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      color: #848484;

      label {
        cursor: pointer;
        margin-left: 0.7rem;
      }

      input {
        cursor: pointer;
        width: 20px;
        height: 20px;
      }
    }
  }

  div:last-child {
    margin-left: 1.5rem;
  }

  @media (max-width: 500px) {
    main {
      text-align: left;
      flex-direction: column;
      align-items: flex-start;
    }

    div:last-child {
      margin-left: 0rem;
      margin-top: 0.7rem;
    }
  }
`
export const Bottonsave = styled.div`
  .btn {
    width: 100%;
    font-size: 14px;
    border: none;
    padding: 10px;
    cursor: pointer;
    display: inline-block;
    margin-top: 0.5rem;
    font-size: 1.1rem;
    border-radius: 0.3rem;
  }

  .btn-green {
    background: #df8b2b;
    background-color: ${shade(0.1, '#df8b2b')};
    transition: background-color 0.2s ease;
    color: #fff;
  }

  .btn-green:hover {
    background-color: ${shade(0.3, '#df8b2b')};
    color: #fff;
  }
`

export const Navigation = styled.div`
  .links {
    display: flex;

    > a {
      font-size: 18px;
      color: rgb(129, 129, 129);
      background-color: rgb(39, 41, 61);
      padding: 16px 22px 12px 22px;
      border-radius: 4px 4px 0 0;
    }
  }

  @media (max-width: 670px) {
    .links {
      flex-direction: column;

      a {
        color: rgb(129, 129, 129);
        background-color: rgb(39, 41, 61);
        text-align: center;
      }
    }
  }
`

export const LinksDocs = styled(Link)`
  font-size: 18px;
  color: rgba(0, 0, 0, 1);
  background-color: transparent !important;
  padding: 16px 22px 12px 22px;
  border-radius: 4px 4px 0 0;
`

export const PaginationContainer = styled.div`
  margin: 3rem 0;
  display: flex;
  justify-content: center;
  max-width: 600px;
  border: 2px solid #1f1f2b;
`

export const Indicated = styled.section`
  margin-top: 3rem;

  h2 {
    color: #848484;
    font-size: 1.2rem;
    margin-bottom: 0.8rem;
  }

  section {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`
