import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://mmteicsxnqlmxukuuhoz.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tdGVpY3N4bnFsbXh1a3V1aG96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0ODYyMDAsImV4cCI6MjA2MjA2MjIwMH0.zORseydhI5gyNefcRE820ENDnchEanrNXEDSF59-mB8";

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL or Anon Key is missing. Please check your environment variables.');
}

// Crear un cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Función para subir un PDF a Supabase Storage
export const uploadPDF = async (pdfBlob: Blob, fileName: string): Promise<{ data: any; error: any }> => {
  const { data, error } = await supabase.storage
    .from('trip-pdfs')
    .upload(`public/${fileName}`, pdfBlob, {
      contentType: 'application/pdf',
      cacheControl: '3600',
      upsert: true, // Sobrescribir si existe
    });

  return { data, error };
};

// Función para obtener una URL pública para un PDF
export const getPublicURL = (path: string): string => {
  const { data } = supabase.storage.from('trip-pdfs').getPublicUrl(path);
  return data.publicUrl;
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