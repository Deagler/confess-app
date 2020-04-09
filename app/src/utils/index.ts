const emailRegexp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export function IsValidEmailFormat(emailToValidate: string): boolean {
  return emailRegexp.test(emailToValidate);
}

const supportedEmailTLDS = ['.ac.nz', '.edu.au', '.edu'];
export function IsSupportedEmailTLD(emailToValidate: string): boolean {
  if (!emailToValidate) {
    return false;
  }
  return supportedEmailTLDS.some((TLD) =>
    emailToValidate.endsWith(TLD.toLowerCase())
  );
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
  let link: string = '/';

  if (community) {
    link = link.concat(community);
  }

  link = link.concat(pathname);

  if (channel) {
    link = link.concat(`?channel=${channel}`);
  }
  return link;
}
