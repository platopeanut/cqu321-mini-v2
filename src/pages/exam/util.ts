// ['red', '[0, 60)'],
//     ['orange', '[60, 70)'],
//     ['olive', '[70, 80)'],
//     ['cyan', '[80, 90)'],
//     ['blue', '[90, 100]']
export function calcHintColorClass(days: number, isOver: boolean) {
    if (isOver || days < 0) return 'std-color-secondary';
    if (days === 0) return 'text-red';
    if (days <= 3) return 'text-orange';
    if (days <= 5) return 'text-olive';
    if (days <= 7) return 'text-cyan';
    return 'text-blue';
}