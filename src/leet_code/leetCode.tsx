import React, { useState } from 'react';

import '../taiwind.css';

const LeetCode: React.FC = () => {

    const total = 100;  // Tổng số
    const [current, setCurrent] = useState(60);  // Giá trị hiện tại, ví dụ là 60

    // Tính phần trăm đã hoàn thành
    const percentage = (current / total) * 100;

    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('All');
    const [status, setStatus] = useState('All');

    const items = [
        { id: 1, name: 'Item 1', category: 'Electronics', status: 'Available' },
        { id: 2, name: 'Item 2', category: 'Furniture', status: 'Sold' },
        { id: 3, name: 'Item 3', category: 'Electronics', status: 'Available' },
        { id: 4, name: 'Item 4', category: 'Clothing', status: 'Out of Stock' },
        { id: 5, name: 'Item 5', category: 'Furniture', status: 'Available' },
    ];
    const categories = ['All', 'Electronics', 'Furniture', 'Clothing'];
    const statuses = ['All', 'Available', 'Sold', 'Out of Stock'];

    const filteredItems = items.filter((item) => {
        return (
            (category === 'All' || item.category === category) &&
            (status === 'All' || item.status === status) &&
            (item.name.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    });

    return (
        <div className="text-white px-6 pb-40 min-h-screen">
             <div className="flex gap-4 items-center justify-between bg-neutral-800 p-6 rounded-2xl w-full max-w-8xl overflow-x-auto">
                
                <div className="bg-transparent p-4 text-[2vw] flex-grow basis-0 text-left rounded-xl min-w-[150px] text-[#C2B280] font-bold">
                    Leet codes
                </div>
                
                <div className="bg-transparent p-4 flex-grow basis-0 text-center rounded-xl min-w-[150px]">
                {/* Thanh tiến trình */}
                <div className="relative pt-1">
                        <div className="text-center text-white mb-4">
                            <h3 className="text-base">Progress: {Math.round(percentage)}%</h3>
                        </div>

                        <div className="flex mb-2 items-center justify-between">
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                                {current} / {total}
                            </span>
                        </div>

                        <div className="flex mb-2 items-center justify-between">
                            <div className="flex-grow h-2 mb-4 bg-gray-200 rounded">
                                <div
                                    className="h-full bg-teal-500 rounded"
                                    style={{ width: `${percentage}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Danh sách challenges */}
            <div className="p-6 bg-neutral-900 rounded-xl flex gap-6">
                <div className="w-2/3 flex flex-col gap-4">
                    {filteredItems.map((item) => (
                        <div key={item.id} className="bg-neutral-800 text-white cursor-pointer">
                            <div className="p-4">
                                <h3 className="text-lg font-bold">{item.name}</h3>
                                <p>Category: {item.category}</p>
                                <p>Status: {item.status}</p>
                            </div>
                        </div>
                    ))}
                    {filteredItems.length === 0 && (
                        <div className="text-white">No items found.</div>
                    )}
                </div>
                {/*Filtering  */}
                <div className="w-1/3 bg-transparent p-4 rounded-xl space-y-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="p-2 w-full rounded-lg bg-neutral-700 text-white"
                    />

                    <p>Type</p>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="p-2 w-full rounded-lg bg-neutral-700 text-white"
                    >
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>

                    <p>Level</p>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="p-2 w-full rounded-lg bg-neutral-700 text-white"
                    >
                        {statuses.map((stat) => (
                            <option key={stat} value={stat}>
                                {stat}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}

export default LeetCode;