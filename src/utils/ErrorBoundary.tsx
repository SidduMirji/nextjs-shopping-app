import { Component, ReactNode } from "react";
import { NextPage } from "next";
import { Box, Typography } from "@mui/material";

type Props = {
    children?: ReactNode;
};

type State = { hasError: boolean };

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // Log the error to an error reporting service
    console.error(error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <Box sx={{ p: 2 }}>
          <Typography variant="h5" gutterBottom>
            Something went wrong...
          </Typography>
          <Typography variant="body1">
            Please try again later or contact support.
          </Typography>
        </Box>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
