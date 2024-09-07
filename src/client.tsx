import { createRoot } from "react-dom/client";
import { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "tailwindcss/tailwind.css";

function App() {
  return (
    <>
      <Typography variant="h1">Hello, Hono with React!</Typography>
      <Typography variant="h2">Example of useState()</Typography>
      <Counter />
      <Typography variant="h2">Example of API fetch()</Typography>
      <ClockButton />
    </>
  );
}

const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <Button variant="contained" onClick={() => setCount(count + 1)}>
      You clicked me {count} times
    </Button>
  );
};

const ClockButton = () => {
  const [response, setResponse] = useState<string | null>(null);

  const handleClick = async () => {
    const response = await fetch("/api/clock");
    const data = await response.json();
    const headers = Array.from(response.headers.entries()).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value }),
      {}
    );
    const fullResponse = {
      url: response.url,
      status: response.status,
      headers,
      body: data,
    };
    setResponse(JSON.stringify(fullResponse, null, 2));
  };

  return (
    <Box>
      <Button variant="contained" onClick={handleClick}>
        Get Server Time
      </Button>
      {response && <pre>{response}</pre>}
    </Box>
  );
};

const domNode = document.getElementById("root")!;
const root = createRoot(domNode);
root.render(<App />);
