import React, { useState } from 'react';
import { useFetchChallenge } from '../services/useFetchChallenge';
import { useNavigate } from 'react-router-dom';

import '../taiwind.css';

const LeetCode: React.FC = () => {
    const { challenges, loading, error } = useFetchChallenge(3);

    const total = 100;
    const [current, setCurrent] = useState(60);

    const percentage = (current / total) * 100;

    const [search, setSearch] = useState('');
    const [level, setLevel] = useState('All');
    const [status, setStatus] = useState('All');

    const levels = ['All', 'Easy', 'Medium', 'Hard'];
    const statuses = ['All', 'Resolved', 'Unresolved'];

    const filteredChallenge = challenges.filter((challenge) => {
        return (
            (level === 'All' || challenge.level === level) &&
            (status === 'All')  &&
            (challenge.content.toLowerCase().includes(search.toLowerCase()))
        );
    });

    const navigate = useNavigate(); // ✅ Gọi hook tại đây

    const toEditor = (id: number) => {
        navigate(`/editor/${id}`); // nên thêm dấu /
    };

    const toOtherChallengeType = (_path : string) => {
        navigate(_path);
    }

    return (
        <div className="text-white px-6 pb-40 min-h-screen">
            <div className="group fixed bottom-4 right-4 w-16 h-16 z-50">

                {/* Green circle - xuất hiện khi hover vào group */}
                <div className="absolute bottom-[-48px] right-[-48px] w-40 h-40 bg-transparent rounded-full shadow-lg z-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">

                    {/* 3 hình tròn nhỏ bên trong - xếp hình cánh quạt */}
                    {[
                        { size: 170, text: 'Algorithm',nav:'/algorithms' },
                        { size: 225, text: 'Problem RS',nav:'/problem-resolves' },
                        { size: 280, text: 'Leet code', nav:'/leet-codes' }].map(angle => (
                        <div onClick={() => toOtherChallengeType(angle.nav)}
                            key={angle.size}
                            className="absolute w-12 h-12 rounded-full shadow-md cursor-pointer text-xs font-bold hover:text-green-500 flex items-center justify-center text-center leading-tight"
                            style={{
                                top: '50%',
                                left: '50%',
                                transform: `rotate(${angle.size}deg) translate(60px) rotate(-${angle.size}deg) translate(-50%, -50%)`
                            }}
                        >
                            {angle.text}
                        </div>
                    ))}

                </div>

                {/* Blue circle - luôn hiển thị */}
                <div className="w-16 h-16 border-2 border-gray-300 rounded-full shadow-lg z-50 group-hover:text-green-500 group-hover:border-transparent cursor-pointer transition-opacity duration-300 flex items-center justify-center text-center leading-tight text-[12px] font-bold">
                    Go to
                </div>

            </div>

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
                    {filteredChallenge.map((challenge) => (
                        <div key={challenge.id} className="bg-neutral-800 text-white cursor-pointer">
                            <div className="p-4" onClick={() => toEditor(challenge.id)}>
                                <h2>ID: {challenge.id}</h2>
                                <h3 className="text-lg font-medium text-sm text-green-500">{challenge.content}</h3>
                                <p>Level: {challenge.level}</p>
                                <p>Status: {"Unresolved"}</p>
                            </div>
                        </div>
                    ))}
                    {filteredChallenge.length === 0 && (
                        <div className="text-white">No challenge found.</div>
                    )}
                </div>
                {/*Filtering  */}
                <div className="w-1/3 bg-transparent p-4 rounded-xl space-y-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="p-2 w-full rounded-lg bg-neutral-700 text-white"
                    />

                    <p>Type</p>
                    <select
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        className="p-2 w-full rounded-lg bg-neutral-700 text-white"
                    >
                        {levels.map((lv) => (
                            <option key={lv} value={lv}>
                                {lv}
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