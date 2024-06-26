import React from 'react';
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
import { useSelector } from 'react-redux';

const Chat = () => {
  const auth = useSelector(state => state.auth);
  const { userDetails } = auth;
  const avatar = userDetails.image
    ? userDetails.image
    : '/images/avatars/avatar_11.png';
  return (
    <div style={{ position: 'relative', height: '500px' }}>
      <MainContainer>
        <ConversationList
          style={{
            height: '500px'
          }}>
          <Conversation
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
          </Conversation>
        </ConversationList>
        <ChatContainer>
          <ConversationHeader>
            {/* <ConversationHeader.Back /> */}
            <Avatar
              name="Emily"
              src="https://chatscope.io/storybook/react/assets/emily-xzL8sDL2.svg"
            />
            <ConversationHeader.Content
              info="Active 10 mins ago"
              userName="Emily"
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
          <MessageInput attachButton={false} placeholder="Type message here" />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default Chat;
