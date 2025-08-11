console.log("script is connected");

 function addTask(){
let task=document.getElementById("taskInput").value;
let li=document.createElement("li");
let editbtn=document.createElement("button");
editbtn.classList.add("edit-btn");
editbtn.textContent=" ✏️";


editbtn.onclick=function(){
   //back-up use //let newtask=prompt("Edit your List",li.firstChild.textContent);

    //if(newtask!=null&& newtask.trim()!=""){
        //li.firstChild.textContent=newtask;
    //}
    let originalTextNode=li.firstChild;
    if(!originalTextNode)return;

    const backup=originalTextNode.cloneNode(true);

    const currentText=originalTextNode.textContent.trim();
    const input=document.createElement("input");
    input.type=textNode;
    input.className="edit-input";
    input.value=currentText;

    li.replaceChild(input,originalTextNode);
    input.focus();
    input.setSelectionRange(input.value.length,input.value.length);

    let cancelled=false;

    function saveEdit(){
        if(cancelled)return;
        const newText=input.value.trim();
        if(newText.length>0){
            const newTextNode=document.createTextNode(newText +"");
            li.replaceChild(newTextNode,input);
        }
        else{
            li.replaceChild(backup,input);
        }
        }

        function cancelEdit(){
            cancelled=true;
            li.replaceChild(backup,input);
        }

        input.onkeydown=function(e){
            if(e.key=="Enter")saveEdit();
            else if(e.key=="Escape")cancelEdit();
        };

        input.onblur=function(){
            setTimeout(()=>{
                if(!cancelled) saveEdit();
            },100);
        };
    }





 let deletebutton=document.createElement("button");
 deletebutton.textContent="❌";
 deletebutton.classList.add("del-btn");
 
deletebutton.onclick=function(){
    li.remove();
}
let donebutton=document.createElement("button");
donebutton.textContent="✅";
donebutton.classList.add("done-btn");
donebutton.onclick=function(){
    li.classList.toggle("done");
};

let textNode = document.createTextNode(task);
let taskitem=document.createElement("div");
taskitem.classList.add("taskitem");
li.appendChild(textNode);
taskitem.appendChild(deletebutton);  
taskitem.appendChild(donebutton);
taskitem.appendChild(editbtn);
li.appendChild(taskitem);

donebutton.innerHTML="<span class='tick'>✅</span>"
 
document.getElementById("taskList").appendChild(li);
document.getElementById("taskInput").value="";
} 