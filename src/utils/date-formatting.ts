interface dateItem {
  [key: string]: string;
}

export function dateFormatting (value: any, format: any = 'datetime') {
  const options: dateItem = {};
  const locale = 'ru-RU';

  if (format.includes('date')) {
    options.day = '2-digit';
    options.month = 'long';
    options.year = 'numeric';
  }
  if (format.includes('time')) {
    options.hour = '2-digit';
    options.minute = '2-digit';
    options.second = '2-digit';
  }

  return value ? new Intl.DateTimeFormat(locale, options).format(new Date(value)) : '-';
}
