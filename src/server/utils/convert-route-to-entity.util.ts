const mapping: Record<string, string> = {
  'daily-reflections': 'daily_reflection',
  'money-saveds': 'money_saved',
  organizations: 'organization',
  'sober-day-counters': 'sober_day_counter',
  'sober-meetings': 'sober_meeting',
  sos: 'sos',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
