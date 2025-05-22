"use client";
import Image from "next/image";
import { Button } from "@/components/common/Button";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  message?: React.ReactNode;
  buttonText?: string;
  cancelText?: string;
  isHTML?: boolean;
  onConfirm: () => void;
  image?: string;
  companyColor?: string;
}

export function CheckCancelModal({
  isOpen,
  onClose,
  title,
  message,
  buttonText,
  cancelText,
  isHTML = false,
  onConfirm,
  image,
  companyColor,
}: ModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <div className="text-lg font-bold mb-4">{title}</div>
        {image && (
          <Image
            src={image}
            alt="image"
            className="ml-16"
            width={200}
            height={200}
          />
        )}
        {isHTML ? (
          <div dangerouslySetInnerHTML={{ __html: message || "" }} />
        ) : (
          <div className="mb-4 whitespace-pre-line">{message}</div>
        )}

        <div className="flex gap-4">
          <Button
            onClick={onConfirm}
            className={` h-[53px] flex-1 text-white py-2 rounded-lg bg-${companyColor} hover:bg-${companyColor}`}>
            {buttonText}
          </Button>
          {cancelText && (
            <Button
              onClick={onClose}
              className=" h-[53px] flex-1 bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500">
              {cancelText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
