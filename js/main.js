const fetchData = 
    fetch("../data.json")
        .then((response) => response.json())
        .then(json => { return json})


const fetchedData = async () => {
    const data = await fetchData;
    console.log(data);
    data.comments.forEach(element => {
        userComments(element);
    })
}

fetchedData();

const userComments = ({id, content, user : { username, image : {png}}, score, replies, createdAt}) => 
{
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
        let fetchedReply = replyAppend(reply);
        replyContainer.appendChild(fetchedReply);
    })

    userCommentContainer.appendChild(replyContainer);
    document.querySelector(".comment-section").appendChild(userCommentContainer)
}

const replyAppend = (replyComment) => {
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

    const createdAtDiv = document.createElement("span");
    createdAtDiv.className = "created-at"
    createdAtDiv.textContent = createdAt;
    commentHeader.appendChild(createdAtDiv)
    

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

    const reply = document.createElement("div");
    reply.className = "reply-button";    
    reply.textContent =  "Reply";
    const replyArrow = document.createElement("img");
    replyArrow.className = "reply-arrow";
    replyArrow.src = "../images/icon-reply.svg"
    reply.appendChild(replyArrow);

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
                // createTextArea(replyButton[i].id)
                // console.log(i.path[3])
                createTextArea(event)
            } )
        // document.querySelector(".comment-section").appendChild(replyingDialog)
        }}
        
    ,200)

const createTextArea = async (event) => {
    const data = await fetchData;
    const { currentUser: {image : {png}} } = data;


    let replyContainer, replyTo;
    if(event.path.length > 9) {
        replyContainer = event.path[3];
        replyTo = event.path[2].childNodes[0].childNodes[1].childNodes[0].data;
    } else {
        replyContainer = event.path[3].childNodes[1];
        replyTo = event.path[2].childNodes[0].childNodes[1].childNodes[0].data;
    }
    
    event.path.length > 9 ? console.log("true") : console.log("false") 
    console.log(event)
    console.log("clicked")
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
    textField.textContent = `@${replyTo} `
    imageAndTextContainer.appendChild(textField);

    textFieldContainer.appendChild(imageAndTextContainer)

    const buttonContainer = document.createElement("div");
    buttonContainer.className = "button-container"

    const replySubmitButton = document.createElement("button");
    replySubmitButton.className = "btn reply-submit-button";
    replySubmitButton.textContent = "Reply";
    buttonContainer.appendChild(replySubmitButton);

    const cancelButton = document.createElement("button");
    cancelButton.className = "btn cancel-button"
    cancelButton.textContent = "Cancel";
    buttonContainer.appendChild(cancelButton);

    textFieldContainer.appendChild(buttonContainer)

    cancelButton.addEventListener("click", (event) => {
        const fields = document.getElementsByClassName("text-field-container");
        fields[fields.length - 1].remove()
    })

    replyContainer.appendChild(textFieldContainer)
}

