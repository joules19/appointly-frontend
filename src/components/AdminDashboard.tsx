import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import api from '../api';

interface Event {
    title: string;
    start: string;
    end: string;
}

const AdminDashboard: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [showTooltip, setShowTooltip] = useState<boolean>(true); // State to control tooltip visibility

    // Fetch all appointments
    useEffect(() => {
        api.get('/appointments')
            .then((response) => {
                const appointments: Event[] = response.data.map((appointment: any) => ({
                    title: `Booked by ${appointment.user.username}`,
                    start: appointment.startTime,
                    end: appointment.endTime,
                }));
                setEvents(appointments);
            })
            .catch((error) => console.error(error));
    }, []);

    // Dismiss the tooltip manually
    const handleDismissTooltip = () => {
        setShowTooltip(false);
    };

    return (
        <div className="container py-4">
            <h1
                className="text-center text-[#282828] mb-4 fw-bold"
                style={{
                    fontFamily: 'Georgia, serif',
                    letterSpacing: '1px',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
                }}
            >
                My Appointments
            </h1>

            {/* Tooltip */}
            {showTooltip && (

                <div
                    className="tooltip-wrapper"
                    style={{
                        padding: '10px',
                        backgroundColor: '#A8D3F5',
                        color: '#fff',
                        textAlign: 'center',
                        borderRadius: '5px',
                        marginBottom: '15px',
                        cursor: 'pointer',
                    }}
                    onClick={handleDismissTooltip}
                >
                    <strong>Tip:</strong> You can enlarge a time cell by dragging the base. Click to dismiss 😀
                </div>
            )}

            <div
                className="p-3 rounded mx-auto"
                style={{
                    color: '#6c757d',
                    border: '1px solid #bec2c6',
                    padding: '10px',
                    borderRadius: '5px',
                    maxWidth: '1000px',
                }}
            >
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="timeGridWeek" // Shows weekly view with time slots
                    events={events}
                    editable={true} // Allows dragging and resizing events
                    selectable={true} // Allows clicking on slots to create events
                    slotMinTime="08:00:00" // Start time of the calendar (8 AM)
                    slotMaxTime="17:00:00" // End time of the calendar (5 PM)
                    nowIndicator={true} // Shows a current time marker
                />
            </div>
        </div>
    );
};

export default AdminDashboard;
