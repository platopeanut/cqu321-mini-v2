import {GpaType, type ScoreItem} from "@/models/GradeModel";

export function convertToTermName(session: { year: number, isAutumn: boolean }) {
    return `${session.year}${session.isAutumn ? '秋' : '春'}`;
}

export function scoreToNumber(score: number | string) {
    if (typeof score === 'number') return score;
    if (score.startsWith('优'))
        score = 95;
    else if (score.startsWith('良') || score === '合格')
        score = 85;
    else if (score.startsWith('中'))
        score = 75;
    else if (score === '及格')
        score = 65;
    else if (score === '不及格' || score === '不合格')
        score = 50;
    else score = -1; // 未匹配上
    return score;
}

export function scoreToPoint(score: number, gpaType: GpaType) {
    if (gpaType === GpaType.FOUR) {
        if (score < 60) return 0
        if (score >= 90) return 4
        let a = score % 10 * 0.1
        let b = Math.trunc(score / 10) - 6 + 1
        return a + b
    }
    else if (gpaType === GpaType.FIVE) {
        if (score < 60) return 0
        let a = score % 10 * 0.1
        let b = Math.trunc(score / 10) - 6 + 1
        return a + b;
    }
    else return 0;  // 异常
}

export function scoreToColor(score: number) {
    if (score < 0) return 'text-gray';
    const colors = [
        'red',      // [0, 60)
        'orange',   // [60, 70)
        'olive',    // [70, 80)
        'cyan',     // [80, 90)
        'blue'      // [90, 100]
    ];
    let i = 0;
    if (score >= 60) i ++;
    if (score >= 70) i ++;
    if (score >= 80) i ++;
    if (score >= 90) i ++;
    return 'text-' + colors[i];
}

export function filterCourseWhenCalcGpa(scoreItem: ScoreItem) {
    // 过滤学分异常
    if (scoreItem.credit === -1)
        return false;
    // 过滤重修
    if (scoreItem.tags.studyNature !== '初修')
        return false;
    // 过滤四六级
    return !(scoreItem.name === '大学英语(国家四级)' || scoreItem.name === '大学英语(国家六级)');
}
