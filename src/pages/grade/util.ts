export function convertToTermName(session: { year: number, isAutumn: boolean }) {
    return `${session.year}${session.isAutumn ? '秋' : '春'}`;
}

export function scoreToColor(score: number | string) {
    const colors = [
        'red',      // [0, 60)
        'orange',   // [60, 70)
        'olive',    // [70, 80)
        'cyan',     // [80, 90)
        'blue'      // [90, 100]
    ];
    if (typeof score === 'string') return 'text-grey';
    let i = 0;
    if (score >= 60) i ++;
    if (score >= 70) i ++;
    if (score >= 80) i ++;
    if (score >= 90) i ++;
    return 'text-' + colors[i];
}