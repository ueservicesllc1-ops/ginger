'use client';

// Funciones del cliente para subir archivos a B2

export async function uploadFile(
  file: File,
  folder?: string,
  onProgress?: (progress: number) => void
): Promise<{
  success: boolean;
  url: string;
  fileName: string;
  originalName: string;
  size: number;
  contentType: string;
}> {
  const formData = new FormData();
  formData.append('file', file);
  if (folder) {
    formData.append('folder', folder);
  }
  if (file.size > 10 * 1024 * 1024) {
    formData.append('useLargeUpload', 'true');
  }

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // Monitorear progreso
    if (onProgress) {
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          onProgress(percent);
        }
      });
    }

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        try {
          const response = JSON.parse(xhr.responseText);
          resolve({
            success: response.success,
            url: response.url,
            fileName: response.fileName || '',
            originalName: file.name,
            size: file.size,
            contentType: file.type,
          });
        } catch (error) {
          reject(new Error('Error al procesar la respuesta'));
        }
      } else {
        try {
          const error = JSON.parse(xhr.responseText);
          reject(new Error(error.error || 'Error al subir el archivo'));
        } catch {
          reject(new Error(`Error ${xhr.status}: ${xhr.statusText}`));
        }
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error('Error de red al subir el archivo'));
    });

    xhr.addEventListener('abort', () => {
      reject(new Error('Subida cancelada'));
    });

    xhr.open('POST', '/api/upload');
    xhr.send(formData);
  });
}

export function getFileUrl(fileName: string, folder?: string): string {
  const params = new URLSearchParams();
  if (folder) {
    params.append('folder', folder);
  }
  return `/api/upload/${fileName}${params.toString() ? `?${params.toString()}` : ''}`;
}

export async function deleteFile(fileName: string, folder?: string): Promise<void> {
  const params = new URLSearchParams();
  if (folder) {
    params.append('folder', folder);
  }
  
  const response = await fetch(`/api/upload/${fileName}?${params.toString()}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Error al eliminar el archivo');
  }
}

// Helper para convertir File a base64 (para previews)
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Helper para validar tipo de archivo
export function isValidImageType(file: File): boolean {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  return validTypes.includes(file.type);
}

export function isValidVideoType(file: File): boolean {
  const validTypes = ['video/mp4', 'video/quicktime', 'video/mov', 'video/webm'];
  return validTypes.includes(file.type);
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

