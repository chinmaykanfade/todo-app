console.log("script is connected");

 function addTask(){
let task=document.getElementById("taskInput").value;
let li=document.createElement("li");
 let button=document.createElement("button");
 button.textContent="❌";
button.onclick=function(){
    li.remove();
}
let donebutton=document.createElement("button");
donebutton.textContent="✅";
donebutton.onclick=function(){
    li.textContent.style.textDecoration="line-through";
    li.textContent.style.opacity="0.6"
}

let textNode = document.createTextNode(task);
li.appendChild(textNode);
li.appendChild(button);  
li.appendChild(donebutton);


 
document.getElementById("taskList").appendChild(li);
document.getElementById("taskInput").value="";
}