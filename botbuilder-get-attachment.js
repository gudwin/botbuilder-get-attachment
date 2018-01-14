"use strict";

const promisify = require("es6-promisify");
const https = require('https');
const http = require('http');
const request = require('request-promise').defaults({encoding: null});

var isTokenRequired = function (message) {
  return message.address.channelId === 'skype' || message.address.channelId === 'msteams';
};
var requestWithToken = function (url, connector) {
  let token = promisify(connector.getAccessToken.bind(connector));
  return token().then(function (token) {
    let options = {
      url: url,
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/octet-stream'
      }

    };
    return request(options);
  });
};
var requestWithoutToken = function (url) {
  return request({
    url: url
  });
};

module.exports = function (attachment, message, connector) {
  return new Promise((resolve, reject) => {

    if (attachment.content) {
      resolve(attachment.content.toString('utf8'));
      return;
    }
    let fileDownload = (isTokenRequired(message))
      ? requestWithToken(attachment.contentUrl, connector)
      : requestWithoutToken(attachment.contentUrl);
    fileDownload.then(
      (response) => {
        if (isTokenRequired(message)) {
          resolve(response.toString());
        } else {
          // attachments that were received from emulator, were encoded in base64
          // convert from base64
          resolve(Buffer.from(response.toString(), 'base64').toString());
        }
      }, (err) => {
        reject(err);
      });
  });

}