export function formatNumber(n: number) {
  const s = n.toString()
  return s[1] ? s : '0' + s
}

export function range(start: number, end: number) {
  const li: number[] = [];
  for (let i = start; i < end; i++) {
    li.push(i);
  }
  return li;
}

export function randomInt(start: number, end: number) {
  return Math.trunc(Math.random() * (end - start)) + start;
}

export function tryParseNumber(text: string): string | number {
    const num = Number(text);
    return isNaN(num) ? text : num;
}
