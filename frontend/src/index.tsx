import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";
import { RecoilRoot, useRecoilSnapshot } from "recoil";
import { createUploadLink } from "apollo-upload-client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setContext } from "@apollo/client/link/context";
import adapter from "webrtc-adapter";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "react-query";

axios.defaults.baseURL = "https://69aa-154-178-131-231.eu.ngrok.io";
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;

const httpLink = createUploadLink({
  uri: "https://69aa-154-178-131-231.eu.ngrok.io/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <App />
            <ToastContainer />
          </BrowserRouter>
        </ApolloProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
