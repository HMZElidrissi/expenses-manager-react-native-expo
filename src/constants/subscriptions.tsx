import React from 'react';

interface Props {
  width: number;
  height: number;
}

function NetflixSvg(props: Props) {
  const { width, height } = props;

  return (
    <svg height={height} viewBox="124.528 16 262.944 480" width={width} xmlns="http://www.w3.org/2000/svg">
      <linearGradient id="a" gradientUnits="userSpaceOnUse" x1="108.142" x2="176.518" y1="240.643" y2="189.038">
        <stop offset="0" stopColor="#c20000" stopOpacity="0" />
        <stop offset="1" stopColor="#9d0000" />
      </linearGradient>
      <linearGradient id="b" x1="400.786" x2="338.861" xlinkHref="#a" y1="312.035" y2="337.837" />
      <path d="m216.398 16h-91.87v480c30.128-7.135 61.601-10.708 91.87-12.052z" fill="#c20000" />
      <path d="m216.398 16h-91.87v367.267c30.128-7.135 61.601-10.707 91.87-12.051z" fill="url(#a)" />
      <path d="m387.472 496v-480h-91.87v468.904c53.636 3.416 91.87 11.096 91.87 11.096z" fill="#c20000" />
      <path d="m387.472 496v-318.555h-91.87v307.459c53.636 3.416 91.87 11.096 91.87 11.096z" fill="url(#b)" />
      <path d="m387.472 496-171.074-480h-91.87l167.03 468.655c55.75 3.276 95.914 11.345 95.914 11.345z"
            fill="#fa0000" />
    </svg>
  );
}

function SpotifySvg(props: Props) {
  const { width, height } = props;

  return (
    <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2931 2931" width={width} height={height}>
      <path className="st0"
            d="M1465.5 0C656.1 0 0 656.1 0 1465.5S656.1 2931 1465.5 2931 2931 2274.9 2931 1465.5C2931 656.2 2274.9.1 1465.5 0zm672.1 2113.6c-26.3 43.2-82.6 56.7-125.6 30.4-344.1-210.3-777.3-257.8-1287.4-141.3-49.2 11.3-98.2-19.5-109.4-68.7-11.3-49.2 19.4-98.2 68.7-109.4C1242.1 1697.1 1721 1752 2107.3 1988c43 26.5 56.7 82.6 30.3 125.6zm179.3-398.9c-33.1 53.8-103.5 70.6-157.2 37.6-393.8-242.1-994.4-312.2-1460.3-170.8-60.4 18.3-124.2-15.8-142.6-76.1-18.2-60.4 15.9-124.1 76.2-142.5 532.2-161.5 1193.9-83.3 1646.2 194.7 53.8 33.1 70.8 103.4 37.7 157.1zm15.4-415.6c-472.4-280.5-1251.6-306.3-1702.6-169.5-72.4 22-149-18.9-170.9-91.3-21.9-72.4 18.9-149 91.4-171 517.7-157.1 1378.2-126.8 1922 196 65.1 38.7 86.5 122.8 47.9 187.8-38.5 65.2-122.8 86.7-187.8 48z"
            fill="#2ebd59" />
    </svg>
  );
}

function ClaudeSvg(props: Props) {
  const { width, height } = props;

  return (
    <svg height={height} style={{ flex: 'none', lineHeight: 1 }} viewBox="0 0 24 24" width={width}
         xmlns="http://www.w3.org/2000/svg"><title>Claude</title>
      <path
        d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z"
        fill="#D97757" fillRule="nonzero"></path>
    </svg>
  );
}

function OpenAiSvg(props: Props) {
  const { width, height } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320" width={width} height={height}>
      <path
        d="m297.06 130.97c7.26-21.79 4.76-45.66-6.85-65.48-17.46-30.4-52.56-46.04-86.84-38.68-15.25-17.18-37.16-26.95-60.13-26.81-35.04-.08-66.13 22.48-76.91 55.82-22.51 4.61-41.94 18.7-53.31 38.67-17.59 30.32-13.58 68.54 9.92 94.54-7.26 21.79-4.76 45.66 6.85 65.48 17.46 30.4 52.56 46.04 86.84 38.68 15.24 17.18 37.16 26.95 60.13 26.8 35.06.09 66.16-22.49 76.94-55.86 22.51-4.61 41.94-18.7 53.31-38.67 17.57-30.32 13.55-68.51-9.94-94.51zm-120.28 168.11c-14.03.02-27.62-4.89-38.39-13.88.49-.26 1.34-.73 1.89-1.07l63.72-36.8c3.26-1.85 5.26-5.32 5.24-9.07v-89.83l26.93 15.55c.29.14.48.42.52.74v74.39c-.04 33.08-26.83 59.9-59.91 59.97zm-128.84-55.03c-7.03-12.14-9.56-26.37-7.15-40.18.47.28 1.3.79 1.89 1.13l63.72 36.8c3.23 1.89 7.23 1.89 10.47 0l77.79-44.92v31.1c.02.32-.13.63-.38.83l-64.41 37.19c-28.69 16.52-65.33 6.7-81.92-21.95zm-16.77-139.09c7-12.16 18.05-21.46 31.21-26.29 0 .55-.03 1.52-.03 2.2v73.61c-.02 3.74 1.98 7.21 5.23 9.06l77.79 44.91-26.93 15.55c-.27.18-.61.21-.91.08l-64.42-37.22c-28.63-16.58-38.45-53.21-21.95-81.89zm221.26 51.49-77.79-44.92 26.93-15.54c.27-.18.61-.21.91-.08l64.42 37.19c28.68 16.57 38.51 53.26 21.94 81.94-7.01 12.14-18.05 21.44-31.2 26.28v-75.81c.03-3.74-1.96-7.2-5.2-9.06zm26.8-40.34c-.47-.29-1.3-.79-1.89-1.13l-63.72-36.8c-3.23-1.89-7.23-1.89-10.47 0l-77.79 44.92v-31.1c-.02-.32.13-.63.38-.83l64.41-37.16c28.69-16.55 65.37-6.7 81.91 22 6.99 12.12 9.52 26.31 7.15 40.1zm-168.51 55.43-26.94-15.55c-.29-.14-.48-.42-.52-.74v-74.39c.02-33.12 26.89-59.96 60.01-59.94 14.01 0 27.57 4.92 38.34 13.88-.49.26-1.33.73-1.89 1.07l-63.72 36.8c-3.26 1.85-5.26 5.31-5.24 9.06l-.04 89.79zm14.63-31.54 34.65-20.01 34.65 20v40.01l-34.65 20-34.65-20z"
        fill="#74aa9c" />
    </svg>
  );
}

function NamecheapSvg(props: Props) {
  const { width, height } = props;

  return (
    <svg width={width} height={height} viewBox="0 0 256 142" xmlns="http://www.w3.org/2000/svg"
         preserveAspectRatio="xMidYMid">
      <defs>
        <linearGradient x1="13.322%" y1="94.945%" x2="82.62%" y2="1.132%" id="a">
          <stop stopColor="#D4202C" offset="0%" />
          <stop stopColor="#D82D2B" stopOpacity=".958" offset="4.166%" />
          <stop stopColor="#E25226" stopOpacity=".824" offset="17.6%" />
          <stop stopColor="#EB7123" stopOpacity=".683" offset="31.67%" />
          <stop stopColor="#F28920" stopOpacity=".536" offset="46.35%" />
          <stop stopColor="#F69A1E" stopOpacity=".381" offset="61.88%" />
          <stop stopColor="#F9A41D" stopOpacity=".211" offset="78.86%" />
          <stop stopColor="#FAA71D" stopOpacity="0" offset="100%" />
        </linearGradient>
        <linearGradient x1="86.624%" y1="5.04%" x2="17.326%" y2="98.855%" id="b">
          <stop stopColor="#D4202C" offset="0%" />
          <stop stopColor="#D82D2B" stopOpacity=".958" offset="4.166%" />
          <stop stopColor="#E25226" stopOpacity=".824" offset="17.6%" />
          <stop stopColor="#EB7123" stopOpacity=".683" offset="31.67%" />
          <stop stopColor="#F28920" stopOpacity=".536" offset="46.35%" />
          <stop stopColor="#F69A1E" stopOpacity=".381" offset="61.88%" />
          <stop stopColor="#F9A41D" stopOpacity=".211" offset="78.86%" />
          <stop stopColor="#FAA71D" stopOpacity="0" offset="100%" />
        </linearGradient>
      </defs>
      <path
        d="M232 0c-9 0-16.8 5-20.9 12.3l-.5 1-18.8 37L168 97.2l15.6 30.7.9 1.7c2.4 4.2 6 7.7 10.4 9.8 4.4-2.2 8-5.6 10.4-9.8l.9-1.7 46.7-92 1.1-2.2c1.3-3 2-6.2 2-9.7 0-13.3-10.7-24-24-24zM87.9 44.6L72.4 14l-.9-1.7c-2.4-4.2-6-7.7-10.4-9.8-4.4 2.2-8 5.6-10.4 9.8l-.8 1.7-46.7 92-1.1 2.2c-1.3 3-2 6.2-2 9.7 0 13.2 10.7 24 24 24 9 0 16.8-5 20.9-12.3l.5-1 18.8-37L88 44.7l-.1-.1z"
        fill="#FF5000" />
      <path
        d="M232 0c-9 0-16.9 5-20.9 12.3l-.5 1-18.8 37L168 97.2l15.6 30.7.9 1.7c2.4 4.2 6 7.7 10.4 9.8 4.4-2.2 8-5.6 10.4-9.8l.9-1.7 46.7-92 1.1-2.2c1.3-3 2-6.2 2-9.7 0-13.3-10.8-24-24-24z"
        fill="url(#a)" />
      <path
        d="M24 141.9c9 0 16.9-5 20.9-12.3l.5-1 18.8-37L88 44.7 72.4 14l-.9-1.7c-2.4-4.2-6-7.7-10.4-9.8-4.4 2.2-8 5.6-10.4 9.8l-.8 1.7-46.7 92-1.2 2.3c-1.3 3-2 6.2-2 9.7 0 13.2 10.7 23.9 24 23.9z"
        fill="url(#b)" />
      <path
        d="M87.9 44.6L72.4 14l-.9-1.7c-2.4-4.2-6-7.7-10.4-9.8 1.4-.7 3-1.3 4.5-1.7 1.9-.5 4-.8 6-.8H104.4c9 .1 16.8 5 20.9 12.3l.7 1.7 42.1 83.3 15.5 30.6.9 1.7c2.4 4.2 6 7.7 10.4 9.8-1.4.7-3 1.3-4.5 1.7-1.9.5-4 .8-6.1.8H151.7c-9-.1-16.8-5-20.9-12.3l-.9-1.7-42-83.3z"
        fill="#FF8C44" />
    </svg>
  );
}

function GymSvg(props: Props) {
  const { width, height } = props;

  return (
    <svg height={height} viewBox="264 330.5 513 104.5" width={width} xmlns="http://www.w3.org/2000/svg">
      <path
        d="m583.2 334.1c-13.8 2.7-24.5 12.5-28.7 26.4-6.6 22.2 2.4 46.9 20.3 55.3 4.8 2.3 7.1 2.7 14.2 2.7 10.1 0 14.9-1.5 20.1-6.2l3.9-3.5v8.2h14v-43h-34.1l.3 6.2.3 6.3 8.8.3c9.9.3 10.1.6 6.8 7.8-4 8.9-16.1 12.9-25.6 8.5-9-4.1-14-14-13.8-27.6.2-15 6.4-24.9 17.3-27.5 8.5-2 18.2 2.2 21.7 9.6l1.7 3.4h8.3c4.6 0 8.3-.4 8.3-1 0-.5-.9-3.4-2-6.4-5.5-14.6-23.7-23.1-41.8-19.5zm-275.6 2.1c-6.7 10.2-9 23.2-9.1 49.7 0 18.8-.1 20-1.3 15-1.8-7.6-1-41.4 1.2-48.9.9-3 1.6-5.6 1.6-5.8 0-.1-2.2-.2-5-.2-3.6 0-5.4.5-6.7 2-4.8 5-7.9 23.8-7.1 42.8.4 10.6.4 11.3-.8 7.5-2.8-9.4-2.7-22.5.2-39.6l.7-3.7h-4.2c-2.7 0-4.7.6-6 1.9-6.7 6.7-7.1 44.8-.5 54.8 1.2 2 2.3 2.3 7.7 2.3l6.2.1 2 4.2 2 4.2 7.1.3c7 .3 7 .3 8.2 3.6.7 1.9 2.2 4.6 3.3 6 1.9 2.5 2.5 2.6 11.3 2.6 8.5 0 9.4-.2 11.5-2.4 3.4-3.6 7.1-16.7 8.3-29.3l1.1-11.3h3.9c3.8 0 3.8 0 3.8-3.9 0-2.1.3-5.2.6-6.9l.6-3.1-7.3-.3c-7.2-.3-10.2-2-4.6-2.6 1.5-.2 2.7-.9 2.7-1.5-.2-12.8-4.5-31-8.6-36.5l-2.5-3.2h-9.4c-8.7 0-9.6.2-10.9 2.2zm13.8 5.3c-6.3 15.2-6.3 70.9.1 86.2 1.5 3.5 1.5 3.7 0 2.2-2.8-2.7-5.5-15.6-6.7-30.9-1.6-22.7.9-48.8 5.8-58.2 2.1-4 2.6-3.5.8.7zm151.2-5.9c-4.1 4-8.3 18.2-9.3 31.5l-.6 7.9h2.7c1.8 0 2.6.5 2.4 1.2-.3.9-3 1.4-7.7 1.6-6.1.2-7.2.5-6.7 1.8.3.9.6 4 .6 7v5.4h8.7l.6 9.2c.7 11.1 3.7 23.5 7.2 29.5l2.6 4.3h9.9c9.6 0 9.9-.1 11.8-2.8 1-1.5 2.4-4.2 3.1-6 1.3-3.2 1.4-3.2 8.2-3.2h6.9l2.2-4.5 2.2-4.4 6.5-.3c6.4-.3 6.6-.4 8.3-3.8 4.6-9.6 5.1-37.2 1-47.9-2.5-6.4-3.3-7.1-9-7.1-3.7 0-4.3.3-3.8 1.7 2.9 9.7 3.6 32.1 1.2 40.8-1.3 4.8-1.4 4.5-.9-7 .7-16.8-1.9-34.6-6.1-40.7-1.9-2.9-2.7-3.3-7.5-3.6-5.2-.3-5.3-.2-4.7 2 2.4 8.1 3.8 24.2 3.2 37.3-.9 22.5-2.1 22.7-2.2.3 0-17.2-.4-21.9-2.3-30.8-1.2-5.8-3.4-12.7-4.9-15.5l-2.7-5-9.6-.3c-7.9-.2-10 0-11.3 1.4zm11.3 13.2c4.1 15.3 4.4 53.3.6 69.9-1.3 5.5-4 12.3-4.8 12.3-.2 0 .8-4.2 2.1-9.3 2.1-7.9 2.5-12.2 2.9-30.5.6-22.6-.4-35.1-3.7-47-1.3-4.6-1.4-6.1-.5-4.9.7 1 2.3 5.3 3.4 9.5zm141.9-9.6c1 1.8 7.4 13.2 14.1 25.4l12.1 22.1v30.4l8.3-.3 8.2-.3.5-16 .5-16 4.6-8.5c2.5-4.7 7-13 9.9-18.5s6.6-12.3 8.1-15.1c1.6-2.8 2.9-5.4 2.9-5.8s-4.4-.5-9.7-.4l-9.7.3-7.1 15.4c-3.9 8.4-7.4 15.3-7.9 15.3s-4.5-7.1-8.9-15.6l-8.1-15.6h-19.8zm73.2 37.3v40.5h15v-26.7c0-14.6.2-26.4.5-26.1.3.2 1.8 5.2 3.4 10.9 5.3 19.1 11.1 40.9 11.1 41.4 0 .3 3.8.5 8.4.5h8.3l4.1-14.8c2.2-8.1 5.6-20.1 7.4-26.7l3.3-12 .3 26.8.2 26.8 7.8-.3 7.7-.3.3-40.3.2-40.2h-24.7l-4.1 16.7c-2.2 9.3-5.3 22.1-6.9 28.5-1.5 6.5-3 11.8-3.3 11.8-.7 0-1-1.2-8.6-32.8l-5.9-24.2h-24.5z" />
    </svg>
  );
}

function OfficeSvg(props: Props) {
  const { width, height } = props;

  return (
    <svg height={height} viewBox="0 0 78.799 96" width={width} xmlns="http://www.w3.org/2000/svg">
      <linearGradient id="a" gradientUnits="userSpaceOnUse" x1="16.942" x2="85.671" y1="83.36" y2="89.583">
        <stop offset="0" stopColor="#f32b44" />
        <stop offset=".6" stopColor="#a4070a" />
      </linearGradient>
      <linearGradient id="b">
        <stop offset="0" stopOpacity=".4" />
        <stop offset="1" stopOpacity="0" />
      </linearGradient>
      <linearGradient id="c" gradientUnits="userSpaceOnUse" x1="63.515" x2="33.003" xlinkHref="#b" y1="87.298"
                      y2="84.535" />
      <linearGradient id="d" gradientUnits="userSpaceOnUse" x1="44.738" x2="-5.901" y1="-3.312" y2="71.527">
        <stop offset="0" stopColor="#800600" />
        <stop offset=".6" stopColor="#c72127" />
        <stop offset=".728" stopColor="#c13959" />
        <stop offset=".847" stopColor="#bc4b81" />
        <stop offset=".942" stopColor="#b95799" />
        <stop offset="1" stopColor="#b85ba2" />
      </linearGradient>
      <linearGradient id="e" gradientUnits="userSpaceOnUse" x1="45.823" x2="35.099" xlinkHref="#b" y1="-4.81"
                      y2="11.039" />
      <linearGradient id="f" gradientUnits="userSpaceOnUse" x1="61.486" x2="61.486" y1="-4.887" y2="88.781">
        <stop offset="0" stopColor="#ffb900" />
        <stop offset=".166" stopColor="#ef8400" />
        <stop offset=".313" stopColor="#e25c01" />
        <stop offset=".429" stopColor="#db4401" />
        <stop offset=".5" stopColor="#d83b01" />
      </linearGradient>
      <path
        d="m19.143 75.558c-2.724 0-4.945 2.121-4.945 4.753 0 1.789 1.031 3.322 2.565 4.14l19.118 10.246a10.11 10.11 0 0 0 4.969 1.303c1.164 0 2.275-.204 3.306-.562l6.531-1.814v-18.091c.027.025-31.519.025-31.545.025z"
        fill="url(#a)" />
      <path
        d="m19.143 75.558c-2.724 0-4.945 2.121-4.945 4.753 0 1.789 1.031 3.322 2.565 4.14l19.118 10.246a10.11 10.11 0 0 0 4.969 1.303c1.164 0 2.275-.204 3.306-.562l6.531-1.814v-18.091c.027.025-31.519.025-31.545.025z"
        fill="url(#c)" />
      <path
        d="m43.736.383a9.968 9.968 0 0 0 -2.777-.383c-1.56 0-3.12.307-4.522 1.022-.29.128-31.096 16.864-31.096 16.864-.423.205-.82.46-1.19.716-.052.025-.079.051-.132.077-.238.178-.45.357-.687.536-.106.077-.212.18-.291.256-.132.127-.265.255-.37.383-.37.383-1.005 1.2-1.005 1.2a9.15 9.15 0 0 0 -1.666 5.291v44.46c0 2.633 2.221 4.754 4.945 4.754.687 0 1.322-.128 1.904-.384l8.805-4.778c1.586-.766 2.856-2.07 3.517-3.68.158-.332.29-.74.37-1.15.026-.102.053-.23.053-.332 0-.05.026-.127.026-.178.027-.18.053-.384.053-.562 0-.154.027-.282.027-.435v-23.662-7.385c0-2.07.925-3.935 2.38-5.238 0 0-.688.613 0 0 .687-.613 1.586-1.15 2.644-1.507 1.057-.384 26.072-9.122 26.072-9.122v-14.744z"
        fill="url(#d)" />
      <path
        d="m43.736.383a9.968 9.968 0 0 0 -2.777-.383c-1.56 0-3.12.307-4.522 1.022-.29.128-31.096 16.864-31.096 16.864-.423.205-.82.46-1.19.716-.052.025-.079.051-.132.077-.238.178-.45.357-.687.536-.106.077-.212.18-.291.256-.132.127-.265.255-.37.383-.37.383-1.005 1.2-1.005 1.2a9.15 9.15 0 0 0 -1.666 5.291v44.46c0 2.633 2.221 4.754 4.945 4.754.687 0 1.322-.128 1.904-.384l8.805-4.778c1.586-.766 2.856-2.07 3.517-3.68.158-.332.29-.74.37-1.15.026-.102.053-.23.053-.332 0-.05.026-.127.026-.178.027-.18.053-.384.053-.562 0-.154.027-.282.027-.435v-23.662-7.385c0-2.07.925-3.935 2.38-5.238 0 0-.688.613 0 0 .687-.613 1.586-1.15 2.644-1.507 1.057-.384 26.072-9.122 26.072-9.122v-14.744z"
        fill="url(#e)" />
      <path
        d="m71.898 8.35-27.738-7.843c4.019 1.508 6.53 4.906 6.53 9.046 0 0-.025 75.2 0 77.014.027 4.088-2.67 7.589-6.53 8.892.846-.23 27.738-7.717 27.738-7.717 3.992-1.226 6.875-4.804 6.875-9.07v-61.252c.026-4.24-2.883-7.844-6.875-9.07z"
        fill="url(#f)" />
    </svg>
  );
}

function CanvaSvg(props: Props) {
  const { width, height } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 508 508" fillRule="evenodd" clipRule="evenodd"
         strokeLinejoin="round" strokeMiterlimit="2" width={width} height={height}>
      <g transform="matrix(.26718 0 0 .26718 0 0)">
        <circle cx="950" cy="950" r="950" fill="#7d2ae7" />
        <circle cx="950" cy="950" r="950" fill="url(#prefix___Radial1)" />
        <circle cx="950" cy="950" r="950" fill="url(#prefix___Radial2)" />
        <circle cx="950" cy="950" r="950" fill="url(#prefix___Radial3)" />
        <circle cx="950" cy="950" r="950" fill="url(#prefix___Radial4)" />
      </g>
      <path
        d="M446.744 276.845c-.665 0-1.271.43-1.584 1.33-4.011 11.446-9.43 18.254-13.891 18.254-2.563 0-3.6-2.856-3.6-7.336 0-11.21 6.71-34.982 10.095-45.82.392-1.312.646-2.485.646-3.483 0-3.15-1.722-4.696-5.987-4.696-4.598 0-9.547 1.8-14.36 10.233-1.663-7.435-6.691-10.683-13.715-10.683-8.12 0-15.965 5.224-22.421 13.696-6.456 8.471-14.048 11.25-19.76 9.88 4.108-10.057 5.634-17.57 5.634-23.145 0-8.746-4.324-14.028-11.308-14.028-10.624 0-16.747 10.134-16.747 20.797 0 8.237 3.736 16.708 11.954 20.817-6.887 15.573-16.943 29.66-20.758 29.66-4.93 0-6.379-24.123-6.105-41.38.176-9.9.998-10.408.998-13.401 0-1.722-1.115-2.896-5.595-2.896-10.448 0-13.676 8.844-14.165 18.998a50.052 50.052 0 01-1.8 11.406c-4.363 15.573-13.363 27.39-19.232 27.39-2.72 0-3.463-2.72-3.463-6.28 0-11.21 6.28-25.219 6.28-37.173 0-8.784-3.854-14.34-11.112-14.34-8.55 0-19.858 10.173-30.56 29.229 3.521-14.595 4.97-28.721-5.459-28.721a14.115 14.115 0 00-6.476 1.683 3.689 3.689 0 00-2.113 3.56c.998 15.535-12.521 55.329-25.336 55.329-2.328 0-3.463-2.524-3.463-6.593 0-11.23 6.691-34.943 10.056-45.801.43-1.409.666-2.622.666-3.678 0-2.974-1.84-4.5-6.007-4.5-4.578 0-9.547 1.741-14.34 10.174-1.683-7.435-6.711-10.683-13.735-10.683-11.523 0-24.397 12.19-30.051 28.076-7.572 21.208-22.832 41.692-43.375 41.692-18.645 0-28.486-15.515-28.486-40.03 0-35.392 25.982-64.308 45.253-64.308 9.215 0 13.617 5.869 13.617 14.869 0 10.897-6.085 15.964-6.085 20.112 0 1.272 1.057 2.524 3.15 2.524 8.374 0 18.234-9.841 18.234-23.262 0-13.422-10.897-23.243-30.168-23.243-31.851 0-63.898 32.047-63.898 73.113 0 32.673 16.121 52.374 44 52.374 19.017 0 35.628-14.79 44.588-32.047 1.018 14.302 7.513 21.776 17.413 21.776 8.804 0 15.925-5.243 21.364-14.458 2.094 9.645 7.65 14.36 14.87 14.36 8.275 0 15.201-5.243 21.794-14.986-.097 7.65 1.644 14.85 8.276 14.85 3.13 0 6.867-.725 7.533-3.464 6.984-28.877 24.24-52.453 29.523-52.453 1.565 0 1.995 1.507 1.995 3.287 0 7.846-5.537 23.928-5.537 34.2 0 11.092 4.716 18.43 14.459 18.43 10.8 0 21.775-13.227 29.092-32.556 2.29 18.058 7.24 32.633 14.987 32.633 9.508 0 26.392-20.014 36.625-41.203 4.01.509 10.036.372 15.827-3.717-2.465 6.241-3.912 13.07-3.912 19.897 0 19.663 9.39 25.18 17.47 25.18 8.785 0 15.907-5.243 21.365-14.458 1.8 8.315 6.398 14.34 14.85 14.34 13.225 0 24.71-13.519 24.71-24.612 0-2.934-1.252-4.715-2.72-4.715zm-274.51 18.547c-5.342 0-7.435-5.38-7.435-13.401 0-13.93 9.528-37.193 19.604-37.193 4.402 0 6.065 5.185 6.065 11.524 0 14.145-9.059 39.07-18.235 39.07zm182.948-41.574c-3.189-3.796-4.343-8.961-4.343-13.559 0-5.673 2.074-10.467 4.558-10.467 2.485 0 3.248 2.446 3.248 5.85 0 5.693-2.035 14.008-3.463 18.176zm41.418 41.574c-5.34 0-7.434-6.182-7.434-13.401 0-13.441 9.528-37.193 19.682-37.193 4.402 0 5.967 5.146 5.967 11.524 0 14.145-8.902 39.07-18.215 39.07z"
        fill="#fff" fillRule="nonzero" />
      <defs>
        <radialGradient id="prefix___Radial1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                        gradientTransform="scale(1469.491) rotate(-49.416 1.37 .302)">
          <stop offset="0" stopColor="#6420ff" />
          <stop offset="1" stopColor="#6420ff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="prefix___Radial2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                        gradientTransform="rotate(54.703 42.717 594.194) scale(1657.122)">
          <stop offset="0" stopColor="#00c4cc" />
          <stop offset="1" stopColor="#00c4cc" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="prefix___Radial3" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                        gradientTransform="matrix(1023 -1030 473.711 470.491 367 1684)">
          <stop offset="0" stopColor="#6420ff" />
          <stop offset="1" stopColor="#6420ff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="prefix___Radial4" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                        gradientTransform="matrix(595.999 1372 -2298.41 998.431 777 256)">
          <stop offset="0" stopColor="#00c4cc" stopOpacity=".73" />
          <stop offset="0" stopColor="#00c4cc" />
          <stop offset="1" stopColor="#00c4cc" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function GoogleSvg(props: Props) {
  const { width, height } = props;

  return (
    <svg viewBox="-49.6 -163.7 265.2 525" xmlns="http://www.w3.org/2000/svg" width={width} height={height}>
      <path
        d="M154.8-27.6c12.9-10.8 25.6-21.8 38.6-32.5 11.4-9.4 17.2-22 21.1-35.7.1.9.2 1.8.2 2.7V248c0 .9-.1 1.8-.2 2.7-.8-.4-1.6-.7-2.3-1.2-37.5-31.5-75-63-112.5-94.6v-136"
        fill="#4285f4" />
      <path
        d="M99.7 22.5v-3.3c0-34.7.4-69.3-.2-104-.3-19.4.9-37.9 13.5-53.8-.6.3-1.3.6-1.8 1C67.5-100.8 23.8-64-19.9-27.3-42.8-8-49.6 21-37 45.7-25 69.2 1.6 81 27.9 74.8c19.2-4.5 31.5-19.2 46-30.7z"
        fill="#fbbc05" />
      <path
        d="M99.7 154.7c37.5 31.5 75 63.1 112.5 94.6.6.5 1.5.8 2.3 1.2-1 22.8 1.1 46.2-3.7 68.1-5.9 27.1-35.5 42.7-62.8 38.1-28-4.8-48.3-28.5-48.3-56.6-.1-48.4 0-96.9 0-145.4z"
        fill="#34a853" />
      <path
        d="M99.7 22.4v-3.3c0-34.7.4-69.3-.2-104-.3-19.4.9-37.9 13.5-53.8 18.9-19.4 44.2-25 67.5-15.1 23.4 10 34.9 30.9 34 61.5-3.8 13.8-9.7 26.3-21.1 35.7-13 10.7-25.7 21.7-38.6 32.5-18.2 15.5-36.4 30.8-55.1 46.5z"
        fill="#ea4335" />
    </svg>
  );
}

function IcloudSvg(props: Props) {
  const { width, height } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="85.04 232.402 412.912 401.703">
      <path
        d="M391.631 424.861l-4.477-1.119v-4.477c0-40.281-32.449-72.73-71.611-72.73-29.094 0-55.947 17.904-67.138 44.758l-3.355 7.834-5.595-5.596c-5.597-5.594-13.429-8.951-21.262-8.951a30.086 30.086 0 0 0-30.211 30.211l1.118 6.715-4.476 1.117c-21.26 6.715-35.807 25.736-35.807 46.996 0 26.854 22.38 49.234 49.234 49.234h185.745c25.734 0 48.113-21.262 48.113-48.115-1.114-22.379-16.78-41.401-40.278-45.877z"
        fill="#333" />
      <path
        d="M394.989 232.402H189.102c-58.185 0-104.062 46.996-104.062 104.062v193.578c0 58.186 46.995 104.062 104.062 104.062H393.87c58.187 0 104.062-46.996 104.062-104.062V337.583c1.118-58.185-45.877-105.181-102.943-105.181zm-11.19 298.76H198.054c-33.568 0-60.424-26.855-60.424-60.424 0-25.734 15.666-46.996 39.164-55.947 1.118-22.379 19.021-40.281 41.4-40.281 7.833 0 15.666 2.238 22.379 6.713 14.547-27.973 42.521-44.758 73.852-44.758 44.758 0 81.684 35.809 82.802 79.447 25.736 6.713 44.759 30.211 44.759 57.066-.001 31.328-25.737 58.184-58.187 58.184z"
        fill="#333" />
      <path
        d="M398.345 414.791c-2.237-44.758-38.044-79.445-82.802-79.445-31.33 0-60.424 17.904-73.852 44.76-6.714-4.477-14.546-6.715-22.379-6.715-22.379 0-40.282 17.902-41.401 40.281-23.498 8.951-39.163 31.33-39.163 55.947 0 33.568 26.855 60.424 60.424 60.424h185.746c32.448 0 59.304-26.854 59.304-59.305-2.237-25.737-20.14-49.233-45.877-55.947zm-14.546 105.181H198.054c-26.854 0-49.233-22.379-49.233-49.232 0-22.379 14.546-40.283 35.806-46.996l4.476-1.119-1.118-6.713c0-16.785 13.427-30.213 30.211-30.213 7.833 0 15.666 3.357 21.262 8.953l5.595 5.594 3.355-7.832c11.189-26.855 36.925-44.758 67.138-44.758 40.281 0 71.611 32.449 71.611 72.73v4.477l4.477 1.119c23.498 3.355 39.164 23.498 39.164 46.996-.003 25.734-21.264 46.994-46.999 46.994z"
        fill="#e4e4e4" />
    </svg>
  );
}

function NotionSvg(props: Props) {
  const { width, height } = props;

  return (
    <svg height={height} viewBox="13.38 3.2 485.44 505.7" width={width} xmlns="http://www.w3.org/2000/svg">
      <path
        d="m186.84 13.95c-79.06 5.85-146.27 11.23-149.43 11.86-8.86 1.58-16.92 7.59-20.71 15.5l-3.32 6.96.32 165.88.47 165.88 5.06 10.28c2.85 5.69 22.14 32.26 43.17 59.61 41.59 53.92 44.59 56.93 60.4 58.51 4.59.47 39.06-1.11 76.38-3.32 37.48-2.37 97.56-6.01 133.62-8.06 154.01-9.35 146.1-8.56 154.95-16.15 11.07-9.17 10.28 5.85 10.75-195.76.32-170.94.16-182.16-2.37-187.38-3-5.85-8.38-9.96-78.59-59.3-46.96-32.89-50.28-34.63-71.32-34.95-8.69-.31-80.48 4.43-159.38 10.44zm177.73 21.66c6.64 3 55.19 36.84 62.3 43.33 1.9 1.9 2.53 3.48 1.58 4.43-2.21 1.9-302.66 19.77-311.35 18.5-3.95-.63-9.8-3-13.12-5.22-13.76-9.33-47.91-37.32-47.91-39.37 0-5.38-1.11-5.38 132.83-15.02 25.62-1.74 67.68-4.9 93.3-6.96 55.49-4.43 72.1-4.27 82.37.31zm95.51 86.5c2.21 2.21 4.11 6.48 4.74 10.59.47 3.8.79 74.64.47 157.18-.47 141.68-.63 150.54-3.32 154.65-1.58 2.53-4.74 5.22-7.12 6.01-6.63 2.69-321.46 20.56-327.94 18.66-3-.79-7.12-3.32-9.33-5.53l-3.8-4.11-.47-152.75c-.32-107.21 0-154.65 1.27-158.92.95-3.16 3.32-6.96 5.38-8.22 2.85-1.9 21.51-3.48 85.71-7.27 45.07-2.53 114.8-6.8 154.81-9.17 95.17-5.86 94.86-5.86 99.6-1.12z" />
      <path
        d="m375.48 174.45c-17.08 1.11-32.26 2.69-34 3.64-5.22 2.69-8.38 7.12-9.01 12.18-.47 5.22 1.11 5.85 18.18 7.91l7.43.95v67.52c0 40.16-.63 66.73-1.42 65.94-.79-.95-23.24-35.1-49.97-75.9-26.72-40.95-48.86-74.64-49.18-74.95-.32-.32-17.71.63-38.58 2.06-25.62 1.74-39.69 3.32-42.54 4.9-4.59 2.37-9.65 10.75-9.65 16.29 0 3.32 6.01 5.06 18.66 5.06h6.64v194.18l-10.75 3.32c-8.38 2.53-11.23 4.11-12.65 7.27-2.53 5.38-2.37 10.28.16 10.28.95 0 18.82-1.11 39.37-2.37 40.64-2.37 45.22-3.48 49.49-11.86 1.27-2.53 2.37-5.22 2.37-6.01 0-.63-5.53-2.53-12.18-4.11-6.8-1.58-13.6-3.16-15.02-3.48-2.69-.79-2.85-5.69-2.85-73.69v-72.9l48.07 75.43c50.44 79.06 56.77 88.08 64.52 92.03 9.65 5.06 34.16 1.58 46.49-6.48l3.8-2.37.32-107.84.47-108 8.38-1.58c9.96-1.9 14.55-6.48 14.55-14.39 0-5.06-.32-5.38-5.06-5.22-2.83.13-19.12 1.08-36.04 2.19z" />
    </svg>
  );
}

export const SUBSCRIPTION_ICONS: Record<string, {
  icon: React.ComponentType<any>;
  color: string;
}> = {
  'netflix': { icon: NetflixSvg, color: '#E50914' },
  'spotify': { icon: SpotifySvg, color: '#1DB954' },
  'claude': { icon: ClaudeSvg, color: '#DE7356' },
  'openai': { icon: OpenAiSvg, color: '#412991' },
  'domain name': { icon: NamecheapSvg, color: '#4CAF50' },
  'gym': { icon: GymSvg, color: '#FF5722' },
  'microsoft 365': { icon: OfficeSvg, color: '#0078D4' },
  'canva': { icon: CanvaSvg, color: '#00C4CC' },
  'google one': { icon: GoogleSvg, color: '#4285F4' },
  'icloud': { icon: IcloudSvg, color: '#3498DB' },
  'notion': { icon: NotionSvg, color: '#000000' },
  'custom': { icon: NotionSvg, color: '#888888' },
};