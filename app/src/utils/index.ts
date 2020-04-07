const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export function IsValidEmailFormat(emailToValidate: string): boolean {
  return emailRegexp.test(emailToValidate);
}

export function isNullOrWhitespace(input: string | null | undefined): boolean {
  return !input || !input.trim();
}

export function truncateString(str: string, length: number): string {
  if (str.length <= length) {
    return str;
  }

  return str.slice(0, length) + '...';
}
