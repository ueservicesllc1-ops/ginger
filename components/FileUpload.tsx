'use client';

import { useState, useRef } from 'react';
import { uploadFile, isValidImageType, isValidVideoType, formatFileSize } from '@/utils/b2-client';

interface FileUploadProps {
  folder?: string;
  accept?: string;
  maxSize?: number; // en bytes
  onUploadComplete?: (result: {
    url: string;
    fileName: string;
    originalName: string;
  }) => void;
  onError?: (error: string) => void;
}

export default function FileUpload({
  folder,
  accept = 'image/*,video/*',
  maxSize = 100 * 1024 * 1024, // 100MB por defecto
  onUploadComplete,
  onError,
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tamaño
    if (file.size > maxSize) {
      const errorMsg = `El archivo es demasiado grande. Máximo: ${formatFileSize(maxSize)}`;
      onError?.(errorMsg);
      return;
    }

    // Validar tipo (opcional, ya que acept tiene el control)
    setSelectedFile(file);

    // Crear preview
    if (isValidImageType(file)) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setProgress(0);

    try {
      const result = await uploadFile(
        selectedFile,
        folder,
        (progressPercent) => setProgress(progressPercent)
      );

      setUploading(false);
      setProgress(0);
      onUploadComplete?.(result);
      
      // Reset
      setSelectedFile(null);
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error: any) {
      setUploading(false);
      setProgress(0);
      onError?.(error.message || 'Error al subir el archivo');
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Seleccionar archivo
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          disabled={uploading}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
            disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <p className="mt-1 text-xs text-gray-500">
          Tamaño máximo: {formatFileSize(maxSize)}
        </p>
      </div>

      {selectedFile && (
        <div className="border rounded-lg p-4 bg-gray-50">
          <div className="flex items-start gap-4">
            {preview && (
              <div className="flex-shrink-0">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {selectedFile.name}
              </p>
              <p className="text-sm text-gray-500">
                {formatFileSize(selectedFile.size)}
              </p>
              {uploading && (
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    {progress}% subido
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploading ? 'Subiendo...' : 'Subir'}
            </button>
            <button
              onClick={handleCancel}
              disabled={uploading}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


