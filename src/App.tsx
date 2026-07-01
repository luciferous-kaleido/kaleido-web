import { useState } from "react";

function App() {
  const [json, setJson] = useState<string | null>(null);

  async function getHealth() {
    const resp = await fetch("/api/health");
    const body = await resp.json();
    setJson(JSON.stringify(body));
  }

  return (
    <>
      <h1>Test2</h1>
      <p>
        <img alt="" src="https://img.kaleido.luciferous.app/image.jpg" />
      </p>
      <p>
        <button type="button" onClick={() => setJson(null)}>
          clear
        </button>
      </p>
      <p>
        <button type="button" onClick={getHealth}>
          call
        </button>
      </p>
      <hr />
      <p>{json}</p>
    </>
  );
}

export default App;
