import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir, access } from 'fs/promises';
import { join } from 'path';
import { randomUUID } from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No se proporcionó archivo' }, { status: 400 });
    }

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'El archivo debe ser una imagen' }, { status: 400 });
    }

    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'La imagen no debe superar 5MB' }, { status: 400 });
    }

    // Generar nombre único
    const fileExtension = file.name.split('.').pop();
    const fileName = `${randomUUID()}.${fileExtension}`;
    const uploadDir = join(process.cwd(), 'public', 'uploads', 'images');
    const filePath = join(uploadDir, fileName);

    // Crear directorio si no existe
    await mkdir(uploadDir, { recursive: true });

    // Guardar archivo
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Verificar que el archivo existe
    try {
      await access(filePath);
    } catch {
      console.error('Error: Archivo no encontrado después de guardar:', filePath);
      return NextResponse.json({ error: 'Error al guardar imagen' }, { status: 500 });
    }

    // Retornar URL absoluta para emails
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const imageUrl = `${baseUrl}/uploads/images/${fileName}`;

    console.log('Imagen subida exitosamente:', imageUrl);
    
    // Agregar headers CORS para prevenir errores de TinyMCE
    const response = NextResponse.json({ url: imageUrl });
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    
    return response;
  } catch (error) {
    console.error('Error al subir imagen:', error);
    return NextResponse.json({ error: 'Error al procesar la imagen' }, { status: 500 });
  }
}