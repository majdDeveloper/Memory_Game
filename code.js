// create variables
let screen = document.querySelector(".start_button");
let start_game = document.querySelector(".start_button span");
let title_user = document.querySelector(".user span");
let super_game = document.querySelector(".images_game");
let sup_game = document.querySelectorAll(".image");
let wrong_num = document.querySelector(".wrong_num");
let storge = [];

// click start_game
start_game.onclick = () => {
    screen.style.display = "none";
    document.getElementById("long_success").play();
    text_name();
}
// array all image
let new_game = Array.from(super_game.children);
// array key all image 
let orderRange = Array.from(Array(new_game.length).keys());
shuffle(orderRange)
// if click image
new_game.forEach((image, index) => {
    image.style.order = orderRange[index];
    image.addEventListener("click", () => {
        storge.push(image.dataset.technicality)
        click_rotate(image)
    })
})
function click_rotate(image_click) {
    image_click.classList.add("rotate");
    let checkedimage = new_game.filter(rotateimage => rotateimage.classList.contains("rotate"));
    // if Clicked Two image 
    if (checkedimage.length % 2 == 0) {
        stop_rotate();
        // if two image1 = image2
        if(storge[0] == storge[1]) {
            storge = [];
            super_game.classList.remove("no_clicking");
            document.getElementById("shourt_success").play();
        } else {
        // if two image1 != image2
            not_click_rotate(new_game)
            wrong_num.innerHTML++;
            checked_wrong_num(wrong_num, 8);
            document.getElementById("shourt_fail").play();
            setTimeout(() => {
                storge = [];
            }, 1001);
        }
    }
}
// checked wrong_num
function checked_wrong_num (check, num) {
    if (check.innerHTML == num) {
        not_Show()
        check.innerHTML = 0
    }
}
// All image not Show 
function not_Show () {

    screen.style.display = "block";
    document.querySelector(".start_button span").innerHTML = "Try Agin";
    document.getElementById("long_success").pause()
    if (new_game[0].className == "image") {
        document.getElementById("long_fail").play();        
    } else {
        document.getElementById("shourt_success").play(); 
    }
    new_game.forEach((image) => {
        image.className = "image";
    })
}
// stop clicking images 
function stop_rotate() {
    super_game.classList.add("no_clicking");
}
//  all image className is image Not image_rotate
function not_click_rotate(images) {
    setTimeout(() => {
        images.forEach((image) => {
            for (let i = 0; i < storge.length; i++) {
                if (storge[i] == image.dataset.technicality) {
                    image.className = "image";
                }
            }
        })
        super_game.classList.remove("no_clicking");
    }, 1000);
}

// random imagees in loaded
function shuffle(array) {
    let current = array.length;
    let temp,random;
    while(current > 0) {
        // get random number
        random = Math.floor(Math.random() * current);

        // Decrease length by one
        current--;
        temp = array[current];
        array[current] = array[random]
        array[random] = temp;
    }
    return array;
}
// add UserName 
function text_name() {
    let user_name = prompt("Whats Your Name User");
    if (user_name == "" || user_name == null) {
        title_user.innerHTML = " Unknown";
    } else {
        title_user.innerHTML = ` ${user_name[0].toUpperCase()+user_name.slice(1)}`;
    }
}