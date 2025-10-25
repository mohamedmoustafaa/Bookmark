var uname =document.getElementById("uname");
var url =document.getElementById("url");
var addBtn =document.getElementById("addBtn");
var tableData =document.getElementById("tableData");
var modal =document.getElementById("modal");
var closeBtn =document.getElementById("closeBtn");
var search =document.getElementById("search");

var bookmarks;
var currentIndex;
// check for exsiting bookmarks
if(JSON.parse(localStorage.getItem("bookmarks"))!==null){
    bookmarks=JSON.parse(localStorage.getItem("bookmarks"));
    displayBookmarks(bookmarks);
}
else{
    bookmarks=[]
}

// add bookmark
function addBookmark(){
    if(uname.value!=""&&url.value!==""){
        var bookmark={
        uname:uname.value,
        url:url.value,
    }
    
    if(addBtn.innerHTML=="update"){
        bookmarks.splice(currentIndex,1,bookmark)
        addBtn.innerHTML="Submit"
    }else{
    bookmarks.push(bookmark);
    }
    updateLocalStorage();
    displayBookmarks(bookmarks);
    clearInputs()
    }
    else{
        modal.classList.remove("d-none")
    }
    
    // console.log(bookmarks);
}

// update local storage data
function updateLocalStorage(){
    localStorage.setItem("bookmarks",JSON.stringify(bookmarks));
}
var y =3
var x = y>4 ? 5 : 2 

function displayBookmarks(arr){
    var box=``
    for(var i = 0 ; i<arr.length ;i++){
        box+=`
        <tr>
                <td>${i+1}</td>
                    <td> ${arr[i].uname}</td>
                    <td><p onclick="updateBookmark(${i})"  class="btn btn-primary"><i class="fa-solid fa-pen"></i> Update</p></td>
                    <td><p onclick="checkUrl('${arr[i].url}')" class="btn btn-warning"><i class="fa-regular fa-eye"></i> Visit</p></td>
                    <td><p onclick="deleteBookmark(${i})" class="btn btn-danger"><i class="fa-solid fa-trash"></i> Delete</p></td>
              </tr>
        `
    }
    tableData.innerHTML=box;
    // <td><a href="${arr[i].url.startsWith("https://")? arr[i].url :"https://"+arr[i].url}" class="btn btn-warning"><i class="fa-regular fa-eye"></i> Visit</a></td>
}

function deleteBookmark(index){
    bookmarks.splice(index,1);
    updateLocalStorage();
    displayBookmarks(bookmarks)
}

function checkUrl(url){
    if(url.startsWith("https://")){
        // window.open(url +"","_blank");
        window.location.href=url
    }
    else{
        // window.open("https://"+url ,"_blank")
        window.location.href=url
    }
    
}
function updateBookmark(index){
currentIndex=index;
uname.value=bookmarks[index].uname;
url.value=bookmarks[index].url;
addBtn.innerHTML="update"

}

function clearInputs(){
    uname.value=""
    url.value=""
}

function closeModal(){
    modal.classList.add("d-none")
}
// 2- 
document.addEventListener("keydown",function(e){
    console.log(e);
    if(e.key=="Escape" || e.key == "Enter"){
        closeModal()
    }
})
// 3-
modal.addEventListener("click",function(e){

if(e.target.classList.contains("box-info")){
    closeModal()
}
})

function searchBookmarks(value){
  var  result=[];
  for(var i = 0 ; i<bookmarks.length;i++){
    if(bookmarks[i].uname.toLowerCase().includes(value.toLowerCase())){
        result.push(bookmarks[i]);
    }

  }
  if(result.length==0){
    tableData.innerHTML=` <tr><td colspan="5">No Match</td> </tr>`
  }else{

      displayBookmarks(result)
  }
}
addBtn.addEventListener("click",addBookmark)
search.addEventListener("input",function(){
searchBookmarks(this.value)
})
// 1-
closeBtn.addEventListener("click",closeModal)