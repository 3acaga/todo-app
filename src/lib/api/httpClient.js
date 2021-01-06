import axios from "axios";
import AxiosMock from "axios-mock-adapter";
import qs from "qs";

const HttpClient = axios.create({
  baseURL: "/",
  paramsSerializer: (params) =>
    qs.stringify(params, {
      encode: false,
      arrayFormat: "brackets",
    }),
});

const Router = require("../../fakeBack").default; // this will not go to the bundle
const mock = new AxiosMock(HttpClient, {
  delayResponse: process.env.NODE_ENV === "test" ? 0 : 500,
});

mock.onAny(/.*/).reply(async (config) => {
  // this will pass to your fakeBack router, you can put here anything you want
  return await Router.proceedRequest(config);
});

export { HttpClient };
