console.log('Client side javascript file is loaded!')


const apiCall = (search, callback) => {
    if (!search) {
        return { error: 'Provide a search term' }
    }
    fetch('http://localhost:3000/weather?address=' + search).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                callback(data.error, undefined)
            }
            else {
                callback(undefined, data)
            }

        })
    })
}

const form = document.querySelector('form')
const search = document.querySelector('input')
let address= document.querySelector('#address')
let weather = document.querySelector('#weather')
address.textContent = ''
weather.textContent = ''
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    if (search.value != ''){
        address.textContent = 'Searching Location'
        weather.textContent = ''
        apiCall(location, (error, success) => {
            if (error) {
                address.textContent = error
            }
           address.textContent = success.location
           weather.textContent = success.forecast
        })
    }
})
