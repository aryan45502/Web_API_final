import React, { useEffect, useState } from 'react';
import { addService, deleteService, getServices, updateService } from '../api/vendorApi';

const AdminServicesPage = () => {
    const [services, setServices] = useState([]);
    const [formData, setFormData] = useState({ name: '', category: '', price: '', image: null });
    const [editService, setEditService] = useState(null);

    const categories = ['All', 'Catering', 'Photography', 'Decor', 'Venue', 'Entertainment']; // Define available categories

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        const { data } = await getServices();
        setServices(data);
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        await deleteService(id, token);
        fetchServices();
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('name', formData.name);
        form.append('category', formData.category);
        form.append('price', formData.price);
        if (formData.image) form.append('image', formData.image);

        const token = localStorage.getItem('token');

        if (editService) {
            await updateService(editService._id, form, token);
        } else {
            await addService(form, token);
        }

        setFormData({ name: '', category: '', price: '', image: null });
        setEditService(null);
        fetchServices();
    };

    const handleEdit = (service) => {
        setEditService(service);
        setFormData({
            name: service.name,
            category: service.category,
            price: service.price,
        });
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Manage Services</h1>

            {/* Service Form */}
            <form onSubmit={handleFormSubmit} style={styles.form}>
                <input
                    type="text"
                    placeholder="Service Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={styles.input}
                    required
                />

                <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={styles.select}
                    required
                >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    placeholder="Price"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    style={styles.input}
                    required
                />

                <input
                    type="file"
                    onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                    style={styles.fileInput}
                />

                <button type="submit" style={styles.submitButton}>
                    {editService ? 'Update Service' : 'Add Service'}
                </button>
            </form>

            {/* Service List */}
            <ul style={styles.serviceList}>
                {services.map((service) => (
                    <li key={service._id} style={styles.serviceItem}>
                        <img
                            src={service.image}
                            alt={service.name}
                            style={styles.serviceImage}
                        />
                        <div style={styles.serviceDetails}>
                            <h3 style={styles.serviceName}>{service.name}</h3>
                            <p style={styles.serviceInfo}>
                                {service.category} - ${service.price}
                            </p>
                        </div>
                        <div style={styles.serviceActions}>
                            <button
                                onClick={() => handleEdit(service)}
                                style={styles.editButton}
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(service._id)}
                                style={styles.deleteButton}
                            >
                                Delete
                            </button>
                        </div>
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
        fontSize: '2rem',
        color: '#333',
        marginBottom: '20px',
        textAlign: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        marginBottom: '30px',
    },
    input: {
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        fontSize: '1rem',
        outline: 'none',
        transition: 'border-color 0.3s ease',
    },
    inputFocus: {
        borderColor: '#800000', // Maroon
    },
    select: {
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        fontSize: '1rem',
        outline: 'none',
        transition: 'border-color 0.3s ease',
    },
    fileInput: {
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        fontSize: '1rem',
        outline: 'none',
    },
    submitButton: {
        padding: '10px',
        backgroundColor: '#800000', // Maroon
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    submitButtonHover: {
        backgroundColor: '#5c0000', // Darker maroon
    },
    serviceList: {
        listStyle: 'none',
        padding: '0',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
    },
    serviceItem: {
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #ddd',
        borderRadius: '10px',
        padding: '15px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    },
    serviceImage: {
        width: '100px',
        height: '100px',
        borderRadius: '10px',
        objectFit: 'cover',
        marginRight: '20px',
    },
    serviceDetails: {
        flex: 1,
    },
    serviceName: {
        fontSize: '1.2rem',
        color: '#333',
        margin: '0 0 5px 0',
    },
    serviceInfo: {
        fontSize: '0.9rem',
        color: '#666',
        margin: '0',
    },
    serviceActions: {
        display: 'flex',
        gap: '10px',
    },
    editButton: {
        padding: '5px 10px',
        backgroundColor: '#4299e1', // Blue
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    deleteButton: {
        padding: '5px 10px',
        backgroundColor: '#e53e3e', // Red
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
};
   

export default AdminServicesPage;
