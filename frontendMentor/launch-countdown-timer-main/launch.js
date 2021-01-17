export function launchSec() {
    let section = document.createElement('section');
    section.classList.add('launch');
    section.innerHTML = `<header class="launch__head"><h1>We ARE LIVE!!!</h1></header><div class="launch__img">
    <figure>
      <img src="images/001-shuttle.svg" alt="">
    </figure>
    <figure><img src="images/002-launch.svg" alt=""></figure>
    <figure><img src="images/003-startup.svg" alt=""></figure>
    <figure><img src="images/004-rocket.svg" alt=""></figure>
    <figure><img src="images/005-rocket-1.svg" alt=""></figure></div>`
    return section;
}


//   </section>