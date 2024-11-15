let dataBooks=[];
let categories=document.querySelector(".category");
async function getList(){
  let data=await fetch("https://books-backend.p.goit.global/books/category-list");
  let jsondata= await data.json();
  return jsondata;
}

getList().then((list)=>{
  // console.log(list);
  list.map((obj)=>{
    
    let li=document.createElement("li");
    li.addEventListener('click',(e)=>{
      console.log("clicked",e);
      document.querySelectorAll(".category li").forEach((el)=> el.classList.remove("selected"));
      console.log(dataBooks);
          let result=dataBooks.filter((book)=>{
            return book.list_name.includes(e.target.innerText);
          })
          console.log(result);
          li.classList="selected";
          displayData(result);
          
      
    });
    li.innerText=obj.list_name;
    categories.appendChild(li);
  })
});

let liAll=document.querySelector(".all");
console.log(liAll);

liAll.addEventListener('click',()=>{
  document.querySelectorAll(".category li").forEach((el)=> el.classList.remove("selected"));
  liAll.classList="selected";
  displayData(dataBooks);

})




async function getBooks(){
  let data=await fetch("https://books-backend.p.goit.global/books/top-books");
  let jsondata=await data.json();
  return jsondata;
}

let bookContainer=document.querySelector(".books-container");



getBooks().then((data)=>{

  console.log(data);
  dataBooks=data;
  displayData(data);
  
})



function displayData(data){
  bookContainer.innerHTML=``;
  let parentdiv=document.createElement("div");
  parentdiv.classList="parentdiv";
  data.map((list)=>{
    let p=document.createElement("p");
    p.innerText=list.list_name;
    parentdiv.appendChild(p);
    let outerdiv=document.createElement("div");
    outerdiv.classList="outerdiv";
    list.books.map((book)=>{
      
      let div=document.createElement("div");
      div.classList="innerdiv";
      div.style.position = "relative";
      div.innerHTML=`
         <img src="${book.book_image}" alt="" >
        <p>${book.title}</p>
        <p>${book.author}</p>
        <p class="quick">Quick View</p>
      `;
      outerdiv.appendChild(div);
    
    })
    parentdiv.appendChild(outerdiv);
  })
  bookContainer.appendChild(parentdiv)
}
let body=document.querySelector("body");

let darkLight=document.querySelector(".check");
darkLight.addEventListener("change",()=>{
  console.log(`dark mode is chcked : ${darkLight.checked}`);
  if(darkLight.checked){
    body.classList="dark";
    localStorage.setItem('darkmode','enabled');
  }
  else{
    body.classList.remove("dark");
    localStorage.setItem('darkmode','disabled');
  }
})

window.addEventListener("load",()=>{
  console.log("darkmode",localStorage.getItem("darkmode"));
  
  if(localStorage.getItem("darkmode")==="enabled"){
    body.classList="dark";
  darkLight.checked=true;
  }
    
})

