<template>
  <a
    href="https://send.monobank.ua/jar/8Kun5xwrMJ"
    target="_blank"
    rel="noopener noreferrer"
    class="main-element monodonat"
  >
    <div class="element-top">
      <div class="element-title">Донат | Monobank</div>
      <div class="element-info">озвучка на стрімі</div>
    </div>
    <div class="element-down">
      <div class="element-desc">Від 10 грн</div>
      <div class="arrow">
        <svg viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_0_21)">
            <path
              d="M14.8 18.8C14.41 18.41 14.41 17.78 14.8 17.39L18.67 13.5H3.50003C2.95003 13.5 2.50003 13.05 2.50003 12.5C2.50003 11.95 2.95003 11.5 3.50003 11.5H18.67L14.79 7.61998C14.4 7.22998 14.4 6.59998 14.79 6.20998C15.18 5.81998 15.81 5.81998 16.2 6.20998L21.8 11.8C22.19 12.19 22.19 12.82 21.8 13.21L16.21 18.8C15.82 19.18 15.18 19.18 14.8 18.8Z"
              fill="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_0_21">
              <rect width="24" height="24" fill="white" transform="matrix(-1 0 0 1 24.5 0.5)" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  </a>
</template>

<style>
.main-title {
  color: rgb(255, 255, 255);
  font-size: 1rem;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0%;
  text-align: center;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
  width: 80%;
}
.main-element {
  padding: 0.875rem;
  box-sizing: border-box;
  border-radius: 18px;
  background: #040404;
  position: relative;
  margin-bottom: 14px;
}
.donat {
  background: linear-gradient(208.95deg, rgb(10, 10, 10) 35.582%, rgb(22, 22, 22) 97.414%);
}
.monodonat {
  background: linear-gradient(208.95deg, rgb(10, 10, 10) 35.582%, rgb(22, 22, 22) 97.414%);
}
.main-element::before {
  content: '';
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  background: linear-gradient(
    252.75deg,
    rgb(56, 160, 129) -40.431%,
    rgb(85, 68, 193) 62.654%,
    rgb(255, 153, 0) 147.126%
  );
  border-radius: inherit;
  z-index: -1;
}

.donat::before {
  content: '';
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  background: linear-gradient(
    224.7deg,
    rgba(255, 255, 255, 0) 1.462%,
    rgba(119, 119, 119, 0.2) 97.343%
  );
  border-radius: inherit;
  z-index: -1;
}
.monodonat::before {
  content: '';
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  background: linear-gradient(
    224.7deg,
    rgba(255, 255, 255, 0) 1.462%,
    rgba(119, 119, 119, 0.2) 97.343%
  );
  border-radius: inherit;
  z-index: -1;
}
.monodonat::after {
  content: '';
  position: absolute;
  right: 80px;
  width: 84px;
  height: 84px;
  bottom: 0;
  background-image: url(../img/kit.png);
  background-size: cover;
  background-repeat: no-repeat;
}
.element-top {
  display: flex;
  justify-content: space-between;
  align-items: start;
}

.element-title {
  color: rgb(255, 255, 255);
  font-size: 20px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: 0%;
  width: 146px;
  margin-bottom: 35px;
}
.element-info {
  color: rgb(255, 255, 255);
  font-size: 10px;
  font-weight: 400;
  line-height: 13px;
  letter-spacing: 0%;
  text-transform: uppercase;
  padding: 10px;
  border-radius: 27px;
  border-radius: 27px;
  height: 33px;
  background: linear-gradient(
    252.75deg,
    rgb(56, 160, 129) -40.431%,
    rgb(85, 68, 193) 62.654%,
    rgb(255, 153, 0) 147.126%
  );
}

.element-down {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.element-desc {
  color: rgb(255, 255, 255);
  font-size: 14px;
  font-weight: 400;
  line-height: 13px;
  letter-spacing: 0%;
  text-align: left;
}
</style>
