import { merge } from "lodash";

import { HttpClient } from "./httpClient";

export const api = (method, url, predefinedParams) => {
  return (payload = {}) => {
    const { params } = payload;

    return HttpClient({
      method,
      url: typeof url === "function" ? url(params) : url,
      ...merge({}, predefinedParams, { ...payload, urlParams: params }),
    });
  };
};

export function makeUrl(strings, ...paramNames) {
  return (params) => {
    return paramNames.reduceRight(
      (acc, paramName, i) => `${strings[i]}${params[paramName]}${acc}`,
      strings[strings.length - 1],
    );
  };
}
