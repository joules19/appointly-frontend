import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Modal, Typography } from 'antd'; // Import Ant Design Modal
import { CalendarOutlined } from '@ant-design/icons';
import api from '../api';
const { Title, Text } = Typography;

interface Event {
    title: string;
    start: string;
    end: string;
}

const AdminDashboard: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [showTooltip, setShowTooltip] = useState<boolean>(true);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    useEffect(() => {
        api.get('/appointments')
            .then((response) => {
                const appointments: Event[] = response.data.map((appointment: any) => ({
                    title: `Booked by ${appointment.user.username}`,
                    start: appointment.startTime,
                    end: appointment.endTime,
                }));
                setEvents(appointments);

                if (appointments.length === 0) {
                    setIsModalVisible(true);
                }
            })
            .catch((error) => console.error(error));
    }, []);

    const handleDismissTooltip = () => {
        setShowTooltip(false);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
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

            {/* FullCalendar */}
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

            {/* No Appointments Modal */}
            <Modal
                title={<Title level={4}><CalendarOutlined style={{ color: '#1890ff', marginRight: 8 }} /> No Appointments Found</Title>}
                open={isModalVisible}
                onOk={() => handleCloseModal()}
                onCancel={() => handleCloseModal()}
                centered
            >
                <Text>No appointments have been booked yet. Check back later or encourage users to schedule an appointment.</Text>
            </Modal>
        </div>
    );
};

export default AdminDashboard;