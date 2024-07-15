<template>
    <div
    style="width: 100vw;height: 100vh; position: relative;   background: rgba(0, 0, 0, 0.658); display: flex;justify-content: center; align-items: center;">
        

<svg width="100" height="120" style="margin: auto;" viewBox="0 0 24 34" xmlns="http://www.w3.org/2000/svg">



<rect class="spinner_9y7u" x="1" y="1" rx="1" width="10" height="10" />
<rect class="spinner_9y7u spinner_DF2s" x="1" y="1" rx="1" width="10" height="10" />
<rect class="spinner_9y7u spinner_q27e" x="1" y="1" rx="1" width="10" height="10" />

<text x="12" y="32" class="loading-text">Please Wait</text>

</svg>



    </div>

   
</template>

<style>

.loading-text {
  font-family: Roboto;
  font-size: 5px;
  fill: white;
  text-anchor: middle;
  text-shadow: 2px 2px 4px #000000;
  animation: fadeIn 2s ease-in-out infinite alternate;
}

@keyframes fadeIn {
  from {opacity: 0;}
  to {opacity: 1;}
}
.spinner_9y7u {
  animation: spinner_fUkk 2.4s linear infinite;
  animation-delay: -2.4s;
  fill: #da1297
}
.spinner_DF2s {
  animation-delay: -1.6s;
  fill: #066aff;
}
.spinner_q27e {
  animation-delay: -0.8s;
  fill: #ffbb00
}
@keyframes spinner_fUkk {
  8.33% { x: 13px; y: 1px; }
  25% { x: 13px; y: 1px; }
  33.3% { x: 13px; y: 13px; }
  50% { x: 13px; y: 13px; }
  58.33% { x: 1px; y: 13px; }
  75% { x: 1px; y: 13px; }
  83.33% { x: 1px; y: 1px; }
}
</style>

