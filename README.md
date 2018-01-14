# botbuilder-get-attachment

Helper library for attachments retrieval. Supports attachments sent thru Skype, Chatbot Emulator and shell
  
## Example

```javascript
GetAttachment(session.message.attachments[0], session.message, connector)
  .then((content) => {
    console.log(content);
  }, (error) => {
    console.error(error);
  })
```