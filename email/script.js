
modal = document.querySelector('ion-modal');

function email(){
    console.log("working");
    const alert = document.createElement('ion-alert');
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    a = document.getElementById("email").value;
    b = document.getElementById("subject").value;
    
    document.body.appendChild(alert);
    alert.present();

    if(a == "")
    {
        alert.message = "You must enter a recipient";
        alert.buttons = ['OK'];
    }
    else if (!a.match(mailformat))
    {
        alert.message = "Invalid email";
        alert.buttons = ['OK'];
    }
    else if(b == ""){
        alert.header = 'Subject missing';
        alert.message = 'You have not entered a subject are you sure you want to continue';
        alert.buttons = [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => { handlerOutput.innerText = 'Alert canceled'; }
            },
            {
              text: 'yes',
              role: 'confirm',
              handler: () => {console.log("email sent") }
            }
          ];
      }
      else if (b != "" && a.match(mailformat)){
        alert.message = "email sent";
        alert.buttons = ['OK'];
        window.location.href = "messages.html"   
      }
      document.body.appendChild(alert);
      alert.present();
}



function JsonEmail(){
  recepiant = document.getElementById("email").value;
  subject = document.getElementById("subject").value;
  text_area = document.getElementById("text_area").value;
  messages = JSON.parse(localStorage.getItem("messages"))
  
  if (messages == null){
    messages= [];
  }
  var message = {recepiant: recepiant, subject: subject, text_area: text_area }
  messages.push(message);
  localStorage.setItem("messages", JSON.stringify(messages));
}

function deleteAll(){
  localStorage.removeItem("messages");
  updateMsg();
}

function deleteThis(index){
  messages = JSON.parse(localStorage.getItem("messages"));

  messages.splice(index ,1)
  localStorage.setItem("messages", JSON.stringify(messages));
  updateMsg();  
}

function cancel() {
  modal.dismiss(null, 'cancel');
}

function ShowEmail(index){
  messages = JSON.parse(localStorage.getItem("messages"));
  message = messages[index];

  subject = document.getElementById("subject");
  recievedFrom = document.getElementById("RecievedFrom");
  comments = document.getElementById("Comments");
  modal = document.querySelector('ion-modal');

  subject.innerHTML = "Subject: " + message.subject;
  recievedFrom.innerHTML = "From: " + message.recepiant;
  comments.innerHTML = "Email: " + message.text_area;
  modal.present();
}


function updateMsg(){
  messages = JSON.parse(localStorage.getItem("messages"));
  document.getElementById("messages").innerHTML = "";
  if(messages != null && messages.length > 0){
    console.log(messages)
    for (var i = 0; i < messages.length; i++){
      const ionItem = document.createElement('ion-item');
      const item = messages[i];
      ionItem.innerHTML = `<ion-avatar slot="start"><img alt="Silhouette of a person's head"src="https://ionicframework.com/docs/img/demos/avatar.svg" /></ion-avatar>`;
      ionItem.innerHTML += `<ion-label onclick="ShowEmail(${i})">to: ${item.recepiant} </ion-label>`;
      ionItem.innerHTML += `<ion-label>Subject: ${item.subject} </ion-label>`;
      ionItem.innerHTML += `<ion-button  color="medium" fill="clear" onclick="deleteThis(${i})"><ion-icon name="trash-outline"></ion-icon></ion-button>`;
      document.getElementById("messages").appendChild(ionItem);
    }
  }  
  else{
      const ionItem = document.createElement('ion-item');
      ionItem.innerHTML = `<ion-label>No current messages</ion-label>`;
      document.getElementById("messages").appendChild(ionItem);
  }
}

