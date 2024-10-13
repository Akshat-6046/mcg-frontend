"use client";
import AppComponent from "@/Components/AppComponent";
import withAuth from "@/hocs/withRouteAuth";
import { Chess } from "chess.js";
import React from "react";

const App = (): React.ReactElement => {
  return <AppComponent />;
};

export default withAuth(App);
