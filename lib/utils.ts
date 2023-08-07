// https://mui.com/material-ui/react-avatar/#letter-avatars
function stringToColor(string: string) {
  let hash = 0
  let i

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }

  return color
}

// https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
export function pickTextColorBasedOnBgColorSimple(bgColor: string) {
  var color = bgColor.charAt(0) === '#' ? bgColor.substring(1, 7) : bgColor
  var r = parseInt(color.substring(0, 2), 16) // hexToR
  var g = parseInt(color.substring(2, 4), 16) // hexToG
  var b = parseInt(color.substring(4, 6), 16) // hexToB
  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#000' : '#fff'
}

export function stringAvatar(name: string) {
  const [first, second] = name.split(' ')
  let children

  if (second) {
    children = `${first[0]}${second[0]}`
  } else {
    children = first[0]
  }

  const bgColor = stringToColor(name)
  const textColor = pickTextColorBasedOnBgColorSimple(bgColor)

  return {
    bgColor,
    textColor,
    children,
  }
}
