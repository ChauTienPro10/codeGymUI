import React from 'react';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

export interface CustomAlertProps {
  message: string;
  type?: AlertType;
  onClose?: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ message, type = 'info', onClose }) => {
  const baseStyle = 'fixed top-20 right-4 z-50 p-4 rounded-xl shadow-md flex items-center justify-between min-w-[250px]';
  const typeStyle: Record<AlertType, string> = {
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800',
    info: 'bg-blue-100 text-blue-800',
  };

  return (
    <div className={`${baseStyle} ${typeStyle[type]}`}>
      <span>{message}</span>
      {onClose && (
        <button onClick={onClose} className="ml-4 font-bold text-lg">×</button>
      )}
    </div>
  );
};

export default CustomAlert;
