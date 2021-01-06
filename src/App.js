import { Route, Switch } from "react-router";

import routes from "routes";

import DefaultLayout from "components/layout";

import "antd/dist/antd.css";

const App = () => {
  return (
    <DefaultLayout>
      <Switch>
        {routes.map(({ path, component }) => (
          <Route key={path} path={path} component={component} />
        ))}
      </Switch>
    </DefaultLayout>
  );
};

export default App;
