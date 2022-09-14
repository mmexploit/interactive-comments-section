const userComments = ({id, content, username, png, score, replies, createdAt}) => 
{

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

    document.querySelector(".comment-section").appendChild(commentDiv);

    const replyContainer = document.createElement("div");
    replyContainer.className = "reply-container"

    replies.forEach(reply => {
        let fetchedReply = replyAppend(reply);
        replyContainer.appendChild(fetchedReply);
    })

    document.querySelector(".comment-section").appendChild(replyContainer)
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



const fetchData = () => {
    fetch("../data.json")
        .then((response) => response.json())
        .then(json => json.comments.forEach(element => {
            console.log(element);
            const { id, content, score, replies, createdAt, ...otherProps } = element;
            const { username, image : { png } } = element.user;
        
            userComments({id, content, username, png, score, replies, createdAt});
        }))
}

fetchData()