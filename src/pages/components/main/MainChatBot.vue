<template>
  <div>
    <beautiful-chat
      :participants="participants"
      :titleImageUrl="titleImageUrl"
      :onMessageWasSent="onMessageWasSent"
      :messageList="messageList"
      :newMessagesCount="newMessagesCount"
      :isOpen="isChatOpen"
      :close="closeChat"
      :open="openChat"
      :showEmoji="true"
      :showFile="false"
      :showTypingIndicator="showTypingIndicator"
      :colors="colors"
      :alwaysScrollToBottom="alwaysScrollToBottom"
      :messageStyling="messageStyling"
    />
  </div>
</template>

<script>
var Stomp = require("stompjs");

export default {
  data() {
    return {
      cmpText: "",
      stompClient: null,
      participants: [
        {
          id: "user1",
          name: "Support",
          imageUrl: require("@/assets/images/QnA.png"),
        },
        {
          id: "user2",
          name: "me",
          // imageUrl: "https://avatars3.githubusercontent.com/u/37018832?s=200&v=4",
        },
      ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
      titleImageUrl: require("@/assets/images/ChatLogo.png"),
      messageList: [{ type: "text", author: `user1`, data: { text: `무엇을 도와드릴까요?` } }], // the list of the messages to show, can be paginated and adjusted dynamically
      newMessagesCount: 0,
      isChatOpen: false, // to determine whether the chat window should be open or closed
      showTypingIndicator: "", // when set to a value matching the participant.id it shows the typing indicator for the specific user
      colors: {
        header: {
          bg: "#3a3a3c", //#7c76f8   4e8cff 3a3a3c
          text: "#ffffff",
        },
        launcher: {
          bg: "#505253", //7d27ee 4e8cff 505253
        },
        messageList: {
          bg: "#ffffff",
        },
        sentMessage: {
          bg: "#323032", //7776f7 4e8cff 323032
          text: "#ffffff",
        },
        receivedMessage: {
          bg: "#eaeaea", //"#eaeaea"
          text: "#222222",
        },
        userInput: {
          bg: "#f4f7f9", //"#f4f7f9",
          text: "#565867",
        },
      }, // specifies the color scheme for the component
      alwaysScrollToBottom: false, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
      messageStyling: true, // enables *bold* /emph/ _underline_ and such (more info at github.com/mattmezza/msgdown)
    };
  },
  created() {},
  methods: {
    sendMessage(text) {
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1;
        this.onMessageWasSent({ author: "support", type: "text", data: { text } });
      }
    },
    onMessageWasSent(message) {
      // called when the user sends a message
      this.messageList = [...this.messageList, message]; // { type: "text", author: `user1`, data: { text: `No.` }
      // this.messageList = [
      //   ...this.messageList,
      //   { type: "text", author: `user1`, data: { text: `No.` } },
      // ]; //
      // console.log(message);
      this.cmpText = message.data.text;
      this.stompClient.send("/app/hello", {}, message.data.text);
    },
    openChat() {
      // called when the user clicks on the fab button to open the chat
      this.isChatOpen = true;
      this.newMessagesCount = 0;
      this.connect();
    },
    closeChat() {
      // called when the user clicks on the botton to close the chat
      this.isChatOpen = false;
      this.disconnect();
    },
    connect() {
      let socket = new window.SockJS("http:localhost:8080/gs-guide-websocket");
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect({}, (frame) => {
        console.log("Connected: " + frame);
        this.stompClient.subscribe("/topic/greetings", (data) => {
          if (this.cmpText != data.body) {
            // console.log(data.body);
            this.messageList = [
              ...this.messageList,
              { type: "text", author: `user1`, data: { text: data.body } },
            ]; //
          }
        });
      });
    },
    disconnect() {
      if (this.stompClient !== null) {
        this.stompClient.disconnect();
      }
      // console.log("Disconnected");
    },
  },
};
</script>
