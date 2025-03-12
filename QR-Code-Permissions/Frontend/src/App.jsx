import { useState } from "react";
import "./App.css";

function App() {
  const [inputJson, setInputJson] = useState("");
  const [qrImage, setQrImage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3004/api/generate-qr-code",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: inputJson,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setQrImage(data.message);
      } else {
        console.log("Error fetching image");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <form onSubmit={(e) => submitHandler(e)}>
        <div>
          <label style={{ padding: "5px" }}>Input JSON:</label>
          <input
            placeholder="Enter the request JSON"
            onChange={(e) => {
              setInputJson(e.target.value);
            }}
          />
        </div>
        <br />
        <button type="submit">Create QR Code</button>
      </form>
      <div style={{ padding: "10px" }}>
        <img src={qrImage} />
      </div>
    </>
  );
}

export default App;
