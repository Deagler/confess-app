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

export function removeDuplicatesById<T extends { id: string } | null>(
  items: T[]
): T[] {
  const newItems: T[] = [];
  const idSet = new Set();
  items.forEach((item) => {
    if (item && !idSet.has(item.id)) {
      idSet.add(item.id);
      newItems.push(item);
    }
  });
  return newItems;
}

export function buildLink(
  pathname: string,
  community?: string | null,
  channel?: string | null
) {
  let link = pathname;

  if (community) {
    link = link.concat(`?community=${community}`);
  }

  if (channel) {
    link = link.concat(`&channel=${channel}`);
  }
  return link;
}
