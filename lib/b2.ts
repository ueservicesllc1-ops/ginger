import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

// Configuración de Backblaze B2 (compatible con S3)
const B2_CONFIG = {
  endpoint: 'https://s3.us-east-005.backblazeb2.com',
  region: 'us-east-005',
  credentials: {
    accessKeyId: process.env.B2_KEY_ID || '005c2b526be0baa0000000020',
    secretAccessKey: process.env.B2_APPLICATION_KEY || 'K005TfRBBxUbg1A+kd7ueV0H7UbttwA',
  },
  bucketName: process.env.B2_BUCKET_NAME || 'ginger',
  bucketId: '5c124b4542a64b2e90ab0a1a',
};

// Crear cliente S3 configurado para B2
export const s3Client = new S3Client({
  endpoint: B2_CONFIG.endpoint,
  region: B2_CONFIG.region,
  credentials: B2_CONFIG.credentials,
  forcePathStyle: true, // Necesario para B2
});

// Subir archivo a B2
export async function uploadFileToB2(
  file: Buffer | Uint8Array | string,
  fileName: string,
  contentType: string,
  folder?: string
): Promise<string> {
  try {
    const key = folder ? `${folder}/${fileName}` : fileName;

    // Para archivos pequeños, usar PutObjectCommand
    if (typeof file === 'string') {
      // Si es una URL o ruta, necesitas convertirla a buffer primero
      throw new Error('Para subir desde URL, usa uploadFromUrl');
    }

    const command = new PutObjectCommand({
      Bucket: B2_CONFIG.bucketName,
      Key: key,
      Body: file,
      ContentType: contentType,
      ACL: 'public-read', // Hacer público
    });

    await s3Client.send(command);

    // URL pública del archivo
    const publicUrl = `${B2_CONFIG.endpoint}/${B2_CONFIG.bucketName}/${key}`;
    return publicUrl;
  } catch (error) {
    console.error('Error subiendo archivo a B2:', error);
    throw error;
  }
}

// Subir archivo grande con multipart upload
export async function uploadLargeFileToB2(
  file: Buffer | Uint8Array,
  fileName: string,
  contentType: string,
  folder?: string,
  onProgress?: (progress: number) => void
): Promise<string> {
  try {
    const key = folder ? `${folder}/${fileName}` : fileName;

    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: B2_CONFIG.bucketName,
        Key: key,
        Body: file,
        ContentType: contentType,
        ACL: 'public-read',
      },
    });

    // Monitorear progreso si se proporciona callback
    if (onProgress) {
      upload.on('httpUploadProgress', (progress) => {
        if (progress.total) {
          const percent = Math.round(((progress.loaded || 0) / progress.total) * 100);
          onProgress(percent);
        }
      });
    }

    await upload.done();

    const publicUrl = `${B2_CONFIG.endpoint}/${B2_CONFIG.bucketName}/${key}`;
    return publicUrl;
  } catch (error) {
    console.error('Error subiendo archivo grande a B2:', error);
    throw error;
  }
}

// Obtener URL firmada para descargar archivo
export async function getFileUrlFromB2(fileName: string, folder?: string): Promise<string> {
  const key = folder ? `${folder}/${fileName}` : fileName;
  const publicUrl = `${B2_CONFIG.endpoint}/${B2_CONFIG.bucketName}/${key}`;
  return publicUrl;
}

// Eliminar archivo de B2
export async function deleteFileFromB2(fileName: string, folder?: string): Promise<void> {
  try {
    const key = folder ? `${folder}/${fileName}` : fileName;

    const command = new DeleteObjectCommand({
      Bucket: B2_CONFIG.bucketName,
      Key: key,
    });

    await s3Client.send(command);
  } catch (error) {
    console.error('Error eliminando archivo de B2:', error);
    throw error;
  }
}

// Listar archivos en una carpeta
export async function listFilesInB2(folder?: string, maxKeys: number = 100): Promise<string[]> {
  try {
    const command = new ListObjectsV2Command({
      Bucket: B2_CONFIG.bucketName,
      Prefix: folder || '',
      MaxKeys: maxKeys,
    });

    const response = await s3Client.send(command);
    const files = (response.Contents || []).map((obj) => obj.Key || '').filter(Boolean);
    return files;
  } catch (error) {
    console.error('Error listando archivos de B2:', error);
    throw error;
  }
}

// Obtener archivo como buffer
export async function getFileFromB2(fileName: string, folder?: string): Promise<Buffer> {
  try {
    const key = folder ? `${folder}/${fileName}` : fileName;

    const command = new GetObjectCommand({
      Bucket: B2_CONFIG.bucketName,
      Key: key,
    });

    const response = await s3Client.send(command);
    const chunks: Uint8Array[] = [];
    
    if (response.Body) {
      for await (const chunk of response.Body as any) {
        chunks.push(chunk);
      }
    }

    return Buffer.concat(chunks);
  } catch (error) {
    console.error('Error obteniendo archivo de B2:', error);
    throw error;
  }
}

