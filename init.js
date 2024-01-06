const RUBIK_CUBE = document.querySelector("#cube");
const RUBIK_SIZE = 3;
const RUBIK_LENGTH = 100;

const rotate_U_button = document.querySelector("#rotate-U");
const rotate_D_button = document.querySelector("#rotate-D");
const rotate_F_button = document.querySelector("#rotate-F");
const rotate_B_button = document.querySelector("#rotate-B");
const rotate_R_button = document.querySelector("#rotate-R");
const rotate_L_button = document.querySelector("#rotate-L");

let start = -1 * ( RUBIK_SIZE - 1 ) / 2;
let end = -start;

document.documentElement.style.setProperty('--cube-size', RUBIK_LENGTH + 'px');

document.querySelector("main").style.height = RUBIK_SIZE * RUBIK_LENGTH * 2 + "px";

RUBIK_CUBE.style.width = RUBIK_SIZE * RUBIK_LENGTH + "px";
RUBIK_CUBE.style.height = RUBIK_SIZE * RUBIK_LENGTH + "px";

// Back to Front, Up to Down, Left to Right
for (let i = start; i <= end; i++) {
    for (let j = start; j <= end; j++) {
        for (let k = start; k <= end; k++) {
            // if ( i == -0.5 && j == -0.5 && k == -0.5 ) {
            if ( 1 ) {
                let U_face = document.createElement("div");
                U_face.innerHTML = "UP";
                U_face.classList.add("U");
                U_face.classList.add("face");
                if ( j >= 0 && j != end )
                    U_face.classList.add("black");
                
                let D_face = document.createElement("div");
                D_face.innerHTML = "DOWN";
                D_face.classList.add("D");
                D_face.classList.add("face");
                if ( j <= 0 && j != end )
                    D_face.classList.add("black");

                let F_face = document.createElement("div");
                F_face.innerHTML = "FRONT";
                F_face.classList.add("F");
                F_face.classList.add("face");
                if ( k <= 0 )
                    F_face.classList.add("black");

                let B_face = document.createElement("div");
                B_face.innerHTML = "BACK";
                B_face.classList.add("B");
                B_face.classList.add("face");
                if ( k >= 0 )
                    B_face.classList.add("black");
                
                let R_face = document.createElement("div");
                R_face.innerHTML = "RIGHT";
                R_face.classList.add("R");
                R_face.classList.add("face");
                if ( i <= 0 )
                    R_face.classList.add("black");

                let L_face = document.createElement("div");
                L_face.innerHTML = "LEFT";
                L_face.classList.add("L");
                L_face.classList.add("face");
                if ( i >= 0 )
                    L_face.classList.add("black");

                let translate_matrix = get_translate_matrix(
                    i * RUBIK_LENGTH,
                    j * RUBIK_LENGTH,
                    k * RUBIK_LENGTH
                );

                let cubie = document.createElement("div");
                cubie.classList.add("cubie");
                cubie.appendChild( U_face );
                cubie.appendChild( D_face );
                cubie.appendChild( F_face );
                cubie.appendChild( B_face );
                cubie.appendChild( R_face );
                cubie.appendChild( L_face );
                cubie.style.transform = array_matrix_to_string_matrix( translate_matrix );
                cubie.dataset.x = i;
                cubie.dataset.y = j;
                cubie.dataset.z = k;
                // cubie.style.transformOrigin = `${50 + (100 * -i)}% ${50 + (100 * -j)}% ${50 + (100 * -k)}%`;
                // cubie.style.transformOrigin = `${50 + (100 * -i)}% ${50 + (100 * -j)}%`;
                // cubie.style.transformOrigin = "150% 150%";
                // cubie.style.animation = "rotate_U 5s infinite";
                
                RUBIK_CUBE.appendChild(cubie);   
            }
        }
    }
}

var sheet = window.document.styleSheets[0];
// console.log( sheet );