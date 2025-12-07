/**
 * HTTP Utilities
 */

export function extractSearchParams(url: URL): Record<string, string | string[]> {
  const params: Record<string, string | string[]> = {};

  url.searchParams.forEach((value, key) => {
    if (params[key]) {
      params[key] = Array.isArray(params[key])
        ? [...(params[key] as string[]), value]
        : [params[key] as string, value];
    } else {
      params[key] = value;
    }
  });

  return params;
}
