import React, { useState, useEffect } from 'react';
import NavBar from '../Navbar';
import axios from 'axios';
import '../Project/Review.css'; // Ensure this file exists and styles the page correctly
import EditForm from './EditReview'; // Ensure this import is correct
import ReviewUpload from './ReviewUpload'; // Ensure this import is correct

function Review() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingRow, setEditingRow] = useState(null);
    const [formData, setFormData] = useState({
        studentName: '',
        studentId: '',
        projectName: '',
        projectMark: '',
        remarks: ''
    });
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/review');
                setData(response.data);
                setFilteredData(response.data);
            } catch (err) {
                console.error('Error fetching review data:', err);
            }
        };

        fetchData();
    }, []);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        const filtered = data.filter(row =>
            row.studentId.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const handleEditClick = (row) => {
        setEditingRow(row);
        setFormData({
            studentName: row.studentName,
            studentId: row.studentId,
            projectName: row.projectName,
            projectMark: row.projectMark,
            remarks: row.remarks
        });
        setError('');
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setEditingRow(null);
        setError('');
        setIsModalOpen(false);
    };

    const handleConfirmClick = async () => {
        const { studentName, projectName, projectMark, remarks } = formData;

        if (!studentName || !projectName || !projectMark || !remarks) {
            setError('All fields are required.');
            return;
        }

        if (projectMark < 0 || projectMark > 100) {
            setError('Project marks must be between 0 and 100.');
            return;
        }

        try {
            const updatedData = {
                projectName,
                projectMark,
                remarks
            };

            await axios.put(`http://localhost:5000/api/review/${editingRow._id}`, updatedData);

            const updatedDataList = data.map(item =>
                item._id === editingRow._id && item.projectName === formData.projectName
                    ? { ...item, ...updatedData }
                    : item
            );

            setData(updatedDataList);
            setFilteredData(updatedDataList.filter(row =>
                row.studentId.toLowerCase().includes(searchTerm.toLowerCase())
            ));
            handleCloseModal();
        } catch (err) {
            setError('Error updating review data.');
            console.error('Error updating review data:', err);
        }
    };

    return (
        <div>
            <NavBar activeSection="review">
                <ReviewUpload />
                <div className="review-main">
                    <p>Project Review Marks</p>
                    <div className='search-bar'>
                        <input
                            type="text"
                            placeholder='Search by ID'
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <i className='bx bx-search-alt' id='search-icon'></i>
                    </div>
                    <div className="tab">
                        <table className='review-table'>
                            <thead>
                                <tr>
                                    <th>Sl No</th>
                                    <th>Student Name</th>
                                    <th>Student Id</th>
                                    <th>Project Name</th>
                                    <th>Project Marks</th>
                                    <th>Remarks</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.length > 0 ? (
                                    filteredData.map((row, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{row.studentName}</td>
                                            <td>{row.studentId}</td>
                                            <td>{row.projectName}</td>
                                            <td>{row.projectMark}</td>
                                            <td>{row.remarks}</td>
                                            <td>
                                                <button className='edit-btn' onClick={() => handleEditClick(row)}>Edit</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="no-match">No match found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </NavBar>
            {editingRow && (
                <EditForm
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    formData={formData}
                    setFormData={setFormData}
                    onConfirmClick={handleConfirmClick}
                    error={error}
                />
            )}
        </div>
    );
}

export default Review;
