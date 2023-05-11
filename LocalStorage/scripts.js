
function saveLang(){
    a = document.getElementById("lang").value;

    if(a == ""){
        alert("the imput is empty");
    }
    else{
        localStorage.setItem("language", a)
        document.getElementById("emptyP").innerHTML = "You have chosen the language " + localStorage.getItem("language");
        
    }

}


function changeP(){
    b = document.getElementById("emptyP").innerHTML;

    if (localStorage.getItem("language") === null || localStorage.getItem("language") === ""){
        document.getElementById("emptyP").innerHTML = "You have NOT chosen a language";
    }
}

function clearLang(){
    localStorage.clear();
}