import React, {
  useRef,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";

import { isToday, format, parseISO, isAfter } from "date-fns";
import DayPicker, { DayModifiers } from "react-day-picker";
import "react-day-picker/lib/style.css";
import { FormHandles } from "@unform/core";
import { FiClock, FiPower } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Form } from "@unform/web";
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  CreateAppointment,
  Calendar,
} from "./styles";
import logoImg from "../../assets/logo.svg";
import { useAuth } from "../../hooks/Auth";
import api from "../../services/api";

interface MonthAvailabilityItem {
  day: number;
  hour: number;
  available: boolean;
}

interface Appointment {
  id: string;
  date: string;
  hourFormatted: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const Clientboard: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { user, signOut } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [isSelected, setIsSelected] = useState("");

  console.log(selectedDate);
  console.log(monthAvailability);

  const handleSubmit = useCallback(async () => {
    console.log("teste");
  }, []);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    api.get("/providers").then((response) => {
      setProviders(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get(`/providers/${isSelected}/day-availability`, {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then((response) => {
        setMonthAvailability(response.data);
      });
  }, [selectedDate, isSelected]);

  useEffect(() => {
    api
      .get<Appointment[]>("/appointments/me", {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then((response) => {
        const formattedAppointments = response.data.map((appointment) => {
          return {
            ...appointment,
            hourFormatted: format(parseISO(appointment.date), "HH:mm"),
          };
        });

        setAppointments(formattedAppointments);
      });
  }, [selectedDate]);

  const disabledDays = useMemo(() => {
    const dates = monthAvailability
      .filter((monthDay) => monthDay.available === false)
      .map((monthDay) => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        return new Date(year, month, monthDay.day);
      });
    return dates;
  }, [currentMonth, monthAvailability]);

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "MMMM dd");
  }, [selectedDate]);

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, "cccc");
  }, [selectedDate]);

  const morningAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      return parseISO(appointment.date).getHours() < 12;
    });
  }, [appointments]);

  const afternoonAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      return parseISO(appointment.date).getHours() >= 12;
    });
  }, [appointments]);

  const nextAppointment = useMemo(() => {
    return appointments.find((appointment) =>
      isAfter(parseISO(appointment.date), new Date()),
    );
  }, [appointments]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Welcome</span>
              <strong>{user.name}</strong>
              <Link to="/profile">
                <span>Edit Profile</span>
              </Link>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
      <Content>
        <Schedule>
          <h1>Your next appointments</h1>
          <p>
            {isToday(selectedDate) && <span>Today</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>

          {isToday(selectedDate) && nextAppointment && (
            <NextAppointment>
              <strong>Next Appointment</strong>
              <div>
                <img
                  src={nextAppointment.user.avatar_url}
                  alt={nextAppointment.user.name}
                />

                <strong>{nextAppointment.user.name}</strong>
                <span>
                  <FiClock />
                  {nextAppointment.hourFormatted}
                </span>
              </div>
            </NextAppointment>
          )}

          <Section>
            <strong>Morning</strong>

            {morningAppointments.length === 0 && (
              <p>There is no appointment on this period.</p>
            )}

            {morningAppointments.map((appointment) => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>
                <div>
                  <img
                    src={appointment.user.avatar_url}
                    alt={appointment.user.name}
                  />
                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}

            <strong>Afternoon</strong>

            {afternoonAppointments.length === 0 && (
              <p>There is no appointment on this period.</p>
            )}

            {afternoonAppointments.map((appointment) => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>
                <div>
                  <img
                    src={appointment.user.avatar_url}
                    alt={appointment.user.name}
                  />
                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>
        </Schedule>
        <CreateAppointment>
          <h1>Create new Appointment</h1>
          <span>Choose a Barber</span>

          {providers.length === 0 && <p>There is no barber available.</p>}
          <Form ref={formRef} onSubmit={handleSubmit}>
            {providers.map((provider) => (
              <button
                type="button"
                key={provider.id}
                className={`${
                  provider.id === isSelected ? "active" : "inactive"
                }`}
                onClick={() => setIsSelected(provider.id)}
              >
                <img src={provider.avatar_url} alt={provider.name} />
                <strong>{provider.name}</strong>
              </button>
            ))}
            <span>Choose a date</span>
            <Calendar>
              <DayPicker
                fromMonth={new Date()}
                disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
                modifiers={{ available: { daysOfWeek: [1, 2, 3, 4, 5] } }}
                onDayClick={handleDateChange}
                selectedDays={selectedDate}
              />
            </Calendar>
            <span>Available Time</span>
            <div className="period-container">
              <span className="period">am</span>
              <span className="period">pm</span>
            </div>
            {monthAvailability.map((date) => (
              <button type="button" key={date.hour}>
                <strong>{date.hour}</strong>
              </button>
            ))}
          </Form>
        </CreateAppointment>
      </Content>
    </Container>
  );
};

export default Clientboard;
