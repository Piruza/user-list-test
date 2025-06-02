import React from 'react';

export const Layout = ({ children }) => {
    return (
        <div class="h-screen overflow-hidden flex items-center justify-center" style={{ background: '#edf2f7' }}>
            <div class="text-gray-900 bg-gray-200">
                <div class="p-4 flex">
                    <h1 class="text-3xl">
                        Users
                    </h1>
                </div>
                <div class="px-3 py-4 flex justify-center">
                    {children}
                </div>
            </div>
        </div>
    )
}