//Fetch the data from the json file
const fetchData = 
    fetch("../data.json")
        .then((response) => response.json())
        .then(json => { return json})

//
const fetchedData = async () => {
    const data = await fetchData;
    console.log(data);
    data.comments.forEach(element => {
        userComments(element);
    })
}

fetchedData();
let dataa = localStorage.getItem("myComments");
let parsed = JSON.parse(dataa)
console.log(parsed)

const userComments = async ({id, content, user : { username, image : {png}}, score, replies, createdAt}) => 
{
    const data = await fetchData;
    const { currentUser : { username : currentUsername }} = data;

    const userCommentContainer = document.createElement("div");
    userCommentContainer.className = "user-comment-container"
    userCommentContainer.id = id;

    const commentDiv = document.createElement('div')
    commentDiv.className = "comment";

    const commentHeader = document.createElement('div');
    commentHeader.className = "comment-header";

    const userImage = document.createElement('img');
    userImage.className = "user-image";
    userImage.src = `${png}`
    commentHeader.appendChild(userImage);

    const userName = document.createElement("p");
    userName.className = "user-name"
    userName.textContent = username;
    commentHeader.appendChild(userName)

    const createdAtDiv = document.createElement("span");
    createdAtDiv.className = "created-at"
    createdAtDiv.textContent = createdAt;
    commentHeader.appendChild(createdAtDiv)
    

    const content1 = document.createElement("p");
    content1.className = "content";
    content1.textContent = content;
    commentDiv.appendChild(content1);

    const commentFooter = document.createElement('div');
    commentFooter.className = "comment-footer";

    const scoreCounter = document.createElement("span");
    scoreCounter.className = "score";
    scoreCounter.textContent = score;
    commentFooter.appendChild(scoreCounter);

    const reply = document.createElement("div");
    reply.className = "reply-button";    
    reply.textContent =  "Reply";
    const replyArrow = document.createElement("img");
    replyArrow.className = "reply-arrow";
    replyArrow.src = "../images/icon-reply.svg"
    reply.appendChild(replyArrow);

    commentFooter.appendChild(reply);
    commentDiv.appendChild(commentHeader);
    commentDiv.appendChild(content1);
    commentDiv.appendChild(commentFooter);

    userCommentContainer.appendChild(commentDiv);
    document.querySelector(".comment-section").appendChild(userCommentContainer)

    const replyContainer = document.createElement("div");
    replyContainer.className = "reply-container"

    replies.forEach(reply => {
        let fetchedReply = replyAppend(reply, currentUsername);
        replyContainer.appendChild(fetchedReply);
    })

    userCommentContainer.appendChild(replyContainer);
    document.querySelector(".comment-section").appendChild(userCommentContainer)
}

const replyAppend = (replyComment, currentUsername) => {
    const { content, createdAt, replyingTo, score, user : {username, image: { png }}, } = replyComment;
    console.log(createdAt)

    

    const replyCard = document.createElement("div")
    replyCard.className = "comment replied-comment";

    const commentHeader = document.createElement('div');
    commentHeader.className = "comment-header";
    replyCard.appendChild(commentHeader);

    const userImage = document.createElement('img');
    userImage.className = "user-image";
    userImage.src = `${png}`
    commentHeader.appendChild(userImage);

    const userName = document.createElement("p");
    userName.className = "user-name"
    userName.textContent = username;
    commentHeader.appendChild(userName)

    const you = document.createElement("div");
    currentUsername == username ? you.className = "you" : you.className="invisible";
    you.textContent = "you";
    commentHeader.appendChild(you);

    const createdAtDiv = document.createElement("span");
    createdAtDiv.className = "created-at"
    createdAtDiv.textContent = createdAt;
    commentHeader.appendChild(createdAtDiv);
    

    const content1 = document.createElement("p");
    content1.className = "content";
    content1.textContent = content;
    replyCard.appendChild(content1);

    const commentFooter = document.createElement('div');
    commentFooter.className = "comment-footer";

    const scoreCounter = document.createElement("span");
    scoreCounter.className = "score";
    scoreCounter.textContent = score;
    commentFooter.appendChild(scoreCounter);

    //Add an edit and delete if the reply coming from the JSON is from the current user
    const editAndDeleteContainer = document.createElement("div");
    //Conditionally render the container if the user is the currentUser or admin, else set the display to none
    (currentUsername == username) ? editAndDeleteContainer.className = "edit-and-delete-container" : editAndDeleteContainer.className = "invisible";

    const deleteButton = document.createElement("div");
    deleteButton.className = "delete-button"

    const editButton = document.createElement("div");
    editButton.className = "edit-button"; 

    const deleteSvg = document.createElement("img");
    deleteSvg.className = "delete-svg";
    deleteSvg.src = "../images/icon-delete.svg"
    deleteButton.appendChild(deleteSvg);

    const deleteText = document.createElement("span");
    deleteText.className = "delete";
    deleteText.textContent = "Delete"
    deleteButton.appendChild(deleteText);

    const editSvg = document.createElement("img");
    editSvg.className = "edit-svg";
    editSvg.src = "../images/icon-edit.svg"
    editButton.appendChild(editSvg);

    const edit = document.createElement("span");
    edit.className = "edit";
    edit.textContent = "Edit"
    editButton.appendChild(edit);

    editAndDeleteContainer.appendChild(deleteButton);
    editAndDeleteContainer.appendChild(editButton)

    commentFooter.appendChild(editAndDeleteContainer)

    editButton.addEventListener("click", (event) => {
        createTextArea(event, content);
        //setTimeout to remove old comment once the edit is executed
        setTimeout(
            () => {
                const closestAncestor = event.target.closest(".comment");
                closestAncestor.remove();
                }
            , 1)
    })

    deleteButton.addEventListener("click", (event) => {
            let closestAncestor = event.target.closest(".comment");
    
            
                console.log(event.target.closest(".replied-comment"))
                        
                
                const modal = document.getElementsByClassName("confirm-modal")[0];
                const cancelButton = document.getElementsByClassName("cancel-modal-button")[0];
                const deleteButton = document.getElementsByClassName("delete-modal-button")[0];
                modal.showModal();
    
            cancelButton.addEventListener("click", () => {
                modal.close();
            })
            
            deleteButton.addEventListener("click", () => {
                closestAncestor.remove();
                modal.close();
            })
        })

    const reply = document.createElement("div");
    currentUsername == username ? reply.className = "reply-button invisible" : reply.className="reply-button"
    reply.textContent =  "Reply";
    const replyArrow = document.createElement("img");
    replyArrow.className = "reply-arrow";
    replyArrow.src = "../images/icon-reply.svg"
    reply.appendChild(replyArrow);
    
    currentUsername == username ? ( reply.classList.add = "invisible") : console.log("false")
    commentFooter.appendChild(reply);
    replyCard.appendChild(commentHeader);
    replyCard.appendChild(content1);
    replyCard.appendChild(commentFooter);

    // replyContainer.appendChild(replyCard)

    return replyCard;
}


setTimeout(
    () => {
        const replyButton = document.getElementsByClassName("reply-button");
        for(i = 0; i < replyButton.length; i++) {
            // replyButton[i].id = ++i;
            replyButton[i].addEventListener("click", (event) => {
                createTextArea(event)
            } )
        // document.querySelector(".comment-section").appendChild(replyingDialog)
        }}
        
    ,200)

const createTextArea = async (event, otherText) => {
    const data = await fetchData;
    const { currentUser: {image : {png}, username} } = data;

    //Get the username of the session to which you reply to
    const replyToAncestor = event.target.closest(".comment");
    const replyToHeader = replyToAncestor.getElementsByClassName("comment-header")[0];
    const replyToDiv = replyToHeader.getElementsByClassName("user-name")[0];
    const replyTo = replyToDiv.textContent;

    
    const textFieldContainer = document.createElement("div");
    textFieldContainer.className = "replied-comment comment text-field-container";

    const imageAndTextContainer = document.createElement("div");
    imageAndTextContainer.className = "image-and-text-container";

    const imageField = document.createElement("img");
    imageField.className = "user-image";
    imageField.src = `${png}`;
    imageAndTextContainer.appendChild(imageField);

    const textField = document.createElement("textarea");
    textField.className = "text-field";

    const replytoTag = document.createElement("span");
    replytoTag.className = "reply-to-tag";
    textField.textContent = `@${replyTo} ` + `${otherText ? otherText : ""}`
    imageAndTextContainer.appendChild(textField)

    textFieldContainer.appendChild(imageAndTextContainer)

    const buttonContainer = document.createElement("div")
    buttonContainer.className = "button-container"

    const replySubmitButton = document.createElement("button")
    replySubmitButton.className = "btn reply-submit-button";
    replySubmitButton.textContent = "Reply";
    buttonContainer.appendChild(replySubmitButton);

    const cancelButton = document.createElement("button");
    cancelButton.className = "btn cancel-button"
    cancelButton.textContent = "Cancel";
    buttonContainer.appendChild(cancelButton);

    textFieldContainer.appendChild(buttonContainer)

    cancelButton.addEventListener("click", (event) => {
        //Get the closest text-field attached to delete it
        event.target.closest(".text-field-container").remove()
    })

    replySubmitButton.addEventListener("click", (event) => {
        //Get the closest ancestor where the submit reply button is clicked
        let ancestor = event.target.closest(".text-field-container");
        //Fish out the closest text field or text area to type the comments
        let closestTextField = ancestor.getElementsByClassName("text-field");
        //Get the value or the text inputed in that area
        let typedText = closestTextField[0].value;
        appendReply(event, typedText, username, png, replyTo);
        event.target.closest(".text-field-container").remove();
        var htmlContents = document.documentElement.innerHTML;
        localStorage.setItem('myComments', JSON.stringify(htmlContents ));
    })

    //To get the closest ancestor at which the reply button is clicked 
    let ancestor = event.target.closest(".user-comment-container");
    //Get the replies container of that respective div to attach textarea to
    let closestReplyDiv = ancestor.getElementsByClassName("reply-container")
    closestReplyDiv[0].appendChild(textFieldContainer)
    const newTextField = document.getElementsByClassName("text-field")
    newTextField[newTextField.length - 1].focus();
    let end = newTextField.selectionEnd;
    newTextField.selectionEnd= end + 7;
}

const appendReply = (event, typedText, username, png, replyTo) => {
    console.log(event.target.closest(".reply-container"))
    console.log(username)


    const replyCard = document.createElement("div")
    replyCard.className = "comment replied-comment";

    const commentHeader = document.createElement('div');
    commentHeader.className = "comment-header";
    replyCard.appendChild(commentHeader);

    const userImage = document.createElement('img');
    userImage.className = "user-image";
    userImage.src = `${png}`
    commentHeader.appendChild(userImage);

    const userName = document.createElement("span");
    userName.className = "user-name"
    userName.textContent = username;
    commentHeader.appendChild(userName)

    function addZero(i) {
        if (i < 10) {i = "0" + i}
        return i;
      }
      
      const d = new Date();
      let h = addZero(d.getHours());
      let m = addZero(d.getMinutes());
      let s = addZero(d.getSeconds());
      let time = h + ":" + m + ":" + s;
    
    const createdAtDiv = document.createElement("span");
    createdAtDiv.className = "created-at";
    createdAtDiv.textContent = time;
    commentHeader.appendChild(createdAtDiv);
    

    const content1 = document.createElement("p");
    content1.className = "content";

    //Split the obtained text obtained from the text area
    const typedTextSplited = typedText.split(" ");
    //Removed the first element of the spilited text( which is the tag of the user to reply to)
    typedTextSplited.shift();
    //Join the content except the tag
    const contentAfterShift = typedTextSplited.join(" ");

    //Create a new span element to style the username replied to
    const tag = document.createElement("span");
    tag.className = "reply-to-tag";
    tag.textContent = `@${replyTo} `
    content1.appendChild(tag);

    //Another span element to contain the comment typed by the user
    const mainContent = document.createElement("span");
    mainContent.className = "replied-content";
    mainContent.textContent = contentAfterShift;
    content1.appendChild(mainContent)

    replyCard.appendChild(content1);

    const commentFooter = document.createElement('div');
    commentFooter.className = "comment-footer";

    const scoreCounter = document.createElement("span");
    scoreCounter.className = "score";
    scoreCounter.textContent = 0;
    commentFooter.appendChild(scoreCounter);

    const editAndDeleteContainer = document.createElement("div");
    editAndDeleteContainer.className = "edit-and-delete-container";

    const deleteButton = document.createElement("div");
    deleteButton.className = "delete-button"

    const editButton = document.createElement("div");
    editButton.className = "edit-button"; 

    const deleteSvg = document.createElement("img");
    deleteSvg.className = "delete-svg";
    deleteSvg.src = "../images/icon-delete.svg"
    deleteButton.appendChild(deleteSvg);

    const deleteText = document.createElement("span");
    deleteText.className = "delete";
    deleteText.textContent = "Delete"
    deleteButton.appendChild(deleteText);

    const editSvg = document.createElement("img");
    editSvg.className = "edit-svg";
    editSvg.src = "../images/icon-edit.svg"
    editButton.appendChild(editSvg);

    const edit = document.createElement("span");
    edit.className = "edit";
    edit.textContent = "Edit"
    editButton.appendChild(edit);

    editAndDeleteContainer.appendChild(deleteButton);
    editAndDeleteContainer.appendChild(editButton)

    commentFooter.appendChild(editAndDeleteContainer)

    deleteButton.addEventListener("click", (event) => {
        let closestAncestor = event.target.closest(".comment");

        
            console.log(event.target.closest(".replied-comment"))
                    
            
            const modal = document.getElementsByClassName("confirm-modal")[0];
            const cancelButton = document.getElementsByClassName("cancel-modal-button")[0];
            const deleteButton = document.getElementsByClassName("delete-modal-button")[0];
            modal.showModal();

        cancelButton.addEventListener("click", () => {
            modal.close();
        })
        
        deleteButton.addEventListener("click", () => {
            closestAncestor.remove();
            modal.close();
        })
    })

    editButton.addEventListener("click", (event) => {
        createTextArea(event, contentAfterShift);
        //setTimeout to remove old comment once the edit is executed
        setTimeout(
            () => {
                let closestAncestor = event.target.closest(".comment");
                closestAncestor.remove();
                }
            , 1)
    })

    

    replyCard.appendChild(commentHeader);
    replyCard.appendChild(content1);
    replyCard.appendChild(commentFooter);

    const ancestorDiv = event.target.closest(".reply-container");
    ancestorDiv.appendChild(replyCard);


}

