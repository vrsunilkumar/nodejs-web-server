const path = require('path')
const express = require('express')
const process = require('process')
const geocode = require('../../weather-app/geocode')
const forecast = require('../../weather-app/forecast')
const exp = require('constants')

console.log(__dirname)
console.log(__filename)
console.log(path.join(__dirname,'../public'))

const publicDirectoryPath = path.join(__dirname,'../public')

const app = express()
const port = process.env.PORT || 3000

app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.send('<h1>Home Page</h1>')
})

app.get('/weather',(req,res)=>{
    console.log('in weather')
    console.log('location: ',req.query.location)
    geocode(req.query.location,(error,{latitude,longitude,location}={}) => {
        console.log('Error',error)
        console.log('Data',latitude+longitude+location)
        if (error) {
            return console.log(error)
        } else {
            forecast(latitude, longitude, (error,frcstdata) => {
                if (error) {
                    return console.log(error)
                } else {
                    console.log('Location', location)
                    console.log('Forecast', frcstdata)
                    res.send({
                        location: location,
                        forecast: frcstdata
                    })
                }
            })    
        }
    })
})

app.get('/products',(req,res)=>{
    console.log(req.query)
    if (!req.query.search) {
        return res.send('Please provide a search string')
    }
    res.send({products: []})
})

app.listen(port,()=>{
    console.log('Server is up and running on port ' + port)
})