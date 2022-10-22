<template>
  <svg v-if="name === 'showPassword'" class="ico" xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><switch><g fill="currentColor"><path d="M48 12C16 12 0 48.166 0 48.166S16 84 48 84s48-36 48-36-16-36-48-36zm0 64C26.854 76 13.503 56.118 9.003 48.148 13.5 40.102 26.854 20 48 20c21.15 0 34.502 19.998 38.998 28C82.494 56.016 69.145 76 48 76zm0-44c-8.836 0-16 7.164-16 16 0 8.837 7.164 16 16 16 8.837 0 16-7.163 16-16 0-8.836-7.163-16-16-16zm0 24c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/><path d="M48 12C16 12 0 48.166 0 48.166S16 84 48 84s48-36 48-36-16-36-48-36zm0 64C26.854 76 13.503 56.118 9.003 48.148 13.5 40.102 26.854 20 48 20c21.15 0 34.502 19.998 38.998 28C82.494 56.016 69.145 76 48 76zm0-44c-8.836 0-16 7.164-16 16 0 8.837 7.164 16 16 16 8.837 0 16-7.163 16-16 0-8.836-7.163-16-16-16zm0 24c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/></g></switch></svg>

  <svg v-else-if="name === 'hidePassword'" class="ico" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="transparent" fill-rule="evenodd" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" transform="translate(1 1)"><path d="M16.94 16.94A10.07 10.07 0 0111 19c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M8.9 3.24A9.12 9.12 0 0111 3c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M0 0l22 22"/></g></svg>

  <svg v-else-if="name === 'burger'" class="ico" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="400" height="400" viewBox="0 0 400 400" xml:space="preserve"><g transform="matrix(7.14 0 0 7.14 200 150)"  ><path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: currentColor; fill-rule: nonzero; opacity: 1;"  transform=" translate(-14, -7)" d="M 3 7 C 3 6.44771 3.44772 6 4 6 H 24 C 24.5523 6 25 6.44771 25 7 C 25 7.55229 24.5523 8 24 8 H 4 C 3.44772 8 3 7.55229 3 7 Z" stroke-linecap="round" /></g><g transform="matrix(7.14 0 0 7.14 200 200)" ><path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: currentColor; fill-rule: nonzero; opacity: 1;"  transform=" translate(-14, -14)" d="M 3 14 C 3 13.4477 3.44772 13 4 13 H 24 C 24.5523 13 25 13.4477 25 14 C 25 14.5523 24.5523 15 24 15 H 4 C 3.44772 15 3 14.5523 3 14 Z" stroke-linecap="round" /></g><g transform="matrix(7.14 0 0 7.14 200 250)"  ><path style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-dashoffset: 0; stroke-linejoin: miter; stroke-miterlimit: 4; fill: currentColor; fill-rule: nonzero; opacity: 1;"  transform=" translate(-14, -21)" d="M 4 20 C 3.44772 20 3 20.4477 3 21 C 3 21.5523 3.44772 22 4 22 H 24 C 24.5523 22 25 21.5523 25 21 C 25 20.4477 24.5523 20 24 20 H 4 Z" stroke-linecap="round" /></g></svg>

  <svg v-else-if="name === 'arrow'" class="ico" xmlns="http://www.w3.org/2000/svg" width="11" height="20" viewBox="0 0 11 20"><path fill="currentColor" fill-rule="evenodd" d="M249.366 6538.708c.405.39 1.06.39 1.464 0l8.563-8.264a1.95 1.95 0 0 0 0-2.827l-8.625-8.325a1.063 1.063 0 0 0-1.454-.01.976.976 0 0 0-.011 1.425l7.894 7.617a.975.975 0 0 1 0 1.414l-7.831 7.557a.974.974 0 0 0 0 1.413" transform="translate(-249 -6519)"/></svg>

  <svg  v-else-if="name === 'profile'" class="ico" xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24" data-v-61dd7a3d=""><path fill="none" d="M0 0h24v24H0V0z" data-v-61dd7a3d=""></path><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-1c0-2.66-5.33-4-8-4z" data-v-61dd7a3d="" style="fill: currentcolor;"></path></svg>

  <svg  v-else-if="name === 'close'" class="ico" xmlns="http://www.w3.org/2000/svg" width="1792" height="1792" viewBox="0 0 1792 1792"><path fill="currentColor" d="M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"/></svg>

  <svg v-else-if="name === 'loader'" class="ico" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin:auto; display:block;" width="191px" height="191px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
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
  </svg>

  <svg v-else-if="name === 'star'" class="ico" xmlns="http://www.w3.org/2000/svg" fill="#000"  stroke="#F1D600FF" width="24" height="24" baseProfile="tiny" version="1.2" viewBox="0 0 24 24"><path d="M3.1 11.3l3.6 3.3-1 4.6c-.1.6.1 1.2.6 1.5.2.2.5.3.8.3.2 0 .4 0 .6-.1 0 0 .1 0 .1-.1l4.1-2.3 4.1 2.3s.1 0 .1.1c.5.2 1.1.2 1.5-.1.5-.3.7-.9.6-1.5l-1-4.6c.4-.3 1-.9 1.6-1.5l1.9-1.7.1-.1c.4-.4.5-1 .3-1.5s-.6-.9-1.2-1h-.1l-4.7-.5-1.9-4.3s0-.1-.1-.1c-.1-.7-.6-1-1.1-1-.5 0-1 .3-1.3.8 0 0 0 .1-.1.1L8.7 8.2 4 8.7h-.1c-.5.1-1 .5-1.2 1-.1.6 0 1.2.4 1.6z"/></svg>

  <svg v-else-if="name === 'home'" class="ico" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path fill="currentColor" d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z"/></svg>

  <svg v-else-if="name === 'search'" class="ico" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><path fill="currentColor" d="M46.599 46.599a4.498 4.498 0 0 1-6.363 0l-7.941-7.941C29.028 40.749 25.167 42 21 42 9.402 42 0 32.598 0 21S9.402 0 21 0s21 9.402 21 21c0 4.167-1.251 8.028-3.342 11.295l7.941 7.941a4.498 4.498 0 0 1 0 6.363zM21 6C12.717 6 6 12.714 6 21s6.717 15 15 15c8.286 0 15-6.714 15-15S29.286 6 21 6z"/></svg>

  <svg v-else-if="name === 'chat'" class="ico" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd" stroke="#200E32" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" transform="translate(2 2)"><path fill="currentColor" d="M10.0568181,-3.37507799e-14 C6.54686532,-0.0141015786 3.28556632,1.80703838 1.46050022,4.80034679 C-0.364565872,7.7936552 -0.487081058,11.5223413 1.13756771,14.6286303 L1.33789312,15.0191059 C1.50209106,15.3263704 1.53643729,15.6864194 1.43328617,16.0191043 C1.14742034,16.7783674 0.908488743,17.5544276 0.71783828,18.3429101 C0.71783828,18.7429095 0.832309942,18.9714806 1.26157868,18.9619568 C2.02189879,18.7940564 2.77067506,18.5777416 3.5033154,18.3143388 C3.81886183,18.2274425 4.15437035,18.2475403 4.45724592,18.3714815 C4.73388577,18.5048146 5.29670478,18.8476712 5.31578339,18.8476712 C8.99153503,20.7804333 13.4807954,20.2472199 16.5997521,17.5074142 C19.7187087,14.7676084 20.8198838,10.3899785 19.3676078,6.50403406 C17.9153318,2.6180896 14.211089,0.0305307279 10.0568181,-3.37507799e-14 L10.0568181,-3.37507799e-14 Z"/><circle cx="5.287" cy="10" r="1" fill="#200E32"/><circle cx="10.057" cy="10" r="1" fill="#200E32"/><circle cx="14.826" cy="10" r="1" fill="#200E32"/></g></svg>

  <svg v-else-if="name === 'letter'" class="ico" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" clip-rule="evenodd" viewBox="0 0 64 64"><g transform="translate(-320 -448)"><path fill="currentColor" d="M376 499C377.657 499 379 497.657 379 496L379 495.987C378.996 495.211 378.692 494.449 378.121 493.879L365.657 481.414 355.536 491.536C353.583 493.488 350.417 493.488 348.464 491.536L338.343 481.414 325.879 493.879C325.308 494.449 325.004 495.21 325 495.986L325 496C325 496.796 325.316 497.559 325.879 498.121 326.441 498.684 327.204 499 328 499 331.49 499 376 499 376 499zM379 468.071L367.071 480 379 491.929 379 468.071zM325 491.929L336.929 480 325 468.071 325 491.929z"/><path fill="currentColor" d="M379,464.009L379,464C379,462.343 377.657,461 376,461L328,461C326.343,461 325,462.343 325,464L325,464.009C325.002,464.786 325.307,465.55 325.879,466.121C325.879,466.121 349.879,490.121 349.879,490.121C351.05,491.293 352.95,491.293 354.121,490.121C354.121,490.121 378.121,466.121 378.121,466.121C378.693,465.55 378.998,464.786 379,464.009Z"/></g></svg>

  <svg v-else-if="name === 'plus'" xmlns="http://www.w3.org/2000/svg" class="ico" data-name="Layer 1" viewBox="0 0 31 32"><path fill="currentColor" d="M15.5,26a1,1,0,0,1-1-1V7a1,1,0,0,1,2,0V25A1,1,0,0,1,15.5,26Z"/><path fill="currentColor" d="M24.5,17H6.5a1,1,0,0,1,0-2h18a1,1,0,0,1,0,2Z"/></svg>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Icons',
  props: ['name'],
});
</script>

<style lang="scss" scoped>
.ico {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
}
</style>
