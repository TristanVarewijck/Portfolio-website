let commentForm = document.getElementById('comment-form'); 
commentForm.addEventListener('submit', addNewComment);


// Using IIFE for Implementing Module Pattern to keep the Local Space for the JS Variables
(function() {
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

        comments = [],
        pusher = new Pusher('b838f333e546486d5d14', {
          cluster: 'eu',
          encrypted: true
        }),
        // Subscribing to the 'flash-comments' Channel
        channel = pusher.subscribe('flash-comments');

})();


function addNewComment(event){
    let serverUrl = "/"
    event.preventDefault();
    var newComment = {
      "name": document.getElementById('new_comment_name').value,
      "email": document.getElementById('new_comment_email').value,
      "comment": document.getElementById('new_comment_text').value
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", serverUrl+"TristanVarewijck", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
      if (xhr.readyState != 4 || xhr.status != 200) return;

      // On Success of creating a new Comment
      console.log("Success: " + xhr.responseText);
      commentForm.reset();
    };
    xhr.send(JSON.stringify(newComment));
}

var commentsList = document.getElementById('comments-list'),
    commentTemplate = document.getElementById('comment-template');

// Binding to Pusher Event on our 'flash-comments' Channel
channel.bind('new_comment',newCommentReceived);

// New Comment Received Event Handler
    // We will take the Comment Template, replace placeholders & append to commentsList
    function newCommentReceived(data){
      var newCommentHtml = commentTemplate.innerHTML.replace('{{name}}',data.name);
      newCommentHtml = newCommentHtml.replace('{{email}}',data.email);
      newCommentHtml = newCommentHtml.replace('{{comment}}',data.comment);
      var newCommentNode = document.createElement('div');
      newCommentNode.classList.add('comment');
      newCommentNode.innerHTML = newCommentHtml;
      commentsList.appendChild(newCommentNode);
    }