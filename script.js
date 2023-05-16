function generatePassword(length, uppercase, numbers, symbols, cyrillic) {
  var password = "";

  var uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  var numberChars = "0123456789";
  var symbolChars = "!@#$%^&*()_+-=[]{};:,.<>?";
  var cyrillicChars = "абвгдеєжзиіїйклмнопрстуфхцчшщьюя";

  var chars = lowercaseChars;
  if (uppercase) chars += uppercaseChars;
  if (numbers) chars += numberChars;
  if (symbols) chars += symbolChars;
  if (cyrillic) chars += cyrillicChars;

  function getRandomValues(length) {
    var buffer = new Uint8Array(length);
    window.crypto.getRandomValues(buffer);
    return buffer;
  }

  for (var i = 0; i < length; i++) {
    var index;
    do {
      var randomValue = getRandomValues(1)[0];
      index = randomValue % chars.length;
    } while (randomValue - index + (chars.length - 1) < 0);
    password += chars[index];
  }

  return password;
}

function generate() {
  var length = parseInt(document.getElementById("length").value);
  var uppercase = document.getElementById("uppercase").checked;
  var numbers = document.getElementById("numbers").checked;
  var symbols = document.getElementById("symbols").checked;
  var cyrillic = document.getElementById("cyrillic").checked;
  var password = generatePassword(length, uppercase, numbers, symbols, cyrillic);

  var passwordField = document.getElementById("password");
  passwordField.value = password;
}

function copyPassword() {
  var password = document.getElementById("password");
  password.select();
  document.execCommand("copy");
  alert("Пароль скопійовано в буфер обміну");
}

function generateGoogleCalendarLink() {
var startTime = new Date();
startTime.setDate(startTime.getDate());
var endTime = new Date(startTime);
endTime.setHours(endTime.getHours() + 1);

var title = "Час змінити пароль";
var description = "Це нагадування про те, що потрібно змінити свій пароль кожні 30 днів. Генератор паролів Держспецзв’язку: <a href=\"https://pass.cip.gov.ua\">https://pass.cip.gov.ua</a>";
var location = "Онлайн";

var baseUrl = "https://www.google.com/calendar/render?action=TEMPLATE";
var params = [
"text=" + encodeURIComponent(title),
"dates=" + startTime.toISOString().replace(/-|:|.\d+/g, ""),
"/" + endTime.toISOString().replace(/-|:|.\d+/g, ""),
"details=" + encodeURIComponent(description),
"location=" + encodeURIComponent(location),
"sf=true",
"recur=RRULE:FREQ=DAILY;INTERVAL=30;COUNT=12",
"output=xml"
];
var url = baseUrl + "&" + params.join("&");
return url;
}

function showGoogleCalendarLink() {
  var link = generateGoogleCalendarLink();
  var div = document.getElementById("calendar-link");
  div.innerHTML = "<a href='" + link + "'>Додати подію у календар</a>";
}

function toggleRecommendations() {
  var recoDiv = document.getElementById("reco");
  if (recoDiv.style.display === "none") {
    recoDiv.style.display = "block";
  } else {
    recoDiv.style.display = "none";
  }
}
