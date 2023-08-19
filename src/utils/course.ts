/**
 * 将weeks数组转为weeks字符串
 * @param {number[]} weeks
 * @return {string}
 */
export function getWeeksText(weeks: number[]) {
    if (weeks.length === 0) return "";
    const weekMatrix: number[][] = [[weeks[0]]];
    for (let i = 1; i < weeks.length; i++) {
        if (weeks[i] === weeks[i - 1] + 1) {
            weekMatrix[weekMatrix.length - 1].push(weeks[i]);
        } else {
            weekMatrix.push([weeks[i]]);
        }
    }
    let text = '';
    for (let i = 0; i < weekMatrix.length; i++) {
        if (weekMatrix[i].length === 1) {
            text += `${weekMatrix[i][0]}`;
        } else {
            text += `${weekMatrix[i][0]}-${weekMatrix[i][weekMatrix[i].length - 1]}`;
        }
        if (i < weekMatrix.length - 1) text += ', ';
    }
    return text;
}

/**
 * 将weeksText转为weeks数组
 * @param {string} weeksText
 * @return {number[]}
 */
export function parseWeeksText(weeksText: string) {
    const periods = weeksText.split(',').map(it => it.trim());
    const weeks = new Set<number>();
    for (const period of periods) {
        const tmp = period.split('-');
        if (tmp.length === 1) {
            weeks.add(parseInt(tmp[0]));
            continue;
        }
        for (let i = parseInt(tmp[0]); i <= parseInt(tmp[1]); i++) {
            weeks.add(i);
        }
    }
    return Array.from(weeks);
}