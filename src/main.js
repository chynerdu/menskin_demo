import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import VueApollo from "vue-apollo";
import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(fas);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

// create httpLink
const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: "https://pangaea-interviews.now.sh/api/graphql",
});

// Instantiate apolloClient by passing httpLink
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

// Here you install the vue plugin
Vue.use(VueApollo);

// create a new apollo client instance
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: "loading",
  },
});

new Vue({
  provide: apolloProvider.provide(),
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
