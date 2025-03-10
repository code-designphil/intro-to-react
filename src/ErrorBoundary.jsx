import { Link } from "@tanstack/react-router";
import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong!</h2>
          <p>There was an error with this page.</p>
          <Link to="/">Go to Homepage</Link>
        </div>
      );
    }
    return this.props.children;
  }
}
