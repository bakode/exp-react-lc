import React from "react";
import { 
  Message,
  SystemMessage, 
  FilledForm, 
  CustomMessage,
  OrderMessage,
  ProductMessage,
  VoiceMessage,
  ImageMessage
} from '../event'


const canParseJsonData = (str) => {
  try {
      JSON.parse(str);
      return true;
  } catch (e) { return false; }
}

const ChatMessage = ({ users, message }) => {
  const getChatUser = authorId => users.find(({ id }) => id === authorId) || { type: "customer" };

  switch (message?.type) {
    case "message":
    case "custom": 
      const user = getChatUser(message.author_id);

      if (message.type === 'custom') {
        if (message.content.type === 'order') {
          return <OrderMessage key={message.id} message={message} user={user} />
        }

        if (message.content.type === 'product') {
          return <ProductMessage key={message.id} message={message} user={user} />
        }

        if (message.content.type === 'voice') {
          return <VoiceMessage key={message.id} message={message} user={user} />
        }
          
        if (message.content.type === 'image') {
          return <ImageMessage key={message.id} message={message} user={user} />
        }

        if (message.content.type === 'rx') {
          return <div>
            <p>{user?.name}</p>
            <a href={message.content.data.rxURL} target="_blank" rel="noreferrer">Click to Preview RX</a>
          </div>
        }

        return <div>{JSON.stringify(message.id)}</div>;
      }

      if (!canParseJsonData(message?.text)) {
        return (
          <Message key={message.id} message={message} user={user} />
        );
      }

      return (
        <CustomMessage key={message.id} message={message} user={user} />
      );

    case "system_message":
      return <SystemMessage key={message.id} message={message} />;

    case "filled_form":
      return <FilledForm key={message.id} message={message} />;

    default:
      return null;
  }
}

export default ChatMessage;
