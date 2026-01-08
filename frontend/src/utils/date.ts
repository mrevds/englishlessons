// Утилита для безопасного форматирования дат

export const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) {
    return '—';
  }

  try {
    const date = new Date(dateString);
    
    // Проверяем, что дата валидна
    if (isNaN(date.getTime())) {
      return '—';
    }

    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    console.error('Error formatting date:', dateString, error);
    return '—';
  }
};

export const formatDateTime = (dateString: string | null | undefined): string => {
  if (!dateString) {
    return '—';
  }

  try {
    const date = new Date(dateString);
    
    // Проверяем, что дата валидна
    if (isNaN(date.getTime())) {
      return '—';
    }

    return date.toLocaleString('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch (error) {
    console.error('Error formatting datetime:', dateString, error);
    return '—';
  }
};

export const formatDateShort = (dateString: string | null | undefined): string => {
  if (!dateString) {
    return '—';
  }

  try {
    const date = new Date(dateString);
    
    // Проверяем, что дата валидна
    if (isNaN(date.getTime())) {
      return '—';
    }

    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  } catch (error) {
    console.error('Error formatting date short:', dateString, error);
    return '—';
  }
};

export const isValidDate = (dateString: string | null | undefined): boolean => {
  if (!dateString) {
    return false;
  }

  try {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  } catch {
    return false;
  }
};

