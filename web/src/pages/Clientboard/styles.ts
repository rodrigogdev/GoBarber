import styled from "styled-components";
import { shade } from "polished";

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    height: 80px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;

    svg {
      color: #999591;
      width: 20px;
      height: 20px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  strong {
    font-size: 25px;
    margin: 5px;
    color: #ff9000;
  }

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: #f4ede8;
    }

    a {
      text-decoration: none;
      color: #ff9000;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`;

export const Schedule = styled.div`
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 36px;
  }

  p {
    margin-top: 8px;
    color: #ff9000;
    display: flex;
    align-items: center;
    font-weight: 500;

    span {
      display: flex;
      align-items: center;
    }

    span + span::before {
      content: "";
      width: 1px;
      height: 12px;
      background: #ff9000;
      margin: 0 8px;
    }
  }
`;

export const Section = styled.section`
  margin-top: 48px;

  > strong {
    color: #999591;
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid #3e3b47;
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }

  > p {
    color: #999591;
  }
`;

export const Appointment = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  span {
    display: flex;
    align-items: center;
    color: #f4ede8;
    width: 70px;

    svg {
      color: #ff9000;
      margin-right: 8px;
    }
  }

  div {
    flex: 1;
    background: #3e3b47;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-left: 24px;

    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: #fff;
      font-size: 20px;
    }
  }
`;

export const Calendar = styled.aside`
  width: 380px;
  .DayPicker {
    background: #28262e;
    border-radius: 10px;
  }
  .DayPicker-wrapper {
    padding-bottom: 0;
  }
  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }
  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }
  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }
  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
    color: #fff;
  }
  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, "#3e3b47")};
  }
  .DayPicker-Day--today {
    font-weight: normal;
  }
  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }
  .DayPicker-Day--selected {
    background: #ff9000 !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;

export const CreateAppointment = styled.div`
  h1 {
    margin-bottom: 8px;
  }

  span {
    color: #ff9000;
    line-height: 26px;
    border-bottom: 1px solid #3e3b47;
    display: block;
    padding-bottom: 4px;
    margin: 16px 0;
  }

  .period-container {
    display: flex;
    flex-direction: row;
  }

  .period {
    width: 188px;
    margin: 0px 6px;
  }

  form {
    .inactive {
      display: flex;
      align-items: center;
      background: #3e3b47;
      border-radius: 10px;
      height: 60px;
      margin: 8px 0;
      border: none;
      color: #fff;
      width: 400px;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 16px;
        margin-left: 16px;
      }
    }

    .active {
      display: flex;
      align-items: center;
      background: #3e3b47;
      border-radius: 10px;
      height: 60px;
      margin: 8px 0;
      border: 2px solid #ff9000;
      color: #fff;
      width: 400px;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 16px;
        margin-left: 16px;
      }
    }

    .not-clicked:disabled {
      color: #3e3b47;
      background: #312e38;
      border: none;
      width: 36px;
      height: 30px;
      margin: 8px 2px;
      border-radius: 6px;
      cursor: default;
    }
    .clicked:disabled {
      color: #3e3b47;
      background: #312e38;
      border: none;
      width: 36px;
      height: 30px;
      margin: 8px 2px;
      border-radius: 6px;
      cursor: default;
    }
    .not-clicked {
      color: #fff;
      background: #3e3b47;
      border: none;
      width: 36px;
      height: 30px;
      margin: 8px 2px;
      border-radius: 6px;
    }
    .clicked {
      color: #3e3b47;
      background: #ff9000;
      border: none;
      width: 36px;
      height: 30px;
      margin: 8px 2px;
      border-radius: 6px;
    }
    .submit-button {
      display: flex;
      justify-content: center;
    }
  }
`;
