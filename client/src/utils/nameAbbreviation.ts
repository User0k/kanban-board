export function nameAbbreviation(name: string) {
  const splitted = name.split(' ');

  if (splitted.length > 1 && splitted[1].length) {
    return (name[0] + splitted[1][0]).toUpperCase();
  }

  return name[0].toUpperCase();
}
