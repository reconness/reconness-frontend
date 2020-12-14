import Typography from 'typography'
import WebFont from 'webfontloader'

WebFont.load({
  google: {
    families: ['Poppins']
  }
})

const typography = new Typography({
  baseFontSize: '11px',
  headerFontFamily: ['Poppins'],
  bodyFontFamily: ['Poppins']
})
export default typography
