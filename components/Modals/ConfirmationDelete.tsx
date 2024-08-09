"use client";

import React from "react";
import { IconSquareRoundedX, IconExclamationCircle } from "@tabler/icons-react";

interface ConfirmationDeleteProps {
  message: string;
  onClose: () => void;
  onConfirm: () => void;
  isOpen: boolean;
}

const ConfirmationDelete: React.FC<ConfirmationDeleteProps> = ({
  message,
  onClose,
  onConfirm,
  isOpen,
}) => {
  if (!isOpen) return null;

  return (
    <div className="flex items-center justify-center overflow-y-auto overflow-x-hidden fixed inset-0 z-50 w-full h-full">
      <div className="relative p-4 w-full max-w-md h-auto">
        <div className="relative bg-white rounded-lg shadow">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            onClick={onClose}
          >
            <IconSquareRoundedX />
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-6 text-center">
            <IconExclamationCircle size={40} className="mx-auto text-gray-500"/>
            <h3 className="mb-5 text-lg font-normal text-gray-500">{message}</h3>
            <button
              type="button"
              onClick={onConfirm}
              className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            >
              Yes, I'm sure
            </button>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 rounded-lg text-sm px-5 py-2.5 focus:outline-none"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDelete;
