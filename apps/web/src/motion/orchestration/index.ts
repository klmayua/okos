/**
 * OK.OS — MOTION ORCHESTRATION
 */

export function orchestrate(steps: (() => void)[], delay: number): void {
  steps.forEach((step, index) => {
    setTimeout(step, index * delay);
  });
}
