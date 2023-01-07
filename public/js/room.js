// import { io } from 'socket.io-client'
var socket = io('/');



socket.on('new-user-connected',(members, name,userIdList,disconnected_members_list)=>{

  closeUnclosedStreams()
  console.log(members)
  let n_members = members.length - disconnected_members_list.length;

  // imcreasing member count
  const members_count = document.getElementById('members__count')
  members_count.textContent = n_members

  // Sending Hi
  const messages = document.getElementById("messages")
  // creating message wrapper and adding message_wrapper class
  const message__wrapper = document.createElement('div');
  message__wrapper.classList.add('message__wrapper');
  

  // creating message__body__bot and adding message__body__bot class
  const message__body__bot = document.createElement('div');
  message__body__bot.classList.add('message__body__bot');

  // creating message author, adding message_author class and appending  bot name to it
  const message__author = document.createElement('strong');
  message__author.classList.add('message__author__bot');
  const writer = document.createTextNode('🧞‍♂️SeeYa Bot')
  message__author.appendChild(writer)

  //creating message text, adding message_text class and appending message to it
  const message__text = document.createElement('p');
  message__text.classList.add('message__text__bot');
  let text = 'Hi there';
  if(name){
      // console.log(1)
       text = document.createTextNode(name+' 👋');}
  else{
    // console.log(2)
      text = document.createTextNode('Someone just entered the room!')}

  message__text.appendChild(text)
 
  // appending message _author and message_text to message__body__bot
    message__body__bot.appendChild(message__author)
    message__body__bot.appendChild(message__text)

  // appending message_body in message wrapper
  message__wrapper.appendChild(message__body__bot)

  // appending message_wrapper in messages
  messages.appendChild(message__wrapper)


  // 
  // For members
  // 
  const boxes = document.querySelectorAll('.member__wrapper');
  boxes.forEach(box => {
    box.remove();
  });

  // console.log(n_members)
  // setting member__list as a variable
  const member__list = document.getElementById("member__list")

  // creating member wrapper and adding member_wrapper class and member_1_wrapper id
  for (let i=0; i< members.length; i++){

          const member__wrapper = document.createElement('div');
          member__wrapper.classList.add(userIdList[i]);
          member__wrapper.classList.add('member__wrapper');
          member__wrapper.setAttribute('id','member__1__wrapper')

        // creating green__icon and adding green__icon class
          const green__icon = document.createElement('span');
          green__icon.classList.add('green__icon');

          //creating member_name, adding member_name class and appending member to it
          
          const member_name = document.createElement('p');
          member_name.classList.add('member_name');
          let member = 'Unknown';
          if(members[i]){
              // console.log(1)
              member = document.createTextNode(members[i]);}
          else{
            // console.log(2)
              member = document.createTextNode('Unknown')}
              member_name.appendChild(member)
        
          // appending green__icon and member_name to message_body
            member__wrapper.appendChild(green__icon)
            member__wrapper.appendChild(member_name)

          // appending member__list in member__wrapper
          member__list.appendChild(member__wrapper)
}
for (let i=0; i< disconnected_members_list.length;i++){
  let disconnect_users_join = document.getElementsByClassName(disconnected_members_list[i]);

  let b = disconnect_users_join[0].getElementsByClassName('green__icon')
  b[0].classList.add('red__icon')
  b[0].classList.remove('green__icon')
}


})



let messagesContainer = document.getElementById('messages');
messagesContainer.scrollTop = messagesContainer.scrollHeight;

const videoGrid = document.getElementById('video-grid')

const memberContainer = document.getElementById('members__container');
const memberButton = document.getElementById('members__button');

const chatContainer = document.getElementById('messages__container');
const chatButton = document.getElementById('chat__button');

const chatForm = document.getElementById('message__form');
const chatInput = document.getElementsByClassName('message_input').message;


// toggling features
// 
const toggleVideoButton = document.getElementById('stopVideoButton')
toggleVideoButton.addEventListener("click",toggleVideo)

// Toggling audio
const toggleAudioButton = document.getElementById('stopAudioButton')
toggleAudioButton.addEventListener("click",toggleAudio)

// Exiting
const exitButton = document.getElementById('exitButton')
exitButton.addEventListener("click",exitMeeting)

function toggleVideo(){
  // console.log("I got clicked")
  const videoTrack = userStream.getTracks().find(track => track.kind === 'video');
  if (videoTrack.enabled) {
    videoTrack.enabled = false;
    toggleVideoButton.classList.add('active')

    
} else {
    videoTrack.enabled = true;
    toggleVideoButton.classList.remove('active')
    
}}

// toggle audio
function toggleAudio(){
  // console.log("I got clicked")
  const audioTrack = userStream.getTracks().find(track => track.kind === 'audio');
  if (audioTrack.enabled) {
    audioTrack.enabled = false;
    toggleAudioButton.classList.add('active')

} else {
    audioTrack.enabled = true;
    toggleAudioButton.classList.remove('active')
}}

chatForm.addEventListener('submit',(e)=>{
    e.preventDefault();
  if(chatInput.value)
  // { console.log(e.value)
    {socket.emit('chat message', [sessionStorage.name,chatInput.value],ROOM_ID);
    chatInput.value = '';
  };
});
socket.on('chat message',(msg)=>{
  // console.log(msg)
  const messages = document.getElementById("messages")
  // creating message wrapper and adding message_wrapper class
  const message__wrapper = document.createElement('div');
  message__wrapper.classList.add('message__wrapper');

  // creating message body and adding message_body class
  const message__body = document.createElement('div');
  message__body.classList.add('message__body');

  // creating message author, adding message_author class and appending writer name to it
  const message__author = document.createElement('strong');
  message__author.classList.add('message__author');
  const writer = document.createTextNode(msg[0])
  message__author.appendChild(writer)

  //creating message text, adding message_text class and appending message to it
  
  const message__text = document.createElement('p');
  message__text.classList.add('message__text');
  const text = document.createTextNode(msg[1]);
  message__text.appendChild(text)
 
  // appending message _author and message_text to message_body
    message__body.appendChild(message__author)
    message__body.appendChild(message__text)

  // appending message_body in message wrapper
  message__wrapper.appendChild(message__body)

  // appending message_wrapper in messages
  messages.appendChild(message__wrapper)

})

let activeMemberContainer = false;

memberButton.addEventListener('click', () => {
  if (activeMemberContainer) {
    memberContainer.style.display = 'none';
  } else {
    memberContainer.style.display = 'block';
  }

  activeMemberContainer = !activeMemberContainer;
});

let activeChatContainer = false;

chatButton.addEventListener('click', () => {
  if (activeChatContainer) {
    chatContainer.style.display = 'none';
  } else {
    chatContainer.style.display = 'block';
  }

  activeChatContainer = !activeChatContainer;
});

// -----------------------
// webRTC
// const socket = io('http://localhost:3000')
const myPeer = new Peer()
// console.log(myPeer)
const myVideo = document.createElement('video')
myVideo.classList.add()
myVideo.muted = true
const peers = {}
// console.log(peers)

function addVideoStream(video, stream) {
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  videoGrid.append(video)}

function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream)
  const video = document.createElement('video')
  // console.log('connected to new user')
  call.on('stream', userVideoStream => {

    addVideoStream(video, userVideoStream)
  })


  call.on('close', () => {

    video.remove()
  })

  peers[userId] = call
}

// stack overflow
function removeElementsByClass(className){
  const elements = document.getElementsByClassName(className);
  while(elements.length > 0){
    // console.log('hi ')
      elements[0].parentNode.removeChild(elements[0]);
  }
}

function closeUnclosedStreams(){
  let videoContainer = document.querySelector('#video-grid');
  let videos = videoContainer.childNodes
  for(let i = 0;i< videos.length; i++){
    console.log(videos[i].srcObject.active)
    if(!videos[i].srcObject.active){
      console.log(videos[i].srcObject.active)
      videos[i].remove()
    }
  }
}


socket.on('user-disconnected', (userId,name) => {
  // closeUnclosedStreams()
  console.log("user disconnected: "+userId)
  console.log("user-disconnected"+userId)
  removeElementsByClass(userId)
  let disconnect_users_here = document.getElementsByClassName(userId);
  const messages = document.getElementById("messages")
  // creating message wrapper and adding message_wrapper class
  const message__wrapper = document.createElement('div');
  message__wrapper.classList.add('message__wrapper');

  // creating message__body__bot and adding message__body__bot class
  const message__body__bot = document.createElement('div');
  message__body__bot.classList.add('message__body__bot');

  // creating message author, adding message_author class and appending  bot name to it
  const message__author = document.createElement('strong');
  message__author.classList.add('message__author__bot');
  const writer = document.createTextNode('🧞‍♂️SeeYa Bot')
  message__author.appendChild(writer)

  //creating message text, adding message_text class and appending message to it
  const message__text = document.createElement('p');
  message__text.classList.add('message__text__bot');
  let text = document.createTextNode(name+' left the meeting')

  message__text.appendChild(text)
 
  // appending message _author and message_text to message__body__bot
    message__body__bot.appendChild(message__author)
    message__body__bot.appendChild(message__text)

  // appending message_body in message wrapper
  message__wrapper.appendChild(message__body__bot)

  // appending message_wrapper in messages
  messages.appendChild(message__wrapper)

  document.getElementById('members__count').textContent = parseInt(document.getElementById('members__count').textContent)-1
  if (peers[userId]) peers[userId].close()
  // closeUnclosedStreams
   setTimeout(closeUnclosedStreams, 8000);
})


// let member_list = []
myPeer.on('open', id => {
  socket.emit('join-room', ROOM_ID, id,sessionStorage.name)
})

function exitMeeting(){
  // console.log("I got clicked")
  userStream.getTracks().forEach(function(track) { track.stop(); });
  userStream.getTracks().forEach(function(track) { track.stop(); })
  window.location.href = "/";
  
}

async function init(){
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    })
    addVideoStream(myVideo, stream)
      // when we call the pe
    myPeer.on('call', call => {
    call.answer(stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream)
        })
      })
    socket.on('user-connected', userId => {
        connectToNewUser(userId, stream)})
    userStream = stream
  } catch (error) {
    console.log(error)
  }}
init()