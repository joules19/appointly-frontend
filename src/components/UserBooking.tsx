import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import moment from 'moment';
import api from '../api';
import { ToastContainer, toast } from 'react-toastify';  // Import Toastify components
import 'react-toastify/dist/ReactToastify.css';  // Import Toastify CSS
import { Modal, Button } from 'antd';

interface Event {
    title: string;
    start: string;
    end: string;
}

const UserBooking: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<{ start: string; end: string } | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Fetch existing appointments
    useEffect(() => {
        api.get('/appointments')
            .then(response => {
                const appointments: Event[] = response.data.map((appointment: any) => ({
                    title: 'Booked',
                    start: appointment.startTime,
                    end: appointment.endTime,
                }));
                setEvents(appointments);
            })
            .catch(error => console.error(error));
    }, []);

    // Handle slot selection
    const handleSelectSlot = (selectionInfo: any) => {
        const start = selectionInfo.startStr;
        const end = moment(selectionInfo.startStr).add(30, 'minutes').toISOString();

        // Check if the slot is already booked
        const isBooked = events.some(event =>
            moment(start).isBetween(event.start, event.end, null, '[]') ||
            moment(end).isBetween(event.start, event.end, null, '[]')
        );

        if (isBooked) {
            toast.error(
                <div>
                    This time slot is already booked.
                </div>,
                { position: "top-right", autoClose: 5000, closeButton: true, hideProgressBar: false }
            );  // Custom error toast
        } else {
            setSelectedSlot({ start, end });
            setIsModalVisible(true);
        }
    };

    // Handle booking
    const handleBookAppointment = () => {
        if (!selectedSlot) return;

        api.post('/appointments', {
            startTime: selectedSlot.start,
            endTime: selectedSlot.end,
        })
            .then(response => {
                toast.success(
                    <div>
                        Appointment booked successfully!
                    </div>,
                    { position: "top-right", autoClose: 5000, closeButton: true, hideProgressBar: false }
                );  // Custom success toast
                setEvents([...events, {
                    title: 'Booked',
                    start: selectedSlot.start,
                    end: selectedSlot.end,
                }]);
                setSelectedSlot(null);
                setIsModalVisible(false);  // Close the modal after booking
            })
            .catch(error => {
                toast.error(
                    <div>
                        {error.response.data.message}
                    </div>,
                    { position: "top-right", autoClose: 5000, closeButton: true, hideProgressBar: false }
                );  // Custom error toast
                console.error(error);
            });
    };

    // Handle canceling the modal
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="container">
            <h1 className="text-center text-[#282828] mb-4 fw-bold" style={{ fontFamily: 'Georgia, serif', letterSpacing: '1px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)' }}>
                Book an Appointment
            </h1>
            <div className="p-3 rounded mx-auto" style={{ color: '#6c757d', border: '1px solid #bec2c6', padding: '10px', borderRadius: '5px', maxWidth: '1000px' }}>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="timeGridWeek"
                    selectable={true}
                    events={events}
                    select={handleSelectSlot}
                    slotMinTime="08:00:00"
                    slotMaxTime="17:00:00"
                    slotDuration="00:30:00"
                    nowIndicator={true}
                />
            </div>

            {/* Ant Design Modal for booking appointment */}
            <Modal
                title="Confirm Your Appointment"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleBookAppointment}>
                        Book Appointment
                    </Button>,
                ]}
            >
                {selectedSlot && (
                    <>
                        <p>Selected Slot: <strong>{moment(selectedSlot.start).format('LLLL')}</strong></p>
                    </>
                )}
            </Modal>

            {/* Toast Container to display toasts */}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default UserBooking;
