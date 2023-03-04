export function toTimeString(totalSeconds: number) {
  const FIRST_TWO_DIGITS_NUMBER = 10;
  const SECONDS_IN_MINUTE = 60;
  const MINUTES_IN_HOUR = 60;
  const HOURS_IN_DAY = 24;

  if (totalSeconds >= SECONDS_IN_MINUTE * MINUTES_IN_HOUR * HOURS_IN_DAY) {
    return "Have a rest! You've been playing all day!";
  }

  let totalMinutes = Math.floor(totalSeconds / SECONDS_IN_MINUTE);
  let hours = Math.floor(totalMinutes / MINUTES_IN_HOUR);
  let minutes = totalMinutes % MINUTES_IN_HOUR;
  let seconds = totalSeconds % SECONDS_IN_MINUTE;

  function normalizeTime(timeValue: number) {
    return timeValue < FIRST_TWO_DIGITS_NUMBER ? '0' + timeValue : timeValue;
  }

  let minutesAndSeconds = `${normalizeTime(minutes)} : ${normalizeTime(seconds)}`;

  return `${hours ? normalizeTime(hours) + ' : ' : ''}${minutesAndSeconds}`;
}
