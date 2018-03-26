// YOUR CODE HERE:
const app = {
  init: () => {
    app.fetch();
    app.handleSubmit();
    
  },
  send: (message, data) => {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: (data) => {
        console.log(data);
        console.log(message);
        console.log('chatterbox: Message sent');
      },
      error: (data) => {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  fetch: () => {
    $.ajax({
      url: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages?order=-createdAt',
      contentType: 'application/json',
      type: 'GET',
      success: (data) => {
        for (let result of data.results) {
          app.renderMessage(result);
        }
        console.log(data);
        console.log('got?');
      }
    });
  },
  clearMessages: () => {
    $('#chats').html('');
  },
  renderMessage: (message) => {
    const newMessage = $(`<div class="chat ${message.username}"></div>`);
    const capitalized = message.username.charAt(0).toUpperCase() + message.username.slice(1);
    const user = $(`<h3 class="username">${capitalized}:</h3>`);
    newMessage.append(user);
    const cleanedMessage = $('div.someClass').text(message.text).html();
    const text = $(`<h4>${cleanedMessage}</h4>`);
    newMessage.append(text);
    $('#chats').append(newMessage);
    $('.username').click(app.handleUsernameClick);
  },
  renderRoom: (roomName) => {
    const newRoom = $(`<option>${roomName}</option>`);
    $('#roomSelect').append(newRoom);
  },
  handleUsernameClick: () => {},
  handleSubmit: (event) => {
    event.preventDefault();
    const userName = window.location.search.slice(10);
    const text = $('#message').val();
    if (text !== '') {
      const message = {
        username: userName,
        text: text
      };
      app.send(message);
    } 
  },
  getRoomNames: () => {
    console.log('hey');
    $.ajax({
      url: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages?order=-createdAt',
      contentType: 'application/json',
      type: 'GET',
      success: (data) => {
        const set = new Set();
        for (let result of data.results) {
          set.add(result.roomname);
        }
        const rooms = [...set];
        for (let room of rooms) {
          $('#roomSelect').append(`<option>${room}</option>`);
        }
      }
    });
  },
  addRoom: (event) => {
    event.preventDefault();
    const roomName = $('.roomName').val();
    const arrayOfRooms = $('#roomSelect').children();
    const targetArray = Array.from(arrayOfRooms);
    for (let node of targetArray) {
      if (roomName === node.value) {
        return;
      }
    }
    $('#roomSelect').append(`<option>${roomName}</option>`);
  },
  filterByRoom: (event) => {
    event.preventDefault();
    $.ajax({
      url: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages?order=-createdAt',
      contentType: 'application/json',
      type: 'GET',
      success: (data) => {
        const messages = data.results.filter((array) => {
          return array.roomname === $('#roomSelect').val();
        });
        for (let message of messages) {
          app.renderMessage(message);  
        }
      }
    });
  },
  
  beFriend: ()=> {
  // $('.username').toggleClass('friend')
    console.log('heyheyhey');
  }

};                  

// $('#chats').click((event) => {
//   const target = $(event.target);
//   if( target.is('.username') ) {
//     app.handleUsernameClick();
//   }
// });

//$('#send .submit').submit(app.handleSubmit);

$(document).ready(() => {
  app.init();
  $('#refresh').click(app.fetch);
    
});