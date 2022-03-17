import React, { useContext, useEffect } from "react";
import styled from "@emotion/styled";

import List from "../components/chat/List";
import Messages from "../components/chat/Messages";
import { ChatContext } from '../context/chat';

const Wrapper = styled.div`
  display: flex;
  height: calc(100% - 85px);
  min-height: 400px;
  padding: 1rem;
`;

const ArchivedChats = () => {
  const { getArchivedChats } = useContext(ChatContext)

  useEffect(() => {
    getArchivedChats()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Wrapper>
      <List />
      <Messages onlyMessages queueMessages />
    </Wrapper>
  );
};

export default ArchivedChats;
