const builder = require('botbuilder');
const restify = require('restify');

let getAttachment = require('../botbuilder-get-attachment.js');
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