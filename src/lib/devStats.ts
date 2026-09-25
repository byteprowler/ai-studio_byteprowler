export const BOOTCAMP_START_DATE = "2024-05-31";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export function getDevUptimeStats(startDate = BOOTCAMP_START_DATE) {
  const startedAt = new Date(`${startDate}T00:00:00.000Z`);
  const now = new Date();
  const daysSinceStart = Math.max(
    0,
    Math.floor((now.getTime() - startedAt.getTime()) / MS_PER_DAY)
  );

  return {
    daysSinceStart,
    startYear: startedAt.getUTCFullYear(),
  };
}
