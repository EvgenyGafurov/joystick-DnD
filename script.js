const containerJoystick = document.querySelector(".container_Joystick");
const joystick = document.querySelector(".joystick_center");


const container = {}


const joystickRect = containerJoystick.getBoundingClientRect();
const x0 = joystickRect.left + joystickRect.width / 2;
const y0 = joystickRect.top + joystickRect.height / 2;

const radiusContainerJoystick = containerJoystick.offsetHeight / 2 - 4;
const radiusJoystick = joystick.offsetWidth / 2;

const maxDistance = radiusContainerJoystick - radiusJoystick;

let trigger = joystick.getBoundingClientRect();

const refund = {
    x: x0 - trigger.width / 2,
    y: y0 - trigger.height / 2
};

function moveJoystick(event) {
    trigger = joystick.getBoundingClientRect();

    const x = event.x;
    const y = event.y;

    const distance = Math.sqrt((x - x0) ** 2 + (y - y0) ** 2);

    if (distance < maxDistance) {
        joystick.style.left = (x - joystick.width / 2) + "px";
        joystick.style.top = (y - joystick.height / 2) + "px";
    } else {
        const x1 = x0 + (x - x0) * maxDistance / distance;
        const y1 = y0 + (y - y0) * maxDistance / distance;
        joystick.style.left = x1 - joystick.width / 2 + "px";
        joystick.style.top = y1 - joystick.height / 2 + "px";
    }


    let positionX = event.x - x0
    if (positionX < -5) {
        positionX = -1
    } else if (positionX > 5) {
        positionX = 1
    } else {
        positionX = 0
    }


    let positionY = event.y - y0
    if (positionY > 5) {
        positionY = -1
    } else if (positionY < -5) {
        positionY = 1
    } else {
        positionY = 0
    }

    container.posX = positionX
    container.posY = positionY
    document.querySelector(".inputX").value = 'position X = ' + container.posX
    document.querySelector(".inputY").value = 'position Y = ' + container.posY

}

containerJoystick.addEventListener("mousedown", function (event) {
    event.preventDefault();
    trigger = joystick.getBoundingClientRect();
    if (
        event.x >= trigger.left &&
        event.x <= trigger.right &&
        event.y >= trigger.top &&
        event.y <= trigger.bottom
    ) {
        joystick.style.transitionDuration = "0s";
        document.onmousemove = moveJoystick;
    }
});

document.addEventListener("mouseup", function (event) {
    event.preventDefault();
    document.onmousemove = null;
    joystick.style.transitionDuration = "0.5s";
    joystick.style.left = refund.x + "px";
    joystick.style.top = refund.y + "px";
    trigger = joystick.getBoundingClientRect();
});