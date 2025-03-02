// import React, { useEffect, useState } from 'react';
// import { getAllBookings, adminDeleteBooking } from '../api/bookingApi';

// const AdminBookingsPage = () => {
//     const [bookings, setBookings] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         fetchBookings();
//     }, []);

//     const fetchBookings = async () => {
//         const token = localStorage.getItem('token');
//         try {
//             const { data } = await getAllBookings(token);
//             setBookings(data);
//         } catch (error) {
//             setError('Failed to fetch bookings.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleDelete = async (id) => {
//         const token = localStorage.getItem('token');
//         if (!window.confirm('Are you sure you want to delete this booking?')) return;

//         try {
//             await adminDeleteBooking(id, token);
//             setBookings(bookings.filter((booking) => booking._id !== id));
//             alert('Booking deleted successfully');
//         } catch (error) {
//             alert('Failed to delete booking');
//         }
//     };

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p style={{ color: 'red' }}>{error}</p>;

//     return (
//         <div style={{ padding: '20px' }}>
//             <h2>Manage All Bookings</h2>
//             <ul>
//                 {bookings.map((booking) => (
//                     <li key={booking._id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '15px' }}>
//                         <p><strong>User:</strong> {booking.user?.name} ({booking.user?.email})</p>
//                         <p><strong>Service:</strong> {booking.service?.name}</p>
//                         <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
//                         <p><strong>Guests:</strong> {booking.guestCount}</p>
//                         <button onClick={() => handleDelete(booking._id)}>Delete Booking</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default AdminBookingsPage;

import React, { useEffect, useState } from 'react';
import { getAllBookings, adminApproveBooking, adminDeclineBooking } from '../api/bookingApi';

const AdminBookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        const token = localStorage.getItem('token');
        try {
            const { data } = await getAllBookings(token);
            setBookings(data);
        } catch (error) {
            setError('Failed to fetch bookings.');
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await adminApproveBooking(id, token);
            setBookings(bookings.map(booking =>
                booking._id === id ? { ...booking, status: 'confirmed' } : booking
            ));
            alert('Booking approved');
        } catch (error) {
            alert('Failed to approve booking');
        }
    };

    const handleDecline = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await adminDeclineBooking(id, token);
            setBookings(bookings.map(booking =>
                booking._id === id ? { ...booking, status: 'declined' } : booking
            ));
            alert('Booking declined');
        } catch (error) {
            alert('Failed to decline booking');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Manage All Bookings</h2>

            {/* Booking List */}
            <ul style={styles.bookingList}>
                {bookings.map((booking) => (
                    <li key={booking._id} style={styles.bookingItem}>
                        <div style={styles.bookingDetails}>
                            <p style={styles.bookingText}>
                                <strong>User:</strong> {booking.user?.name} ({booking.user?.email})
                            </p>
                            <p style={styles.bookingText}>
                                <strong>Service:</strong> {booking.service?.name}
                            </p>
                            <p style={styles.bookingText}>
                                <strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}
                            </p>
                            <p style={styles.bookingText}>
                                <strong>Guests:</strong> {booking.guestCount}
                            </p>
                            <p style={styles.bookingText}>
                                <strong>Status:</strong> {booking.status}
                            </p>
                        </div>

                        {/* Approve/Decline Buttons */}
                        {booking.status === 'pending' && (
                            <div style={styles.bookingActions}>
                                <button
                                    onClick={() => handleApprove(booking._id)}
                                    style={styles.approveButton}
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleDecline(booking._id)}
                                    style={styles.declineButton}
                                >
                                    Decline
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

// Inline Styles
const styles = {
    container: {
        padding: '20px',
        maxWidth: '1200px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        fontSize: '1.8rem',
        color: '#333',
        marginBottom: '20px',
        textAlign: 'center',
    },
    bookingList: {
        listStyle: 'none',
        padding: '0',
    },
    bookingItem: {
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '20px',
        marginBottom: '15px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bookingDetails: {
        flex: 1,
    },
    bookingText: {
        margin: '5px 0',
        fontSize: '1rem',
        color: '#555',
    },
    bookingActions: {
        display: 'flex',
        gap: '10px',
    },
    approveButton: {
        backgroundColor: '#28a745', // Green
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        padding: '8px 15px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        transition: 'background-color 0.3s ease',
    },
    declineButton: {
        backgroundColor: '#dc3545', // Red
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        padding: '8px 15px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        transition: 'background-color 0.3s ease',
    },
};
   

export default AdminBookingsPage;


