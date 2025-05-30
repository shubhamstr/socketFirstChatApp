/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  Avatar,
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationList,
  Conversation,
  StarButton,
  InfoButton,
  SendButton,
  ArrowButton,
  ConversationHeader
} from '@chatscope/chat-ui-kit-react';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { sendMessageAPI, getAllChatAPI } from '../../../api/chat';
import { logOut } from '../../../store/authSlice';
import { BASE_URL, CLIENT_URL } from '../../../constants';

const ChatScreen = () => {
  const url = window.location.pathname.split('/')[2];
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const socket = io(BASE_URL, { transports: ['websocket'] });
  // console.log(auth);
  const [message, setMessage] = useState('');
  const [chatList, setChatList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userDetails, userList } = auth;
  const avatar = userDetails.image
    ? userDetails.image
    : '/images/avatars/avatar_11.png';

  const handleMsg = value => {
    // console.log(value);
    setMessage(value);
  };

  const handleSend = () => {
    // console.log(userDetails.id, message);
    const resp = sendMessageAPI({
      user_id: userDetails.id,
      room_id: url,
      message: message
    });
    socket.emit('message', message);
    // console.log(resp);
    resp.then(res => {
      if (res.err) {
        alert(res.msg);
      } else {
        // console.log(auth);
        loadChat();
      }
    });
  };

  // const handleChat = user => {
  //   console.log(user);
  //   setSelectedChat(user);
  //   setChatList([]);
  // };

  const handleLogOut = () => {
    console.log('handleLogOut');
    localStorage.removeItem('chatToken');
    dispatch(logOut());
  };

  const loadChat = () => {
    setLoading(true);
    console.log('loadChat', url);
    const resp = getAllChatAPI({
      room_id: url
    });
    // console.log(resp);
    resp.then(res => {
      if (res.err) {
        alert(res.msg);
      } else {
        setChatList(res.data);
        // console.log(auth);
        setLoading(false);
      }
    });
  };

  socket.on('message', msg => {
    console.log('socket message', msg);
    if (url) {
      loadChat();
    }
  });

  useEffect(() => {
    if (url) {
      loadChat();
    }
  }, [userDetails]);

  return (
    <div style={{ position: 'relative', height: '90vh' }}>
      <MainContainer>
        {/* <ConversationList>
          <ConversationHeader onClick={() => handleLogOut()}>
            <Avatar
              name={userDetails.username}
              src="https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg"
            />
            <ConversationHeader.Content userName={userDetails.username} />
            <ConversationHeader.Actions>
              <ArrowButton
                border
                direction="right"
                style={{ padding: '0px 10px' }}
                title="Log Out"
              />
            </ConversationHeader.Actions>
          </ConversationHeader>
          {userList.length > 0 &&
            userList.map((user, index) => {
              return (
                <Conversation
                  info="Yes i can do it for you"
                  key={index}
                  name={user.username}
                  onClick={() => handleChat(user)}>
                  <Avatar
                    name={user.username}
                    src="https://chatscope.io/storybook/react/assets/lilly-aj6lnGPk.svg"
                  />
                  <Conversation.Operations onClick={() => handleChat(user)} />
                </Conversation>
              );
            })}
        </ConversationList> */}

        {!loading && (
          <ChatContainer>
            <ConversationHeader>
              {/* <ConversationHeader.Back /> */}
              <Avatar
                name={userDetails.username}
                src="https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg"
              />
              <ConversationHeader.Content
                // info="Active 10 mins ago"
                userName={`Room ID - (${url})`}
              />
              <ConversationHeader.Actions>
                {/* <StarButton title="Add to favourites" />
              <InfoButton title="Show info" /> */}
                <SendButton
                  border
                  onClick={() => {
                    // Create a ClipboardItem and write to clipboard
                    navigator.clipboard.writeText(`${CLIENT_URL}/login/${url}`);
                    console.log('Chat URL copied to clipboard!');
                    alert('Chat URL copied to clipboard!');
                  }}
                  style={{ padding: '0px 10px' }}
                  title="Share Chat"
                />
                <ArrowButton
                  border
                  direction="right"
                  onClick={() => handleLogOut()}
                  style={{ padding: '0px 10px' }}
                  title="Log Out"
                />
              </ConversationHeader.Actions>
            </ConversationHeader>
            <MessageList>
              {chatList.length > 0 &&
                chatList.map((chat, index) => {
                  console.log(chat);
                  console.log(userDetails.id);
                  const dir =
                    userDetails.id === parseInt(chat.user_id)
                      ? 'outgoing'
                      : 'incoming';
                  return (
                    <Message
                      key={index}
                      model={{
                        message: chat.message,
                        sentTime: 'just now',
                        sender: 'Joe',
                        direction: dir
                      }}>
                      <Avatar src="https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg" />
                    </Message>
                  );
                })}
              {/* <Message
              model={{
                message: 'Hello my friend1',
                sentTime: 'just now',
                sender: 'Joe',
                direction: 'outgoing'
              }}>
              <Avatar src={avatar} />
            </Message>
            <Message
              model={{
                message: 'Hello my friend',
                sentTime: 'just now',
                sender: 'Joe',
                direction: 'incoming'
              }}>
              <Avatar src={avatar} />
            </Message> */}
            </MessageList>
            <MessageInput
              attachButton={false}
              onChange={handleMsg}
              onSend={handleSend}
              placeholder="Type message here"
            />
          </ChatContainer>
        )}
        {loading && (
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <div className="text-center">Chat is loading..</div>
          </div>
        )}
      </MainContainer>
    </div>
  );
};

export default ChatScreen;
