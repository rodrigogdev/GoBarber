import React, {
  useRef,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";

import { format, parseISO, getYear, getMonth, getDate } from "date-fns";
import DayPicker, { DayModifiers } from "react-day-picker";
import "react-day-picker/lib/style.css";
import { FormHandles } from "@unform/core";
import { FiCalendar, FiClock, FiPower } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Form } from "@unform/web";
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Section,
  Appointment,
  CreateAppointment,
  Calendar,
} from "./styles";
import logoImg from "../../assets/logo.svg";
import { useAuth } from "../../hooks/Auth";
import api from "../../services/api";
import Button from "../../components/Button";
import { useToast } from "../../hooks/Toast";

interface MonthAvailabilityItem {
  day: number;
  hour: number;
  available: boolean;
}

interface Appointment {
  id: string;
  date: string;
  dateFormatted: string;
  hourFormatted: string;
  provider: {
    name: string;
    avatar_url: string;
  };
}

interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

interface Postdata {
  provider_Id: string;
  date: Date;
}

const Clientboard: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const { user, signOut } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [isSelected, setIsSelected] = useState("");
  const [loading, setLoading] = useState(false);
  const [isClicked, setIsClicked] = useState<number>();

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const loadAppointments = useCallback(async () => {
    api.get<Appointment[]>("/appointments/client").then((response) => {
      const formattedAppointments = response.data.map((appointment) => {
        return {
          ...appointment,
          dateFormatted: format(parseISO(appointment.date), "MM/dd"),
          hourFormatted: format(parseISO(appointment.date), "HH:mm"),
        };
      });

      setAppointments(formattedAppointments);
    });
  }, []);

  const handleSubmit = useCallback(async () => {
    const data: Postdata = {
      // eslint-disable-next-line camelcase
      provider_Id: isSelected,
      date: new Date(
        getYear(selectedDate),
        getMonth(selectedDate),
        getDate(selectedDate),
        isClicked,
      ),
    };
    // eslint-disable-next-line camelcase
    try {
      setLoading(true);
      await api.post("appointments", data).then(() => {
        loadAppointments();
      });

      addToast({
        type: "success",
        title: "Appointment registered!",
        description: "Your appointment was sucessfully registered.",
      });
      setLoading(false);
      goToTop();
    } catch (err) {
      setLoading(false);
      addToast({
        type: "error",
        title: "Error during registration",
        description: "There is an error trying to register your appointment.",
      });
    }
  }, [isClicked, isSelected, selectedDate, addToast, loadAppointments]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
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
    loadAppointments();
  }, [loadAppointments]);

  const disabledDays = useMemo(() => {
    const currentMonth = new Date();

    const dates = monthAvailability
      .filter((monthDay) => monthDay.available === false)
      .map((monthDay) => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        return new Date(year, month, monthDay.day);
      });
    return dates;
  }, [monthAvailability]);

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
          <h1>Appointments</h1>
          <p>
            <span>Your Next Appointment</span>
          </p>

          <Section>
            {appointments.length === 0 && (
              <p>You have no appointment registered.</p>
            )}

            {appointments.map((appointment) => (
              <Appointment key={appointment.id}>
                <section>
                  <span>
                    <FiCalendar />
                    {appointment.dateFormatted}
                  </span>
                  <span>
                    <FiClock />
                    {appointment.hourFormatted}
                  </span>
                </section>
                <div>
                  <img
                    src={appointment.provider.avatar_url}
                    alt={appointment.provider.name}
                  />
                  <strong>{appointment.provider.name}</strong>
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
            <span>Available Time ( Hour )</span>
            <div className="period-container">
              <span className="period">am</span>
              <span className="period">pm</span>
            </div>
            {monthAvailability.map((date) => (
              <button
                type="button"
                key={date.hour}
                disabled={!date.available}
                className={`${
                  date.hour === isClicked ? "clicked" : "not-clicked"
                }`}
                onClick={() => setIsClicked(date.hour)}
              >
                <strong>{date.hour}</strong>
              </button>
            ))}
            <div className="submit-button">
              <Button style={{ width: 350 }} type="submit" loading={loading}>
                Register Hour
              </Button>
            </div>
          </Form>
        </CreateAppointment>
      </Content>
    </Container>
  );
};

export default Clientboard;
