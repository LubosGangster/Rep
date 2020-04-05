
function opinion2html(opinion){

    //in the case of Mustache, we must prepare data beforehand:
    opinion.createdDate=(new Date(opinion.created)).toDateString();

    //get the template:
    const template = document.getElementById("TmplOneOpinion").innerHTML;
    //use the Mustache:
    const htmlWOp = Mustache.render(template,opinion);

    //delete the createdDate item as we created it only for the template rendering:
    delete(opinion.createdDate);

    //return the rendered HTML:
    return htmlWOp;


}

function opinionArray2html(sourceData){

    let htmlWithOpinions="";

    for(const opn of sourceData){
        htmlWithOpinions += opinion2html(opn);
    }

    return htmlWithOpinions;
}


var opinions=[];
const opinionsElm=document.getElementById("opinionsContainer");

if(localStorage.myOktagonComments){
    opinions=JSON.parse(localStorage.myOktagonComments);
}
console.log(opinions);

opinionsElm.innerHTML=opinionArray2html(opinions);

const myFrmElm = document.forms[0].elements;
const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const nameRegExp = /^[a-zA-Z]+$/;
const email = myFrmElm[2];
const fname = myFrmElm[0];
const lname = myFrmElm[1];

let error = email;
while ((error = error.nextSibling).nodeType !== 1);
let error1 = lname;
while ((error1 = error1.nextSibling).nodeType !== 1);
let error2 = fname;
while ((error2 = error2.nextSibling).nodeType !== 1);
window.addEventListener("load", first);
function first() {
    const test = email.value.length === 0 || emailRegExp.test(email.value);
    email.className = test ? "valid" : "invalid";
    const test1 = fname.value.length === 0 || nameRegExp.test(fname.value);
    fname.className = test1 ? "valid" : "invalid";
    const test2 = lname.value.length === 0 || nameRegExp.test(lname.value);
    lname.className = test2 ? "valid" : "invalid";
}

email.addEventListener("input", second);
function second() {
    const test = email.value.length === 0 || emailRegExp.test(email.value);
    if (test) {
        email.className = "valid";
        error.innerHTML = "";
        error.className = "error";
    } else {
        email.className = "invalid";
    }

}
lname.addEventListener("input", secondLname);
function secondLname(){
    const test2 = lname.value.length === 0 || nameRegExp.test(lname.value);
    if (test2) {
        lname.className = "valid";
        error1.innerHTML = "";
        error1.className = "error";
    } else {
        lname.className = "invalid";
    }
}
fname.addEventListener("input", secondFname);
function secondFname(){
    const test1 = fname.value.length === 0 || nameRegExp.test(fname.value);
    if (test1) {
        fname.className = "valid";
        error2.innerHTML = "";
        error2.className = "error";
    } else {
        fname.className = "invalid";
    }
}

document.getElementById("updateId").addEventListener('click', processRmvFrmData);
document.getElementById("opnFrm").addEventListener("submit",processOpnFrmData);

function processOpnFrmData(event){
    //1.prevent normal event (form sending) processing
    event.preventDefault();
    let array=[];
    for(let i = 8, y = 0; i <= 11; i++){
        if(myFrmElm[i].checked){
            array[y] = "" + myFrmElm[i].value;
            y++;
        }
    }
    let array2;
    for(let i = 3; i <= 5; i++){
        if(myFrmElm[i].checked){
            array2 = "" + myFrmElm[i].value;
        }
    }
    let array3 = [];
    let x = 0;
    for(let i = 13; i <= 15; i++){
        if(myFrmElm[i].checked){
            array3[x] = "" + myFrmElm[i].value;
            x++;
        }
    }

    //2. Read and adjust data from the form (here we remove white spaces before and after the strings)
    const nopName = myFrmElm[0].value.trim() + " " + myFrmElm[1].value.trim();
    const nopEml = myFrmElm[3].value.trim();
    const nopUrl = myFrmElm[6].value.trim();
    const nopUrlPicture = myFrmElm[7].value.trim();
    const nopKeywords = myFrmElm[12].value;
    const nopOpn = myFrmElm[16].value.trim();
    const nopRel = myFrmElm[17].value;

    //3. Verify the data
    const test = email.value.length === 0 || emailRegExp.test(email.value);
    if (!test) {
        email.className = "invalid";
        error.innerHTML = "Očakávam korektný email!";
        error.className = "error active";
        return;
    } else {
        email.className = "valid";
        error.innerHTML = "";
        error.className = "error";
    }

    const test1 = lname.value.length === 0 || nameRegExp.test(lname.value);
    if (!test1) {
        lname.className = "invalid";
        error1.innerHTML = "Očakávam korektné priezvisko!";
        error1.className = "error active";
        return;
    } else {
        lname.className = "valid";
        error1.innerHTML = "";
        error1.className = "error";
    }

    const test2 = fname.value.length === 0 || nameRegExp.test(fname.value);
    if (!test2) {
        fname.className = "invalid";
        error2.innerHTML = "Očakávam korektné krstné meno!";
        error2.className = "error active";
        return;
    } else {
        fname.className = "valid";
        error2.innerHTML = "";
        error2.className = "error";
    }

    //3. Add the data to the array opinions and local storage
    const newOpinion =
        {
            name: nopName,
            email: nopEml,
            url: nopUrl,
            urlPicture: nopUrlPicture,
            genders: array2,
            ratings: array,
            comment: nopOpn,
            keywords: nopKeywords,
            favourite: array3,
            relevancy: nopRel,
            created: new Date()
        };

    console.log("New opinion:\n "+JSON.stringify(newOpinion));

    opinions.push(newOpinion);

    localStorage.myOktagonComments = JSON.stringify(opinions);

    opinionsElm.innerHTML+=opinion2html(newOpinion);

    //4. Notify the user
    window.alert("Your opinion has been stored. Look to the console");
    console.log("New opinion added");
    console.log(opinions);

    //5. Reset the form
    document.forms[0].reset(); //resets the form
}

function processRmvFrmData(event){

    event.preventDefault();
    for(let i = 0; i < opinions.length; i++){
        if(Date.now() - new Date(opinions[i].created) > 86400000){
            opinions = opinions.slice(i, 1);
            if(i === 0){
                opinions.shift();
            }
            console.log("opinions");
        }
    }
    localStorage.myOktagonComments = JSON.stringify(opinions);
    opinionsElm.innerHTML=opinionArray2html(opinions);
    console.log(opinions);
}