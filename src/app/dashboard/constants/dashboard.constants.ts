// Dashboard constants
export const DEFAULT_ORGANIZATION = 'All Organization';
export const DEFAULT_DATE_RANGE = 'Last 6 months (6 May 2025 - 6 Nov 2025)';

export const ORGANIZATIONS = [
  'All Organization',
  'Organization A',
  'Organization B',
  'Organization C'
];

export const DATE_RANGES = [
  'Last 6 months (6 May 2025 - 6 Nov 2025)',
  'Last 3 months (6 Aug 2025 - 6 Nov 2025)',
  'Last 12 months (6 Nov 2024 - 6 Nov 2025)',
  'This year (1 Jan 2025 - 6 Nov 2025)'
];

// Organization filter multipliers
export const ORGANIZATION_MULTIPLIERS: Record<string, number> = {
  'Organization A': 0.6,
  'Organization B': 0.75,
  'Organization C': 0.9
};

export const ORGANIZATION_STACKED_MULTIPLIERS: Record<string, number> = {
  'Organization A': 0.5,
  'Organization B': 0.65,
  'Organization C': 0.8
};

export const ORGANIZATION_DONUT_MULTIPLIERS: Record<string, number> = {
  'Organization A': 0.35,
  'Organization B': 0.55,
  'Organization C': 0.75
};

