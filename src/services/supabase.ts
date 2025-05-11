import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = "https://mmteicsxnqlmxukuuhoz.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tdGVpY3N4bnFsbXh1a3V1aG96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0ODYyMDAsImV4cCI6MjA2MjA2MjIwMH0.zORseydhI5gyNefcRE820ENDnchEanrNXEDSF59-mB8";

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing. Please check your environment variables.');
}

// Crear un cliente de Supabase
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

interface StorageResponse {
  data: { path: string } | null;
  error: { message: string; statusCode: number } | null;
}

interface PublicUrlResponse {
  data: string | null;
  error: { message: string; statusCode: number } | null;
}

// Función para subir un PDF a Supabase Storage
export const uploadPDF = async (file: Blob, fileName: string): Promise<StorageResponse> => {
  try {
    const { data, error } = await supabase.storage
      .from('pdfs')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) throw error;

    return { data, error: null };
  } catch (error: unknown) {
    console.error('Error al subir PDF:', error);
    return {
      data: null,
      error: error instanceof Error
        ? { message: error.message, statusCode: 500 }
        : { message: 'Error desconocido', statusCode: 500 }
    };
  }
};

// Función para obtener una URL pública para un PDF
export const getPublicURL = async (fileName: string): Promise<PublicUrlResponse> => {
  try {
    const { data } = supabase.storage
      .from('pdfs')
      .getPublicUrl(fileName);

    return { data: data.publicUrl, error: null };
  } catch (error: unknown) {
    console.error('Error al obtener URL pública:', error);
    return {
      data: null,
      error: error instanceof Error
        ? { message: error.message, statusCode: 500 }
        : { message: 'Error desconocido', statusCode: 500 }
    };
  }
};

// Función para guardar metadatos del PDF en la base de datos
export const savePDFMetadata = async (
  fileName: string,
  publicUrl: string,
  preferences: any
): Promise<{ data: any; error: any }> => {
  const { data, error } = await supabase
    .from('pdf-documents')
    .insert([
      {
        file_name: fileName,
        public_url: publicUrl,
        preferences: preferences,
        created_at: new Date().toISOString(),
        download_count: 0,
      },
    ])
    .select();

  return { data, error };
};

// Función para obtener metadatos de un PDF por su ID
export const getPDFMetadata = async (id: string): Promise<{ data: any; error: any }> => {
  const { data, error } = await supabase
    .from('pdf-documents')
    .select('*')
    .eq('id', id)
    .single();

  return { data, error };
};

// Función para incrementar el contador de descargas
export const incrementDownloadCount = async (id: string): Promise<{ data: any; error: any }> => {
  const { data, error } = await supabase.rpc('increment_download_count', {
    document_id: id,
  });

  return { data, error };
};

// Función para eliminar un PDF por su ID (limpieza automática)
export const deletePDF = async (id: string, filePath: string): Promise<{ data: any; error: any }> => {
  // Primero eliminar el archivo de storage
  const { error: storageError } = await supabase.storage
    .from('trip-pdfs')
    .remove([filePath]);

  if (storageError) {
    return { data: null, error: storageError };
  }

  // Luego eliminar el registro de la base de datos
  const { data, error } = await supabase
    .from('pdf-documents')
    .delete()
    .eq('id', id);

  return { data, error };
}; 