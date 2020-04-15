function sendSms(to, from, body, config) {
  var accountSid = config[1];
  var authToken = config[2];
  var messagesUrl = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

  var payload = {
    "To": to,
    "Body" : body,
    "From" : from
  };

  var options = {
    "method" : "post",
    "payload" : payload
  };

  options.headers = {    
    "Authorization" : "Basic " + Utilities.base64Encode(`${accountSid}:${authToken}`)
  };

  UrlFetchApp.fetch(messagesUrl, options);
}

function sendAll() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var startRow = 7; // First row of data to process
  var rowOffset = 6;
  var numRows = sheet.getLastRow() - rowOffset; // offset config section and headers 
  var dataRange = sheet.getRange(startRow, 1, numRows, 6) 
  var data = dataRange.getValues();
  var config = getConfig();
  console.log(config);

  for (i in data) {
    
    var statusCol = 6;
    var pst = new Date().toLocaleString('en-US', {timeZone: 'America/Los_Angeles'});
    var row = data[i];
    var stopped = row[7];

    if (stopped == 1) {
      sheet.getRange(startRow + Number(i), statusCol).setValue(`stopped - ${pst}`);
    } else {
      var firstName = row[0];
      var link = row[3]
      var homeworkLink = row[4]
      console.log('sending for: ', row);
      
      var to = row[2];
      var from = config[0];
      var body = config[3].replace('[student_name]', firstName).replace('[link]', link).replace('[hw_link]', homeworkLink);
      console.log(body);
      try {
        response_data = sendSms(to, from, body, config);
        status = 'success';
      } catch(err) {
        Logger.log(err);
        status = "error";
      }

      console.log('setting status for row: ', startRow + Number(i))
      sheet.getRange(startRow + Number(i), statusCol).setValue(`${status} - ${pst}`);
    }
    
  }
}

function getConfig() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var startRow = 3; // First row of data to process
  var numRows = 1; // offset config section and headers 
  var dataRange = sheet.getRange(startRow, 1, numRows, 4) 
  return dataRange.getValues()[0];
}
function myFunction() {
  sendAll();
}