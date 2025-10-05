import { useState } from "react";

export default function App() {
  const [selected, setSelected] = useState("number");
  const [data, setData] = useState("");
  const [radioActive, setRadioActive] = useState(false);
  async function getData() {
    setRadioActive(true);
    const response = await fetch(
      `http://localhost:4059/numbers-and-alpha?valtype=${selected}`
    );
    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let done = false;
    while (!done) {
      const { value, done: streamDone } = await reader.read();
      done = streamDone;
      if (value) {
        const chunk = decoder.decode(value, { stream: true });
        setData((prev) => prev + "\n" + chunk);
      }
    }
    setRadioActive(false);
  }
  return (
    <div>
      <label>
        <input
          type="radio"
          value="number"
          checked={selected == "number"}
          onChange={(e) => setSelected(e.target.value)}
          disabled={radioActive}
        />
        Number
      </label>
      <br />
      <label>
        <input
          type="radio"
          value="alphabet"
          checked={selected == "alphabet"}
          onChange={(e) => setSelected(e.target.value)}
          disabled={radioActive}
        />
        Alphabet
      </label>
      <br />
      <button onClick={getData}>Get data</button>
      <p>
        {data}
        <br />
      </p>
    </div>
  );
}
