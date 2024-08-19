import React, { useEffect, useState } from "react";
import { BsEmojiSmile, BsFolder2Open, BsUpload } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import Message from "./ChatBox/Mesaage";
import ChatHeader from "./ChatBox/ChatHeader";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/white-logo.png";
import { toast, ToastContainer } from "react-toastify";
import ScrollableFeed from "react-scrollable-feed";
import {
  sendMessage,
  setWebSocketReceivedMessage,
} from "../../redux/appReducer/action";
import axios from "axios";

export default function ChatBox() {
  const selectedUserForChat = useSelector(
    (state) => state.appReducer.selectedUserForChat
  );
  const sendMessageSuccess = useSelector(
    (state) => state.appReducer.sendMessageSuccess
  );
  const sendMessageFail = useSelector(
    (state) => state.appReducer.sendMessageFail
  );
  const sendMessageObj = useSelector(
    (state) => state.appReducer.sendMessageObj
  );
  const sendMessageProcessing = useSelector(
    (state) => state.appReducer.sendMessageProcessing
  );

  const notficationsMessages = useSelector(
    (state) => state.appReducer.notficationsMessages
  );
  const getMessageProcessing = useSelector(
    (state) => state.appReducer.getMessageProcessing
  );
  const getMessageData = useSelector(
    (state) => state.appReducer.getMessageData
  );
  const webSocket = useSelector((state) => state.appReducer.webSocket);

  const [userInput, setUserInput] = useState("");
  const [fileInput, setFileInput] = useState(null);
  const [inputFocused, setInputFocused] = useState(false);

  const [showEmoji, setShowEmoji] = useState(false);
  const [openConfirmFileUpload, setOpenConfirmFileUpload] = useState(false);

  const dispatch = useDispatch();

  const jwtToken = () => {
    const userData = JSON.parse(
      localStorage.getItem("chat-app-login-user-data")
    );
    return "Bearer " + String(userData.token);
  };

  const handleFileInput = () => {
    // let fileData = new FormData();
    // fileData.append("file", file);
    // setFileInput(file);
    setOpenConfirmFileUpload(true);
  };

  const shareFile = async () => {
    setOpenConfirmFileUpload(false);
    let formData = new FormData();
    formData.append("file", fileInput);
    const res = await axios.post(
      `${process.env.REACT_APP_END_POINT}/api/chat/fileUpload`,
      formData,
      {
        headers: {
          Authorization: jwtToken(),
        },
      }
    );
    // setUserInput(`${process.env.REACT_APP_END_POINT}/${res.data.path}`);
    // handleSendMessage();
    handleSendMessage(`${process.env.REACT_APP_END_POINT}/${res.data.path}`);
  };

  const handleSendMessage = (filePath) => {
    let obj = {
      content: "",
      chatId: selectedUserForChat._id,
    };
    if (filePath) {
      obj.content = filePath;
      dispatch(sendMessage(obj));
    } else {
      obj.content = userInput.trim();

      if (!obj.content) {
        toast.warn("Write something to send", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      } else if (
        // check phone number
        obj.content
          .replaceAll(/[ ,._]/g, "")
          .replaceAll(/-/g, "")
          .search(/\b\d{7,11}\b/) != -1
      ) {
        toast.warn("Please do not include phone numbers.", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      } else {
        dispatch(sendMessage(obj));
      }
    }
  };

  useEffect(() => {
    return () => {
      webSocket.off("message received");
    };
  }, [webSocket]);

  useEffect(() => {
    if (!sendMessageProcessing && !sendMessageFail && sendMessageSuccess) {
      setUserInput("");
      webSocket.emit("new message", sendMessageObj);
      dispatch(
        setWebSocketReceivedMessage(
          getMessageData,
          sendMessageObj,
          notficationsMessages,
          selectedUserForChat
        )
      );
    }

    if (!sendMessageProcessing && sendMessageFail && !sendMessageSuccess) {
      toast.error("Message not sent. Try again.", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  }, [sendMessageSuccess, sendMessageFail, sendMessageProcessing]);

  useEffect(() => {
    const handleNewMessageReceived = (newMessageRec) => {
      dispatch(
        setWebSocketReceivedMessage(
          getMessageData,
          newMessageRec,
          notficationsMessages,
          selectedUserForChat
        )
      );
    };

    webSocket.on("message received", handleNewMessageReceived);

    return () => {
      webSocket.off("message received", handleNewMessageReceived);
    };
  }, [webSocket, selectedUserForChat, getMessageData]);

  if (!selectedUserForChat) {
    return (
      <div className="flex flex-col h-4/5 mt-8 bg-primary-600 rounded-lg px-4 py-2 pb-4">
        <div className="flex flex-col items-center justify-center h-full">
          <img className="w-20 h-20 mr-2" src={logo} alt="logo" />
          <p className="text-white">Enjoy Your Chat!</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {openConfirmFileUpload && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 backdrop-filter backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow p-6 max-w-md w-full">
            <div className="text-left">
              <h3 className="mb-5 text-lg font-normal">
                Wanna share{" "}
                <span className="underline">
                  {!!fileInput && fileInput.name}
                </span>
                ?
              </h3>
              <div className="float-right">
                {/* cancel button */}
                <button
                  // onClick={toggleModal}
                  type="button"
                  className="text-gray-800 mr-3  bg-white hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-800 text-sm font-medium px-5 py-2.5  focus:z-10 "
                  onClick={() => {
                    setFileInput(null);
                    setOpenConfirmFileUpload(false);
                  }}
                >
                  Cancel
                </button>

                {/* create button */}
                <button
                  // onClick={handelCreateGroup}
                  type="button"
                  className="text-white mt-5 bg-primary-700 hover:bg-primary-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                  onClick={shareFile}
                >
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ChatHeader />
      <div className="flex flex-col h-4/5 bg-primary-800 rounded-bl-lg rounded-br-lg px-4 py-2 pb-4">
        <div className="flex h-full flex-col max-h-[75vh] overflow-y-auto bg-primary-400  rounded-lg mb-2">
          {getMessageProcessing && (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
              <span className="mr-2 text-white">Loading Messages</span>
            </div>
          )}
          <ScrollableFeed>
            {Array.isArray(getMessageData) && getMessageData.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <img className="w-20 h-20 mr-2" src={logo} alt="logo" />
                <p className="text-white">Start Chating!</p>
              </div>
            ) : (
              Array.isArray(getMessageData) &&
              getMessageData.map((item) => (
                <Message item={item} key={item.id} />
              ))
            )}
          </ScrollableFeed>
        </div>

        <div className="relative mt-2">
          <input
            disabled={sendMessageProcessing}
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
            onFocus={() => {
              setInputFocused(true);
            }}
            type="text"
            className="border border-gray-300 bg-primary-50 text-primary-900 font-semibold sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 "
            placeholder="Type your message..."
          />
          <button
            type="button"
            className="absolute inset-y-0 right-28 px-0 py-2.7 text-primary-800 focus:outline-none"
          >
            <BsUpload
              className="w-5 h-5"
              onClick={() => document.getElementById("fileUploadInput").click()}
            />
            <input
              type="file"
              id="fileUploadInput"
              className="hidden"
              onChange={(e) => {
                setFileInput(e.target.files[0]);
                handleFileInput();
              }}
            />
          </button>
          <button
            type="button"
            className="absolute inset-y-0 right-20 px-0 py-2.7 text-primary-800 focus:outline-none"
          >
            <div>
              <div
                className="z-10 fixed bottom-24 right-4"
                onMouseLeave={() => setShowEmoji(false)}
              >
                <EmojiPicker
                  open={showEmoji}
                  onEmojiClick={(emoji) => {
                    setUserInput(userInput + emoji.emoji);
                  }}
                />
              </div>
              <BsEmojiSmile
                className="w-5 h-5"
                onClick={() => setShowEmoji(true)}
              />
            </div>
          </button>
          <button
            disabled={sendMessageProcessing}
            type="button"
            className="absolute inset-y-0  right-1 top-1 bottom-1 px-2.5 py-1 rounded-lg hover:bg-primary-700 bg-primary-800 text-primary-100 focus:outline-none"
            onClick={() => handleSendMessage(null)}
          >
            {sendMessageProcessing ? (
              <div className="flex items-center justify-center">
                <span className="mr-2">Sending</span>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              </div>
            ) : (
              "Send"
            )}
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
