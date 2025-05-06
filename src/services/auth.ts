import { supabase } from './supabase';

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  created_at?: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface SignUpData extends UserCredentials {
  name?: string;
}

/**
 * Registrar un nuevo usuario con email y contraseña
 */
export const signUp = async (data: SignUpData): Promise<{ user: AuthUser | null; error: Error | null }> => {
  const { email, password, name } = data;
  
  // Registrar el usuario con Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name
      }
    }
  });

  if (authError) {
    return { user: null, error: authError };
  }

  // Si no hay usuario, devolver error
  if (!authData.user) {
    return { 
      user: null, 
      error: new Error('No se pudo crear el usuario. Por favor, inténtalo de nuevo.') 
    };
  }

  // Crear un registro en la tabla de perfiles para el usuario
  if (authData.user.id) {
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authData.user.id,
        email,
        name,
        created_at: new Date().toISOString()
      });

    if (profileError) {
      console.error('Error al crear perfil de usuario:', profileError);
      // No retornamos este error porque el usuario ya se creó en Auth
    }
  }

  // Devolver el usuario autenticado
  return { 
    user: {
      id: authData.user.id,
      email: authData.user.email || '',
      name: name
    }, 
    error: null 
  };
};

/**
 * Iniciar sesión con email y contraseña
 */
export const signIn = async (credentials: UserCredentials): Promise<{ user: AuthUser | null; error: Error | null }> => {
  const { email, password } = credentials;
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    return { user: null, error };
  }

  if (!data.user) {
    return { user: null, error: new Error('No se pudo iniciar sesión') };
  }

  // Obtener datos de perfil
  const { data: profile } = await supabase
    .from('profiles')
    .select('name, avatar_url')
    .eq('id', data.user.id)
    .single();

  return {
    user: {
      id: data.user.id,
      email: data.user.email || '',
      name: profile?.name || data.user.user_metadata?.name,
      avatar_url: profile?.avatar_url,
      created_at: data.user.created_at
    },
    error: null
  };
};

/**
 * Cerrar sesión
 */
export const signOut = async (): Promise<{ error: Error | null }> => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

/**
 * Recuperar contraseña
 */
export const resetPassword = async (email: string): Promise<{ error: Error | null }> => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  return { error };
};

/**
 * Actualizar contraseña
 */
export const updatePassword = async (password: string): Promise<{ error: Error | null }> => {
  const { error } = await supabase.auth.updateUser({
    password
  });
  return { error };
};

/**
 * Obtener usuario actual
 */
export const getCurrentUser = async (): Promise<{ user: AuthUser | null; error: Error | null }> => {
  const { data, error } = await supabase.auth.getUser();
  
  if (error || !data?.user) {
    return { user: null, error: error || new Error('No hay usuario autenticado') };
  }

  // Obtener datos de perfil
  const { data: profile } = await supabase
    .from('profiles')
    .select('name, avatar_url')
    .eq('id', data.user.id)
    .single();

  return {
    user: {
      id: data.user.id,
      email: data.user.email || '',
      name: profile?.name || data.user.user_metadata?.name,
      avatar_url: profile?.avatar_url,
      created_at: data.user.created_at
    },
    error: null
  };
};

/**
 * Actualizar datos del perfil
 */
export const updateProfile = async (profile: Partial<AuthUser>): Promise<{ error: Error | null }> => {
  const { data: user } = await supabase.auth.getUser();
  
  if (!user || !user.user) {
    return { error: new Error('No hay usuario autenticado') };
  }

  // Actualizar metadatos de usuario en Auth
  if (profile.name) {
    const { error: metadataError } = await supabase.auth.updateUser({
      data: { name: profile.name }
    });

    if (metadataError) {
      return { error: metadataError };
    }
  }

  // Actualizar perfil en la tabla profiles
  const { error } = await supabase
    .from('profiles')
    .update({
      name: profile.name,
      avatar_url: profile.avatar_url,
      updated_at: new Date().toISOString()
    })
    .eq('id', user.user.id);

  return { error };
};

/**
 * Suscribirse a cambios de autenticación
 */
export const onAuthStateChange = (callback: (user: AuthUser | null) => void) => {
  const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
    if (session && session.user) {
      // Obtener datos de perfil
      const { data: profile } = await supabase
        .from('profiles')
        .select('name, avatar_url')
        .eq('id', session.user.id)
        .single();

      callback({
        id: session.user.id,
        email: session.user.email || '',
        name: profile?.name || session.user.user_metadata?.name,
        avatar_url: profile?.avatar_url,
        created_at: session.user.created_at
      });
    } else {
      callback(null);
    }
  });

  // Retornar función para desuscribirse
  return () => {
    data.subscription.unsubscribe();
  };
}; 