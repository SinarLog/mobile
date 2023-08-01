export const getInitials = (fullName) => {
  const allNames = fullName.trim().split(' ')
  const initials = allNames.reduce((acc, curr, index) => {
    if(index === 0 || index === allNames.length - 1){
      acc = `${acc}${curr.charAt(0).toUpperCase()}`
    }
    return acc
  }, '')
  return initials
}

export const getTimeString = (timestamp) => {
  const dateObject = new Date(timestamp)
  const hours = String(dateObject.getUTCHours()).padStart(2, "0");
  const minutes = String(dateObject.getUTCMinutes()).padStart(2, "0");
  const seconds = String(dateObject.getUTCSeconds()).padStart(2, "0");
  const timeString = `${hours}:${minutes}:${seconds}`;

  return timeString // Output: "08:39:28"

}

export const hexToRgbA = (hex, opacity) => {
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = `0x${c.join('')}`;
    return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',')},${opacity})`;
  }
  throw new Error('Bad Hex')
}

export const getCurrentDateTimeAsString = () => {
  const currentDate = new Date();

  // Get the components of the date
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');

  // Get the components of the time
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');
  const seconds = String(currentDate.getSeconds()).padStart(2, '0');

  // Combine the components into a string
  const dateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return dateTimeString;
}

function ConvertDDToDMS(D, lng) {
  // -6.2040805 -> {S, 6, 12, 14.7}
  return {
      dir: D < 0 ? (lng ? "W" : "S") : lng ? "E" : "N",
      deg: 0 | (D < 0 ? (D = -D) : D),
      min: 0 | (((D += 1e-9) % 1) * 60),
      sec: (0 | (((D * 60) % 1) * 6000)) / 100,
  };
}

function ConvertDMSToGoogleDMS(dms) {
  // {S, 6, 12, 14.7} -> 6°12'14.7"S
  let str = ""
  str += dms.deg + "°"
  str += dms.min + "'"
  str += dms.sec + '"'
  str += dms.dir
  return str
}

export const handleGoogleMaps = (latitude,longitude) => {
  // https://www.google.com/maps/place/6°12'14.7"S+106°52'35.5"E/@-6.2040805,106.8765359,20z
  let mapsUrl = "https://www.google.com/maps/"    
  let place = "place/"

  let lat = latitude
  let dmsLat = ConvertDDToDMS(lat, false)
  let strLat = ConvertDMSToGoogleDMS(dmsLat)

  let lng = longitude
  let dmsLng = ConvertDDToDMS(lng, true)
  let strLng = ConvertDMSToGoogleDMS(dmsLng)

  let zoom = 20

  let finalUrl = mapsUrl + place + strLat + "+" + strLng + "/@" + lat + "," + lng + "," + zoom + "z"
  return finalUrl
  // window.open(finalUrl, "_blank")
}