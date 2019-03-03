import React from 'react'

import Svg, {
  Use,
  Image,
  Path
} from 'react-native-svg';

const SvgComponent = props => (
  <Svg width={24} height={24} {...props}>
    <Path fill="none" d="M0 0h24v24H0z" />
    <Path d="M2 12C2 6.48 6.48 2 12 2s10 4.48 10 10-4.48 10-10 10S2 17.52 2 12zm10 6c3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6 2.69 6 6 6z" />
    <Path fill="none" d="M0 0h24v24H0z" />
  </Svg>
)

// export default SvgComponent


// import { ReactComponent as Logo } from './baseline-trip_origin-24px.svg';
// const SvgComponent = () => (
//   <div>
//     {/* Logo is an actual React component */}
//     <Logo />
//   </div>
// );


export default SvgComponent
