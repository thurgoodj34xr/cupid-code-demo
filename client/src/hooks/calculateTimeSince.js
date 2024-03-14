export function calculateTimeSince(time) {
    const creationTime = new Date(time);
    const currentTime = new Date();
    const timeDifference = currentTime - creationTime;
    const seconds = Math.floor(timeDifference / 1000);

    let timeValue, timeUnit;
    if (seconds < 60) {
        timeValue = seconds;
        timeUnit = 's';
    } else if (seconds < 3600) {
        timeValue = Math.floor(seconds / 60);
        timeUnit = 'm';
    } else {
        timeValue = Math.floor(seconds / 3600);
        timeUnit = 'h';
    }
    return `${timeValue}${timeUnit}`
}
