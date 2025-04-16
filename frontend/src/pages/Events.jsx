import React from 'react';
import { useEvents } from '../contexts/EventsContext';
import LoadingSpinner from "../components/LoadingSpinner";

const Events = () => {
  const { events, eventsLoading } = useEvents();

  if (eventsLoading) {
    return <LoadingSpinner />
  } else {
    return (
      <div>
      {events.map((event) => (
        <div key={event.id}>
          <h2>{event.title}</h2>
          <p>{event.location}</p>
        </div>
      ))}
      </div>
    );
  }
};

export default Events;
