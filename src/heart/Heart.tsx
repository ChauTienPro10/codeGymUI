
import '../taiwind.css';


import React, { useEffect, useState } from 'react';

const HeartWithBirthdayAndMessage: React.FC = () => {
    // Trạng thái màu của dòng nhắn nhủ
    const [messageColor, setMessageColor] = useState<string>('text-white');
  
    // Dữ liệu nhắn nhủ
    const message = "Không có dỗi nghe hong";
  
    useEffect(() => {
      // Hàm thay đổi màu sắc của nhắn nhủ mỗi giây
      const colorChangeInterval = setInterval(() => {
        const colors = ['text-red-500', 'text-yellow-500', 'text-green-500', 'text-blue-500', 'text-purple-500'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setMessageColor(randomColor);
      }, 1000); // Thay đổi màu sắc mỗi giây
  
      // Dọn dẹp interval khi component unmount
      return () => clearInterval(colorChangeInterval);
    }, []);
  
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="relative w-96 h-96">
          {/* Background hiệu ứng của trái tim */}
          <div className="absolute inset-0 bg-pink-600 rounded-full blur-[100px] opacity-70 animate-[ping_2s_ease-in-out_infinite]" />
  
          {/* Trái tim */}
          <svg
            className="relative w-full h-full text-pink-400 drop-shadow-[0_0_40px_rgba(255,0,128,1)]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
  
          {/* Phần ngày sinh chuyển động */}
          <div className="absolute top-0 w-full text-center animate-[bounce_2s_ease-in-out_infinite]">
            <span className="text-xl font-semibold text-white drop-shadow-lg mb-2">
              Ê nhóc {/* Ngày sinh của bạn */}
            </span>
          </div>
  
          {/* Phần tên chuyển động */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-1xl font-bold text-white drop-shadow-lg">
              Nguyễn Thị Thảo Ngân
            </span>
          </div>
  
          {/* Dòng nhắn nhủ với màu sắc thay đổi mỗi giây */}
          <div className="absolute bottom-0 w-full text-center animate-[fadeIn_2s]">
            <span className={`text-lg font-semibold ${messageColor} drop-shadow-lg`}>
              {message}
            </span>
          </div>
        </div>
      </div>
    );
  };
  
  export default HeartWithBirthdayAndMessage;