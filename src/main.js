import * as singleSpa from "single-spa";

// singleSpa.registerApplication(
//   "app-root",
//   () => import("./app-root/index.js"),
//   pathPrefix("/")
// );

singleSpa.registerApplication(
  "app-1",
  () => import("./app-react-dva/index.js"),
  pathPrefix("/app1")
);
singleSpa.registerApplication(
  "app-2",
  () => import("./app-angular/index.js"),
  pathPrefix("/app2")
);
singleSpa.registerApplication(
  "app-3",
  () => import("./app-vue/index.js"),
  pathPrefix("/app3")
);

singleSpa.start();

function pathPrefix(prefix) {
  return function(location) {
    return location.pathname.startsWith(`${prefix}`);
  };
}
