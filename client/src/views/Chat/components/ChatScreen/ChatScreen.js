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
  ConversationHeader
} from '@chatscope/chat-ui-kit-react';
import { useSelector, useStore } from 'react-redux';
import { sendMessageAPI } from '../../../../api/chat';

const ChatScreen = () => {
  const auth = useSelector(state => state.auth);
  // console.log(auth);
  const [message, setMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState({});
  const { userDetails, userList } = auth;
  const avatar = userDetails.image
    ? userDetails.image
    : '/images/avatars/avatar_11.png';

  const handleMsg = value => {
    // console.log(value);
    setMessage(value);
  };

  const handleSend = () => {
    console.log(message);
    // const resp = sendMessageAPI({
    //   userId: tokenDetails.userId
    // });
    // resp.then(res => {
    //   if (res.err) {
    //     alert(res.msg);
    //   } else {
    //     dispatch(
    //       setDetails({
    //         type: 'userDetails',
    //         value: res.data[0]
    //       })
    //     );
    //     // console.log(auth);
    //   }
    // });
  };

  const handleChat = user => {
    console.log(user);
    setSelectedChat(user);
  };

  useEffect(() => {
    if (userList.length > 0) {
      setSelectedChat(userList[0]);
    }
  }, [userList]);

  return (
    <div style={{ position: 'relative', height: '90vh' }}>
      <MainContainer>
        <ConversationList>
          {userList.length > 0 &&
            userList.map((user, index) => {
              return (
                <Conversation
                  info="Yes i can do it for you"
                  key={index}
                  lastSenderName="Lilly"
                  name={user.username}
                  onClick={() => handleChat(user)}>
                  <Avatar
                    name={user.username}
                    src="https://chatscope.io/storybook/react/assets/lilly-aj6lnGPk.svg"
                  />
                  {/* <Conversation.Operations onClick={() => handleChat(user)} /> */}
                </Conversation>
              );
            })}
          {/* <Conversation
            info="Yes i can do it for you"
            lastSenderName="Lilly"
            name="Lilly">
            <Avatar
              name="Lilly"
              src="https://chatscope.io/storybook/react/assets/lilly-aj6lnGPk.svg"
            />
          </Conversation>
          <Conversation
            info="Yes i can do it for you"
            lastSenderName="Joe"
            name="Joe">
            <Avatar
              name="Joe"
              src="https://chatscope.io/storybook/react/assets/joe-v8Vy3KOS.svg"
            />
          </Conversation>
          <Conversation
            info="Yes i can do it for you"
            lastSenderName="Emily"
            name="Emily">
            <Avatar
              name="Emily"
              src="https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg"
            />
          </Conversation>
          <Conversation
            info="Yes i can do it for you"
            lastSenderName="Kai"
            name="Kai">
            <Avatar
              name="Kai"
              src="https://chatscope.io/storybook/react/assets/kai-5wHRJGb2.svg"
            />
          </Conversation>
          <Conversation
            info="Yes i can do it for you"
            lastSenderName="Akane"
            name="Akane">
            <Avatar
              name="Akane"
              src="https://chatscope.io/storybook/react/assets/akane-MXhWvx63.svg"
            />
          </Conversation>
          <Conversation
            info="Yes i can do it for you"
            lastSenderName="Eliot"
            name="Eliot">
            <Avatar
              name="Eliot"
              src="https://chatscope.io/storybook/react/assets/eliot-JNkqSAth.svg"
            />
          </Conversation>
          <Conversation
            info="Yes i can do it for you"
            lastSenderName="Zoe"
            name="Zoe">
            <Avatar
              name="Zoe"
              src="https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg"
            />
          </Conversation>
          <Conversation
            info="Yes i can do it for you"
            lastSenderName="Patrik"
            name="Patrik">
            <Avatar
              name="Patrik"
              src="https://chatscope.io/storybook/react/assets/patrik-yC7svbAR.svg"
            />
          </Conversation> */}
        </ConversationList>
        <ChatContainer>
          <ConversationHeader>
            {/* <ConversationHeader.Back /> */}
            <Avatar
              name={selectedChat.username}
              src="https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg"
            />
            <ConversationHeader.Content
              info="Active 10 mins ago"
              userName={selectedChat.username}
            />
            <ConversationHeader.Actions>
              <StarButton title="Add to favourites" />
              <InfoButton title="Show info" />
            </ConversationHeader.Actions>
          </ConversationHeader>
          <MessageList>
            <Message
              model={{
                message: 'Hello my friend',
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
            </Message>
          </MessageList>
          <MessageInput
            attachButton={false}
            onChange={handleMsg}
            onSend={handleSend}
            placeholder="Type message here"
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default ChatScreen;
