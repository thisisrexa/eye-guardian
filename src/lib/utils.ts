export function formatTime(seconds: number) {
  return `${Math.floor(seconds / 60).toString().padStart(2, '00')}:${(seconds % 60).toString().padStart(2, '00')}`;
}