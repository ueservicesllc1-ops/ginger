import { NextRequest, NextResponse } from 'next/server';
import { deleteFileFromB2, getFileFromB2, getFileUrlFromB2 } from '@/lib/b2';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ file: string }> }
) {
  try {
    const { file } = await params;
    const folder = request.nextUrl.searchParams.get('folder');

    // Obtener URL del archivo
    const fileUrl = await getFileUrlFromB2(file, folder || undefined);

    // Opción 1: Redirigir a la URL directa (más eficiente)
    // return NextResponse.redirect(fileUrl);

    // Opción 2: Proxy el archivo (para evitar CORS)
    try {
      const buffer = await getFileFromB2(file, folder || undefined);
      
      // Determinar content type por extensión
      const extension = file.split('.').pop()?.toLowerCase();
      let contentType = 'application/octet-stream';
      
      if (extension === 'jpg' || extension === 'jpeg') contentType = 'image/jpeg';
      else if (extension === 'png') contentType = 'image/png';
      else if (extension === 'gif') contentType = 'image/gif';
      else if (extension === 'webp') contentType = 'image/webp';
      else if (extension === 'mp4') contentType = 'video/mp4';
      else if (extension === 'mov') contentType = 'video/quicktime';
      else if (extension === 'pdf') contentType = 'application/pdf';

      return new NextResponse(buffer as BodyInit, {
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=31536000, immutable',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
        },
      });
    } catch (error) {
      // Si falla obtener el archivo, redirigir a URL directa
      return NextResponse.redirect(fileUrl);
    }
  } catch (error: any) {
    console.error('Error obteniendo archivo:', error);
    return NextResponse.json(
      { error: error.message || 'Error al obtener el archivo' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ file: string }> }
) {
  try {
    const { file } = await params;
    const folder = request.nextUrl.searchParams.get('folder');

    await deleteFileFromB2(file, folder || undefined);

    return NextResponse.json({
      success: true,
      message: 'Archivo eliminado correctamente',
    }, { status: 200 });
  } catch (error: any) {
    console.error('Error eliminando archivo:', error);
    return NextResponse.json(
      { error: error.message || 'Error al eliminar el archivo' },
      { status: 500 }
    );
  }
}


