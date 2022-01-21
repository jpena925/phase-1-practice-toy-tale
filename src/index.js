let toyURL = 'http://localhost:3000/toys/'

let addToy = false;


document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

let toyDiv = document.getElementById('toy-collection')
fetch(toyURL)
  .then(res => res.json())
  .then(data => {
    console.log(data)
    data.forEach(toyObj => createToyCard(toyObj))
  })

let form = document.querySelector('form')
form.addEventListener('submit', e => {
  e.preventDefault()
  let toyName = e.target.name.value
  let toyImg = e.target.image.value
  
  let newToy = {
    name: toyName,
    image: toyImg,
    likes: 0
  }
  fetch(toyURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(newToy)
  })
  .then(res => res.json())
  .then(data => createToyCard(newToy))


})

  
  
  //creates toycard from single element
  function createToyCard (element) {
    let toyCard = document.createElement('div')
    toyCard.setAttribute('class', 'card')
    
    let toyNameElement = document.createElement('h2')
    toyNameElement.innerText = element.name

    let toyImgElement = document.createElement('img')
    toyImgElement.src = element.image
    toyImgElement.setAttribute('class', 'toy-avatar')

    let toyLikeElement = document.createElement('p')
    toyLikeElement.innerText = `${element.likes} likes`

    let toyButton = document.createElement('button')
    toyButton.setAttribute('class', 'like-btn')
    toyButton.id = element.id
    toyButton.innerText = 'Like ❤️'
    toyCard.append(toyNameElement, toyImgElement, toyLikeElement, toyButton)
    toyDiv.append(toyCard)

    toyButton.addEventListener('click', e => {
      newNumOfLikes = element.likes + 1
      element.likes = newNumOfLikes
      fetch(`http://localhost:3000/toys/${element.id}`,{
        method: "PATCH",
        headers: {
          "Content-Type": 'application/json',
          Accept: "application/json"
        },
        body: JSON.stringify({
          "likes" : newNumOfLikes
        })
    })
      .then(res => res.json())
      .then(data => updateCard(data))
    })
  }
 


  function updateCard(data){
    let cardsArray = document.getElementsByClassName('card')
    if(data.likes === 1){
      for (let i = 0; i < cardsArray.length; i++){
        if (cardsArray[i].querySelector('h2').textContent === data.name){
          cardsArray[i].querySelector('p').textContent = `${data.likes} like`
        }
      }
    } else {
    for (let i = 0; i < cardsArray.length; i++){
      if (cardsArray[i].querySelector('h2').textContent === data.name){
        cardsArray[i].querySelector('p').textContent = `${data.likes} likes`
      }
    }
      } 
    }


