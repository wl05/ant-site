"use strict";
function Demo() {
  console.log(this, this === global);
}
Demo();
