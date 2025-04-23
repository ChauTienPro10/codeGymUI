import React from 'react';
import '../taiwind.css';
import { FaGithub, FaTwitter, FaFacebook, FaCode } from "react-icons/fa";


const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-300 py-10 px-6 mt-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo + intro */}
        <div>
          <div className="text-xl font-bold text-white flex items-center gap-2 mb-4">
            <FaCode />
            CodeGym-Nâng code như nâng tạ
          </div>
          <p className="text-sm leading-relaxed">
            Nền tảng luyện code thời gian thực, không cần cài đặt. Học - Thực hành - Chia sẻ.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-white font-semibold mb-4">Liên kết</h4>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-white transition">Trang chủ</a></li>
            <li><a href="/about" className="hover:text-white transition">Giới thiệu</a></li>
            <li><a href="/contact" className="hover:text-white transition">Liên hệ</a></li>
          </ul>
        </div>

        {/* Social media */}
        <div>
          <h4 className="text-white font-semibold mb-4">Theo dõi chúng tôi</h4>
          <div className="flex gap-4 text-xl">
            <a href="https://github.com/ChauTienPro10" target="_blank" rel="noreferrer" className="hover:text-white transition">
              <FaGithub />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition">
              <FaTwitter />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white transition">
              <FaFacebook />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-neutral-700 pt-4 text-sm text-center">
        © {new Date().getFullYear()} CodeGym. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;