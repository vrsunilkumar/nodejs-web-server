//const { response } = require("express")

console.log('CLient side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?location='+location).then((response) => {
     response.json().then((data)=>{
         if(data.error) {
             messageOne.textContent = data.error
             console.log(data.error)
         } else {
             console.log(data.location)
             console.log(data.forecast)
             messageOne.textContent = data.location
             messageTwo.textContent = 'Temperature is ' + data.forecast.temperature + ' and it feels like ' + data.forecast.feelslike
         }
     })
 })

})
