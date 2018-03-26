$('#refresh').click(() => {
  app.clearMessages();
  app.fetch();
});
$('#send').submit((event) => {
  app.handleSubmit(event);
  $('#message').val('');
  $('#chats').html('');
  app.fetch();
});

$('.addRoom').submit((event) => {
  event.preventDefault();
  app.addRoom(event);
  $('.roomName').val('');
});

app.getRoomNames();

$('#roomSelect').change((event) =>{
  app.clearMessages();
  app.filterByRoom(event);
});

$('#chat').on('click', app.beFriend);