import { NextRequest, NextResponse } from 'next/server';
import { uploadFileToB2, uploadLargeFileToB2 } from '@/lib/b2';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string | null;
    const useLargeUpload = formData.get('useLargeUpload') === 'true';

    if (!file) {
      return NextResponse.json(
        { error: 'No se proporcionó ningún archivo' },
        { status: 400 }
      );
    }

    // Validar tamaño del archivo (100MB máximo por defecto)
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `El archivo es demasiado grande. Máximo: ${maxSize / 1024 / 1024}MB` },
        { status: 400 }
      );
    }

    // Convertir File a Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Determinar content type
    const contentType = file.type || 'application/octet-stream';

    // Generar nombre único para el archivo
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileExtension = file.name.split('.').pop() || '';
    const fileName = `${timestamp}-${randomString}.${fileExtension}`;

    // Subir archivo
    let publicUrl: string;
    
    if (useLargeUpload && file.size > 10 * 1024 * 1024) {
      // Usar multipart upload para archivos grandes (>10MB)
      publicUrl = await uploadLargeFileToB2(
        buffer,
        fileName,
        contentType,
        folder || undefined
      );
    } else {
      // Upload normal para archivos pequeños
      publicUrl = await uploadFileToB2(
        buffer,
        fileName,
        contentType,
        folder || undefined
      );
    }

    return NextResponse.json({
      success: true,
      url: publicUrl,
      fileName: fileName,
      originalName: file.name,
      size: file.size,
      contentType,
    }, { status: 200 });
  } catch (error: any) {
    console.error('Error en upload:', error);
    return NextResponse.json(
      { error: error.message || 'Error al subir el archivo' },
      { status: 500 }
    );
  }
}


