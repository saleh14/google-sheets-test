const account = require('google-auth2-service-account')
const fs = require('fs')
const key = fs.readFileSync('key.pem')
const fetch = require('node-fetch')
const { google } = require('googleapis')
// console.dir(googleAuth)

const apiUrl =
  'https://sheets.googleapis.com/v4/spreadsheets/1fIEKhFIa9aRkGTM5NxesoNWBcG57-zExbkp7JtKNAtI/values/A2:D5'
account.auth(
  key,
  {
    iss: 'google-sheet-account@woven-spring-201311.iam.gserviceaccount.com',
    scope: 'https://www.googleapis.com/auth/spreadsheets'
  },
  function (err, accessToken) {
    const sheets = google.sheets({ version: 'v4' })
    sheets.spreadsheets.values.get(
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
        range: 'Class Data!A2:E'
      },
      (err, { data }) => {
        if (err) return console.log('The API returned an error: ' + err)
        const rows = data.values
        if (rows.length) {
          console.log('Name, Major:')
          // Print columns A and E, which correspond to indices 0 and 4.
          rows.map(row => {
            console.log(`${row[0]}, ${row[4]}`)
          })
        } else {
          console.log('No data found.')
        }
      }
    )

    /*
    fetch(apiUrl, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => {
        if (!response.ok) {
          return response.text().then(err => {
            throw err
          })
        }
        console.dir(response)
      })
      .then(response => {
        // return response.text()
      })
      .catch(err => console.log(err))
  */
  }
)
