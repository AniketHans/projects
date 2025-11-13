import { useEffect, useRef, useState } from "react";
import Client from "../components/Client";
import Editor from "../components/Editor";
import { initSocket } from "../socket";
import { ACTIONS } from "../actions";
import {
  useLocation,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";
import toast from "react-hot-toast";

function EditorPage() {
  // When we want something to be us on multiple renders and the component does not rerendered on change of its value, we use
  // useRef
  const socketRef = useRef(null);
  const location = useLocation(); // to get the variables get from navigate(), we set a `state` object in Home.jsx
  const navigate = useNavigate();
  const params = useParams(); // to get params from the url, to fetch roomId from the URL
  const [clients, setClientsList] = useState([]);
  if (!location.state) {
    return <Navigate to="/" />;
  }
  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      // we need to emit join event to the server
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      function handleErrors(err) {
        console.log(err);
        toast.error("Socket Connection failed, try again later");
        navigate("/");
      }
      socketRef.current.emit(ACTIONS.JOIN, {
        roomId: params.roomId,
        username: location.state?.username,
      });

      //Listening for joined event from server
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clientList, username, socketId }) => {
          if (username != location.state.username) {
            toast.success(`${username} has joined the room`);
          }
          setClientsList(clientList);
        }
      );
    };
    init();
  }, []);

  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <img className="logoImage" src="/code-logo.png" alt="logo"></img>
          </div>
          <h3>Connected</h3>
          <div className="clientsList">
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>
        <button className="btn copyBtn">Copy Room ID</button>
        <button className="btn leaveBtn ">Leave</button>
      </div>
      <div className="editorWrap">
        <Editor />
      </div>
    </div>
  );
}

export default EditorPage;
