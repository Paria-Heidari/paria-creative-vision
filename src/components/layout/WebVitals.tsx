'use client';

import { useReportWebVitals } from 'next/web-vitals';

// Thresholds from https://web.dev/vitals/
const THRESHOLDS: Record<string, [number, number]> = {
  CLS: [0.1, 0.25],
  FCP: [1800, 3000],
  LCP: [2500, 4000],
  TTFB: [800, 1800],
  INP: [200, 500],
};

function rate(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const thresholds = THRESHOLDS[name];
  if (!thresholds) return 'good';
  if (value <= thresholds[0]) return 'good';
  if (value <= thresholds[1]) return 'needs-improvement';
  return 'poor';
}

const COLORS = {
  good: '#0cce6b',
  'needs-improvement': '#ffa400',
  poor: '#ff4e42',
} as const;

export function WebVitals() {
  useReportWebVitals((metric) => {
    const rating = rate(metric.name, metric.value);
    const color = COLORS[rating];
    const unit = metric.name === 'CLS' ? '' : 'ms';

    if (process.env.NODE_ENV === 'development') {
      console.log(
        `%c[Web Vitals] ${metric.name}: ${metric.value.toFixed(metric.name === 'CLS' ? 4 : 0)}${unit} — ${rating}`,
        `color: ${color}; font-weight: bold`,
      );
    }

    // Production: swap console.log for a fetch to your analytics endpoint.
    // Example:
    // if (process.env.NODE_ENV === 'production') {
    //   fetch('/api/vitals', {
    //     method: 'POST',
    //     body: JSON.stringify({ name: metric.name, value: metric.value, rating, url: window.location.href }),
    //     headers: { 'Content-Type': 'application/json' },
    //   });
    // }
  });

  return null;
}
