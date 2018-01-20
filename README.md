# botbuilder-get-attachment

Helper library for attachments retrieval. Supports attachments sent thru Skype, Chatbot Emulator and shell.

Library provides a function with next interface:

**getAttament(session, attachmentId)** - returns Promise that will be resolved with attahment information. Attachment body will be placed into __content__ attribute. Arguments: 
- session - Microsoft Bot Framework [Session](https://docs.botframework.com/en-us/node/builder/chat-reference/classes/_botbuilder_d_.session.html) object
- attachmentId - index of attachment 



## Example

```javascript
const builder = require('botbuilder');
const restify = require('restify');

let getAttachment = require('botbuilder-get-attachment.js');
let connector = new builder.ChatConnector({
  appId: '',
  appPassword: ''
});

let bot = new builder.UniversalBot(connector);

bot.dialog('/', [
  function (session) {
    builder.Prompts.attachment(session,'Import file')
  },
  function (session, args) {
    getAttachment(session, 0)
      .then( (result) => {
        session.endConversation( JSON.stringify(result));
      }, (error) => {
        console.error(error);
        session.endConversation( error );
      })
  }
]);


const server = restify.createServer({name : 'Attachment Example'});
server.post('/api/messages', connector.listen());
server.listen(3978, function () {
  console.log(`server listening to 3978`);
});
```

## Changelog

- 0.2 - Simplified interfaces 
- 0.1 - First version of the library