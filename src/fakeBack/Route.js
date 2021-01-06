import { matchPath } from "react-router";

export class Route {
  constructor(method, url, responder) {
    this.method = method;
    this.url = url;
    this.responder = responder;
  }

  matchesByMethod(method) {
    return new RegExp(`${this.method}`, "i").test(method);
  }

  matchesByEndpoint(requestUrl) {
    return matchPath(requestUrl, {
      path: this.url,
      exact: true,
    });
  }

  isMatches({ method, url }) {
    return this.matchesByEndpoint(url) && this.matchesByMethod(method);
  }

  respond = async (request) => {
    const { data, urlParams: params } = request;

    return await this.responder(params, data);
  };
}
