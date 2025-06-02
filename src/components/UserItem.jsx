import React, { useState } from 'react';

export const UserItem = ({ user, onDelete, onSave, onChange }) => {
    const [isEditing, setIsEditing] = useState(user.isNew);

    return (
        <tr className="border-b hover:bg-orange-100">
            <td className="p-3 px-5">
                {isEditing ? (
                    <input 
                        type="text" 
                        value={user.name} 
                        onChange={(e) => onChange(user.id, "name", e.target.value)} 
                        className="bg-transparent border-b border-gray-500 w-full focus:outline-none" 
                    />
                ) : (
                    <p className="text-gray-900">{user.name}</p>
                )}
            </td>
            <td className="p-3 px-5">
                {isEditing ? (
                    <input 
                        type="text" 
                        value={user.username} 
                        onChange={(e) => onChange(user.id, "username", e.target.value)} 
                        className="bg-transparent border-b border-gray-500 w-full focus:outline-none" 
                    />
                ) : (
                    <p className="text-gray-900">{user.username}</p>
                )}
            </td>
            <td className="p-3 px-5">
                {isEditing ? (
                    <input 
                        type="text" 
                        value={user.email} 
                        onChange={(e) => onChange(user.id, "email", e.target.value)} 
                        className="bg-transparent border-b border-gray-500 w-full focus:outline-none" 
                    />
                ) : (
                    <p className="text-gray-900">{user.email}</p>
                )}
            </td>
            <td className="p-3 px-5">
                {isEditing ? (
                    <input 
                        type="text" 
                        value={user.phone} 
                        onChange={(e) => onChange(user.id, "phone", e.target.value)} 
                        className="bg-transparent border-b border-gray-500 w-full focus:outline-none" 
                    />
                ) : (
                    <p className="text-gray-900">{user.phone}</p>
                )}
            </td>
            <td className="p-3 px-5 flex justify-end">
                {isEditing ? (
                    <button 
                        type="button" 
                        onClick={() => {
                            onSave(user.id);
                            setIsEditing(false);
                        }} 
                        className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                        Save
                    </button>
                ) : (
                    <button 
                        type="button" 
                        onClick={() => setIsEditing(true)} 
                        className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                    >
                        Edit
                    </button>
                )}
                <button 
                    type="button" 
                    onClick={() => onDelete(user.id)} 
                    className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                    Delete
                </button>
            </td>
        </tr>
    )
}