const container=document.querySelector(".container");
const seats=document.querySelectorAll(".row .seat:not(.occupied)");
const count=document.getElementById("count");
const total=document.getElementById("total");
const movie=document.getElementById("movie");

populateUI();

let ticketPrice=+movie.value;



function setmovieData(movieIndex,moviePrice){
    localStorage.setItem("selected movie index",movieIndex);
    localStorage.setItem("selected movie price",moviePrice);
}


function updateSelecetdCount(){
    const scount=document.querySelectorAll(".row .seat.selected");
    const seatindex=[...scount].map(seat=>[...seats].indexOf(seat));
    localStorage.setItem('selectedseats',JSON.stringify(seatindex));
    const length=scount.length;
    // console.log(length);

    count.innerHTML=length;
    total.innerHTML=length*ticketPrice;
}
//populate the ui with data from local storage

function populateUI(){
    const selectedSeats=JSON.parse(localStorage.getItem('selectedseats'));
    if(selectedSeats!==null&&selectedSeats.length>-0){
        seats.forEach((seat,index)=>{
            if(selectedSeats.indexOf(index)>-1){
                seat.classList.add("selected");
            }
        });
    }
    const selectedmovieindex=localStorage.getItem('selectedmovieindex');

    if(selectedmovieindex!==null){
        movie.selectedIndex=selectedmovieindex;
    }
}

//select eventlistener
movie.addEventListener('change',(e)=>{
    ticketPrice=+e.target.value;
    //selectedIndex returns the index of the option selected from the list
    updateSelecetdCount();
    setmovieData(e.target.selectedIndex,e.target.value);
    
})

//event listeners

container.addEventListener("click",(e)=>{
    e.preventDefault();
    if(e.target.classList.contains('seat')&&!e.target.classList.contains('occupied')){
        e.target.classList.add("selected");
    }
    updateSelecetdCount();
});

//initial count and total set
updateSelecetdCount();