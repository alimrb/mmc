export function randomOf(items: any[]) {
    return items[Math.floor(Math.random()*items.length)];
}

export function randomFromTo(min: number , max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}