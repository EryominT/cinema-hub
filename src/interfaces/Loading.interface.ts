// export enum Preloader {
//   loading = 'LOADING',
//   ready = 'READY',
//   empty = 'EMPTY',
//   error = 'ERROR',
// }
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace LoadingInterface {
  export enum LoadingIco {
    ico = `<svg class="ico" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
    <g transform="translate(78,50)">
      <g transform="rotate(0)">
        <circle cx="0" cy="0" r="6" fill="#f1d600" fill-opacity="1">
          <animateTransform attributeName="transform" type="scale" begin="-0.587248322147651s" values="1.34 1.34;1 1" keyTimes="0;1" dur="0.6711409395973155s" repeatCount="indefinite"></animateTransform>
          <animate attributeName="fill-opacity" keyTimes="0;1" dur="0.6711409395973155s" repeatCount="indefinite" values="1;0" begin="-0.587248322147651s"></animate>
        </circle>
      </g>
    </g><g transform="translate(69.79898987322333,69.79898987322332)">
    <g transform="rotate(45)">
      <circle cx="0" cy="0" r="6" fill="#f1d600" fill-opacity="0.875">
        <animateTransform attributeName="transform" type="scale" begin="-0.5033557046979866s" values="1.34 1.34;1 1" keyTimes="0;1" dur="0.6711409395973155s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="0.6711409395973155s" repeatCount="indefinite" values="1;0" begin="-0.5033557046979866s"></animate>
      </circle>
    </g>
  </g><g transform="translate(50,78)">
    <g transform="rotate(90)">
      <circle cx="0" cy="0" r="6" fill="#f1d600" fill-opacity="0.75">
        <animateTransform attributeName="transform" type="scale" begin="-0.41946308724832215s" values="1.34 1.34;1 1" keyTimes="0;1" dur="0.6711409395973155s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="0.6711409395973155s" repeatCount="indefinite" values="1;0" begin="-0.41946308724832215s"></animate>
      </circle>
    </g>
  </g><g transform="translate(30.201010126776673,69.79898987322333)">
    <g transform="rotate(135)">
      <circle cx="0" cy="0" r="6" fill="#f1d600" fill-opacity="0.625">
        <animateTransform attributeName="transform" type="scale" begin="-0.33557046979865773s" values="1.34 1.34;1 1" keyTimes="0;1" dur="0.6711409395973155s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="0.6711409395973155s" repeatCount="indefinite" values="1;0" begin="-0.33557046979865773s"></animate>
      </circle>
    </g>
  </g><g transform="translate(22,50)">
    <g transform="rotate(180)">
      <circle cx="0" cy="0" r="6" fill="#f1d600" fill-opacity="0.5">
        <animateTransform attributeName="transform" type="scale" begin="-0.2516778523489933s" values="1.34 1.34;1 1" keyTimes="0;1" dur="0.6711409395973155s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="0.6711409395973155s" repeatCount="indefinite" values="1;0" begin="-0.2516778523489933s"></animate>
      </circle>
    </g>
  </g><g transform="translate(30.201010126776666,30.201010126776673)">
    <g transform="rotate(225)">
      <circle cx="0" cy="0" r="6" fill="#f1d600" fill-opacity="0.375">
        <animateTransform attributeName="transform" type="scale" begin="-0.16778523489932887s" values="1.34 1.34;1 1" keyTimes="0;1" dur="0.6711409395973155s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="0.6711409395973155s" repeatCount="indefinite" values="1;0" begin="-0.16778523489932887s"></animate>
      </circle>
    </g>
  </g><g transform="translate(49.99999999999999,22)">
    <g transform="rotate(270)">
      <circle cx="0" cy="0" r="6" fill="#f1d600" fill-opacity="0.25">
        <animateTransform attributeName="transform" type="scale" begin="-0.08389261744966443s" values="1.34 1.34;1 1" keyTimes="0;1" dur="0.6711409395973155s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="0.6711409395973155s" repeatCount="indefinite" values="1;0" begin="-0.08389261744966443s"></animate>
      </circle>
    </g>
  </g><g transform="translate(69.79898987322332,30.201010126776666)">
    <g transform="rotate(315)">
      <circle cx="0" cy="0" r="6" fill="#f1d600" fill-opacity="0.125">
        <animateTransform attributeName="transform" type="scale" begin="0s" values="1.34 1.34;1 1" keyTimes="0;1" dur="0.6711409395973155s" repeatCount="indefinite"></animateTransform>
        <animate attributeName="fill-opacity" keyTimes="0;1" dur="0.6711409395973155s" repeatCount="indefinite" values="1;0" begin="0s"></animate>
      </circle>
    </g>
  </g>
  </svg>`,
  }

  export enum LoadingStatus {
    loading = 'LOADING',
    ready = 'READY',
    empty = 'EMPTY',
    error = 'ERROR',
  }
}
