export class Router {
  constructor(routes) {
    this.routes = routes;
  }

  proceedRequest = async (request) => {
    const { method, url } = request;

    const matchedRoute = this.routes.find((route) => route.isMatches({ method, url }));

    if (matchedRoute) {
      return await matchedRoute.respond(request);
    } else {
      console.error(`No matched routes found by request info`);
      console.dir(request);

      return [404, "No matched route found, see console for more details"];
    }
  };
}
