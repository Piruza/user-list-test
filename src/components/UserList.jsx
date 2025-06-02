import React, { useEffect, useState } from 'react';
import { UserItem } from './UserItem';
import { v4 as uuidv4 } from "uuid";


export const UserList = () => {

    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        setLoading(true);
        fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((data) =>
            setUsers(data.map((x) => ({ ...x, role: "user", isNew: false })))
        )
        .finally(() => setLoading(false));
    }, []);

    const handleChange = (id, field, value) => {
        setUsers((prev) =>
        prev.map((x) => (x.id === id ? { ...x, [field]: value } : x))
        );
    };

    const handleDelete = (id) => {
        setUsers((prev) => prev.filter((x) => x.id !== id));
        alert("User deleted");
    };

    const handleSave = (id) => {
        setUsers((prev) =>
            prev.map((x) => (x.id === id ? { ...x, isNew: false } : x))
        );

        alert("User saved");
    };

    const handleAdd = () => {
        const newUser = {
        id: uuidv4(),
        name: "",
        email: "",
        username: "",
        role: "user",
        isNew: true,
        };
        setUsers((prev) => [newUser, ...prev]);
    };

    const filteredUsers = users.filter((x) =>
        x.username?.toLowerCase().includes(search.toLowerCase())
    );

    // Calculate pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
   
        <div className="container w-full mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Search by username..."
                    className="px-4 py-2 border rounded-lg w-64"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button
                    onClick={handleAdd}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                    Add New User
                </button>
            </div>
            <table className="w-full text-md bg-white shadow-md rounded mb-4">
                <tbody>
                    <tr className="border-b">
                        <th className="text-left p-3 px-5">Name</th>
                        <th className="text-left p-3 px-5">Username</th>
                        <th className="text-left p-3 px-5">Email</th>
                        <th className="text-left p-3 px-5">Phone</th>
                        <th></th>
                    </tr>
                    {loading ? (
                        <tr>
                            <td colSpan="5">
                                <div className="flex justify-center items-center h-full p-5 mx-auto">
                                    <h3>Loading...</h3>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        <>
                            {currentUsers.map(user => (
                                <UserItem key={user.id} user={user} onDelete={handleDelete} onSave={handleSave} onChange={handleChange} />
                            ))}
                        </>
                    )}
                </tbody>
            </table>
            
            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-2 mt-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                    Previous
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-3 py-1 rounded ${
                            currentPage === index + 1
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    )
}