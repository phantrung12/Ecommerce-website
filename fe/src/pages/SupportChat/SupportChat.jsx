import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import Layout from "../../components/Layout/Layout";
import axiosIntance from "../../helpers/axios";
import Message from "./Message/Message";
import "./SupportChat.css";
import { io } from "socket.io-client";
import Conversation from "./Conversation/Conversation";

const SupportChat = () => {
  const auth = useSelector((state) => state.auth);
  const [conversations, setConversations] = useState([]);
  const [conversationsId, setConversationsId] = useState("");
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", auth.user._id);
    socket.current.on("getUsers", (users) => {
      // console.log(users);
    });
  }, [auth.user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axiosIntance.get(`/conversations/${auth.user._id}`);
        setConversations(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getConversations();
  }, [auth.user._id]);

  useEffect(() => {
    const getMessage = async () => {
      try {
        const res = await axiosIntance.get(`/message/${currentChat?._id}`);
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessage();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: auth.user._id,
      text: newMessage,
      conversationId: conversationsId,
    };

    const receiverId = currentChat?.members.find(
      (member) => member !== auth.user._id
    );

    socket.current.emit("sendMessage", {
      senderId: auth.user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axiosIntance.post("/message/add", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      <Layout>
        <div className="messenger">
          <div className="chatMenu">
            <div className="chatMenuWrapper">
              <input
                placeholder="Tìm kiếm người dùng"
                className="chatMenuInput"
              />
              {conversations.map((c) => (
                <div onClick={() => setCurrentChat(c)}>
                  <Conversation conversation={c} currentUser={auth.user} />
                </div>
              ))}
            </div>
          </div>
          <div className="chatBox">
            <div className="chatBoxWrapper">
              {currentChat ? (
                <>
                  <div className="chatBoxTop">
                    {messages.map((m) => (
                      <div ref={scrollRef}>
                        <Message
                          message={m}
                          own={m.sender === auth.user._id}
                          key={m._id}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="chatBoxBottom">
                    <textarea
                      className="chatMessageInput"
                      placeholder="write something..."
                      onChange={(e) => setNewMessage(e.target.value)}
                      value={newMessage}
                    ></textarea>
                    <button className="chatSubmitButton" onClick={handleSubmit}>
                      Gửi
                    </button>
                  </div>
                </>
              ) : (
                <span className="noConversationText">
                  Open a conversation to start a chat.
                </span>
              )}
            </div>
          </div>
          <div className="chatOnline">
            <div className="chatOnlineWrapper">Đang phát triển thêm...</div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default SupportChat;
