interface errorType {
  [key: string]: string
}

const ERRPR_CODES: errorType = {
  MISSING_EMAIL: 'Потерянный email',
  EMAIL_NOT_FOUND: 'Почта не найдена',
  INVALID_PASSWORD: 'Неверный пароль',
  'TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.': '\n' +
    'Доступ к этой учетной записи был временно отключен из-за множества неудачных попыток входа в систему. Вы можете немедленно восстановить его, сбросив пароль, или вы можете повторить попытку позже.',
};

export function error (code: any) {
  return ERRPR_CODES[code] ? ERRPR_CODES[code] : 'Неизвестная ошибка';
}
