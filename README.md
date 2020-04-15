# Introduction
This is a google sheet + twilio implementation, using pure javascript/gscript.

# Prerequisite
- A twilio account
- Programmable SMS enabled
- A twilio number

# Config
## Note: you do not want to share this sheet publicly, as your twilio details will be exposed.
- Reads configurations from row 3
- A3 - the sender number (you need to obtain this from twilio)
- B3 - Twilio Account SID
- C3 - Twilio Auth Token
- D3 - Message body

# Setup
- First make a google sheet that resembles the screenshot
- Go to "Tools", and then "Script Editor"
- Paste everything from `./src/main.js`
- Add an image/drawing element on the sheet that will serve as your "Send" button.
- Right-click the element, and assign `myFunction` to it.
- Add entries you want to send messages to from rows 7 onwards.

# Other
- You can freely modify the message body and what you want to dynamically insert on to your template.
- Last Sent Date will indicate 3 things:
  - success - <timestamp>
  - error - <timestamp>
  - stopped - <timestamp>
- The "Stoppted" column will mark a row as "stopped" and skip it in the iteration.

# TODO:
- make message body and row columns dynamic