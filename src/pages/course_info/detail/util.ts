export const ScoreLevels = [
    ['red', '[0, 60)'],
    ['orange', '[60, 70)'],
    ['olive', '[70, 80)'],
    ['cyan', '[80, 90)'],
    ['blue', '[90, 100]']
];

export function ratioDisplay(ratio: number) {
    return '' + Math.round(ratio * 100);
}