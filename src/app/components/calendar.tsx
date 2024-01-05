import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";

const WeeklyCalendar = () => {
  const [schedule, setSchedule] = useState({});
  const [weekOffset, setWeekOffset] = useState(0);

  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 6; hour <= 22; hour++) {
      slots.push(`${hour}:00`);
    }
    return slots;
  };

  const getMonday = (d) => {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getFormattedDate = (date) => {
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    const parts = new Intl.DateTimeFormat("es-ES", options).formatToParts(date);
    return parts
      .map(({ type, value }) => {
        if (type === "weekday" || type === "month") {
          return capitalizeFirstLetter(value);
        }
        return value;
      })
      .join(" ");
  };

  const calculateWeekDates = () => {
    const startOfWeek = getMonday(new Date());
    startOfWeek.setDate(startOfWeek.getDate() + weekOffset * 7);
    const dates = Array.from({ length: 7 }).map((_, i) => {
      const newDate = new Date(startOfWeek);
      newDate.setDate(newDate.getDate() + i);
      return getFormattedDate(newDate);
    });
    return dates;
  };

  useEffect(() => {
    const weekDates = calculateWeekDates();
    const newSchedule = {};
    generateTimeSlots().forEach((time) => {
      weekDates.forEach((day) => {
        const key = `${day} ${time}`;
        newSchedule[key] = 0;
      });
    });
    setSchedule(newSchedule);
  }, [weekOffset]);

  const changeCellValue = (key, newValue) => {
    setSchedule((prevSchedule) => ({
      ...prevSchedule,
      [key]: newValue,
    }));
  };

  const goToPrevWeek = () => {
    setWeekOffset(weekOffset - 1);
  };

  const goToNextWeek = () => {
    setWeekOffset(weekOffset + 1);
  };

  return (
    <div className="container mx-auto px-4 py-2">
      <div className="flex justify-between mb-4">
        <IconButton onClick={goToPrevWeek}>
          <ChevronLeftOutlinedIcon />
        </IconButton>
        <IconButton onClick={goToNextWeek}>
          <ChevronRightOutlinedIcon />
        </IconButton>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 bg-black text-white font-poppins font-bold text-xs border border-black">
              Hora
            </th>
            {calculateWeekDates().map((day, i) => (
              <th
                key={i}
                className="px-4 py-2 bg-black text-white font-poppins font-bold text-xs border border-black"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {generateTimeSlots().map((time, index) => (
            <tr
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              key={time}
            >
              <td className="border border-black px-4 py-2 font-poppins font-light text-xs">
                {time}
              </td>
              {calculateWeekDates().map((day, i) => {
                const key = `${day} ${time}`;
                return (
                  <td
                    key={key}
                    className="border px-4 py-2 border-black text-center"
                  >
                    {schedule[key]}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeeklyCalendar;
