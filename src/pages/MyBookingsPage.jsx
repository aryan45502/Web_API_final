// import React, { useEffect, useState } from 'react';
// import { getMyBookings, cancelBooking } from '../api/bookingApi';

// const MyBookingsPage = () => {
//     const [bookings, setBookings] = useState([]);  // Important fix here
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         fetchBookings();
//     }, []);

//     const fetchBookings = async () => {
//         const token = localStorage.getItem('token');
//         try {
//             const { data } = await getMyBookings(token);
//             setBookings(data);  // Set actual bookings from backend
//         } catch (error) {
//             setError('Failed to fetch bookings.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleCancel = async (id) => {
//         const token = localStorage.getItem('token');
//         try {
//             await cancelBooking(id, token);
//             setBookings(bookings.filter((booking) => booking._id !== id));
//             alert('Booking cancelled successfully');
//         } catch (error) {
//             alert('Failed to cancel booking');
//         }
//     };

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p style={{ color: 'red' }}>{error}</p>;

//     return (
//         <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//             {/* Header Section */}
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
//                 <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: 'maroon' }}>Your Wedding Service Bookings</h1>
//                 <div>
//                     <span style={{ marginRight: '10px' }}>User Name</span>
//                     <img src="user-profile-icon.png" alt="Profile" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
//                 </div>
//             </div>

//             {/* Booking Status Filter */}
//             <div style={{ marginBottom: '20px' }}>
//                 <select style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}>
//                     <option value="all">All</option>
//                     <option value="pending">Pending</option>
//                     <option value="confirmed">Confirmed</option>
//                     <option value="completed">Completed</option>
//                 </select>
//             </div>

//             {/* Booking Cards Grid */}
//             {bookings.length === 0 ? (
//                 <div style={{ textAlign: 'center', padding: '40px' }}>
//                     <p style={{ fontSize: '18px', color: '#666' }}>No bookings found.</p>
//                     <button style={{ padding: '10px 20px', backgroundColor: 'maroon', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
//                         Browse Services
//                     </button>
//                 </div>
//             ) : (
//                 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
//                     {bookings.map((booking) => (
//                         <div key={booking._id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
//                             <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
//                                 <img src={`${booking.service?.category}.png`} alt={booking.service?.category} style={{ width: '40px', height: '40px', marginRight: '10px' }} />
//                                 <div>
//                                     <p style={{ fontWeight: 'bold', margin: '0' }}>{booking.service?.name}</p>
//                                     <p style={{ color: '#666', margin: '0' }}>{booking.service?.provider}</p>
//                                 </div>
//                             </div>
//                             <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
//                             <p><strong>Time:</strong> {new Date(booking.date).toLocaleTimeString()}</p>
//                             <p><strong>Status:</strong> <span style={{ color: booking.status === 'Confirmed' ? 'green' : booking.status === 'Pending' ? 'orange' : 'red' }}>{booking.status}</span></p>
//                             <p><strong>Booking #:</strong> {booking.bookingNumber}</p>
//                             <p><strong>Total:</strong> ${booking.service?.price}</p>
//                             <div style={{ marginTop: '15px' }}>
//                                 <button style={{ padding: '10px', backgroundColor: 'maroon', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>
//                                     View Details
//                                 </button>
//                                 <button onClick={() => handleCancel(booking._id)} style={{ padding: '10px', backgroundColor: 'white', color: 'maroon', border: '1px solid maroon', borderRadius: '5px', cursor: 'pointer' }}>
//                                     Cancel Booking
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}

//             {/* Footer */}
//             <div style={{ textAlign: 'center', marginTop: '40px', color: '#666' }}>
//                 © 2024 Wedding Planner. All rights reserved.
//             </div>
//         </div>
//     );
// };



// export default MyBookingsPage;

import React, { useEffect, useState } from 'react';
import { getMyBookings, cancelBooking } from '../api/bookingApi';

const MyBookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        const { data } = await getMyBookings(token);
        setBookings(data);
    };

    const handleCancel = async (id) => {
        await cancelBooking(id, token);
        fetchBookings();
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            {/* Header Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: 'maroon' }}>Your Wedding Service Bookings</h1>
                <div>
                    
                </div>
            </div>

            {/* Booking Status Filter */}
            <div style={{ marginBottom: '20px' }}>
                <select style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}>
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                </select>
            </div>

            {/* Booking Cards Grid */}
            {bookings.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                    <p style={{ fontSize: '18px', color: '#666' }}>No bookings found.</p>
                    <button style={{ padding: '10px 20px', backgroundColor: 'maroon', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                        Browse Services
                    </button>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                    {bookings.map((booking) => (
                        <div key={booking._id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                                
                                <div>
                                    <p style={{ fontWeight: 'bold', margin: '0' }}>{booking.service?.name}</p>
                                    <p style={{ color: '#666', margin: '0' }}>{booking.service?.provider}</p>
                                </div>
                            </div>
                            <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                            <p><strong>Time:</strong> {new Date(booking.date).toLocaleTimeString()}</p>
                            <p><strong>Status:</strong> <span style={{ color: booking.status === 'Confirmed' ? 'green' : booking.status === 'Pending' ? 'orange' : 'red' }}>{booking.status}</span></p>
                            <p><strong>Booking #:</strong> {booking.bookingNumber}</p>
                            <p><strong>Total:</strong> ${booking.service?.price}</p>
                            <div style={{ marginTop: '15px' }}>
                                <button style={{ padding: '10px', backgroundColor: 'maroon', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>
                                    View Details
                                </button>
                                <button onClick={() => handleCancel(booking._id)} style={{ padding: '10px', backgroundColor: 'white', color: 'maroon', border: '1px solid maroon', borderRadius: '5px', cursor: 'pointer' }}>
                                    Cancel Booking
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Footer */}
            <div style={{ textAlign: 'center', marginTop: '40px', color: '#666' }}>
                © 2024 Wedding Planner. All rights reserved.
            </div>
        </div>
    );
};

export default MyBookingsPage;
