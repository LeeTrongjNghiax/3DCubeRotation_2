// rotate_U_button.addEventListener("click", e => {
//     for (let i = 0; i < RUBIK_CUBE.childNodes.length; i++) {
//         let x = RUBIK_CUBE.childNodes[i].dataset.x;
//         let y = RUBIK_CUBE.childNodes[i].dataset.y;
//         let z = RUBIK_CUBE.childNodes[i].dataset.z;
        
//         if (y == start) {
//             document.styleSheets[0].insertRule(`
//             [data-x="${x}"][data-y="${y}"][data-z="${z}"]::after {
//                 transition-property: transform;
//                 transition-duration: 1s;
//                 transition-timing-function: ease-out;
//             }`, 0);

//             // console.log( document.styleSheets[0] );

//             let base_percent = 50;
//             let multiply = RUBIK_SIZE - 1;

//             if (x > 0)
//                 percent_x = -multiply * base_percent;
//             else if (x < 0)
//                 percent_x = multiply * base_percent;
//             else
//                 percent_x = 0;

//             if (z > 0)
//                 percent_z = -multiply * base_percent;
//             else if (z < 0)
//                 percent_z = multiply * base_percent;
//             else
//                 percent_z = 0;

//             let translation_matrix = get_translate_matrix(
//                 RUBIK_LENGTH * (percent_x / 100),
//                 0,
//                 RUBIK_LENGTH * (percent_z / 100),
//             );
            
//             let inverse_translation_matrix = get_inversed_matrix( translation_matrix );

//             let base_matrix = string_matrix_to_array_matrix(RUBIK_CUBE.childNodes[i].style.transform);

//             let rotation_y_matrix = get_rotation_y_matrix(90);

//             let result_matrix;

//             let matrix_1;
//             let matrix_2;

//             // (rotated matrix) = (inverser translation matrix) * (rotation_matrix) * (translation matrix) * (base matrix)

//             matrix_1 = matrix_multiply_matrix(
//                 inverse_translation_matrix,
//                 rotation_y_matrix
//             );

//             matrix_2 = matrix_multiply_matrix(
//                 matrix_1,
//                 translation_matrix
//             );

//             result_matrix = matrix_multiply_matrix(
//                 matrix_2,
//                 base_matrix
//             );

//             // console.log( "base_matrix: " + base_matrix );
//             // console.log( "rotation_y_matrix: " + rotation_y_matrix);
//             // console.log( "translation_matrix: " + translation_matrix );
//             // console.log( "inverse_translation_matrix: " + inverse_translation_matrix);
//             // console.log( "matrix_1: " + matrix_1 );
//             // console.log( "matrix_2: " + matrix_2 );
//             // console.log( "result_matrix: " + result_matrix );
//             // console.log( "---------------------------------------------------------" );

//             RUBIK_CUBE.childNodes[i].style.transform = array_matrix_to_string_matrix(
//                 result_matrix
//             );

//             // console.log(RUBIK_CUBE.childNodes[i].style.transform);
//         }
//     }
// });

// TO DO: make rotation go smoothly

rotate_U_button.addEventListener("click", e => {
    let cubies_list = [];

    for (let i = 0; i < RUBIK_CUBE.childNodes.length; i++) {
        let y = RUBIK_CUBE.childNodes[i].dataset.y;
        
        if (y == start) {
            cubies_list.push(RUBIK_CUBE.childNodes[i]);
        }        
    }

    animate_the_rotation(cubies_list);
});

async function animate_the_rotation(cubies_list = []) {
    for (let i = 0; i < cubies_list.length; i++) {
        let x = cubies_list[i].dataset.x;
        let y = cubies_list[i].dataset.y;
        let z = cubies_list[i].dataset.z;

        let base_percent = 50;
        let multiply = RUBIK_SIZE - 1;

        if (x > 0)
            percent_x = -multiply * base_percent;
        else if (x < 0)
            percent_x = multiply * base_percent;
        else
            percent_x = 0;

        if (z > 0)
            percent_z = -multiply * base_percent;
        else if (z < 0)
            percent_z = multiply * base_percent;
        else
            percent_z = 0;

        let translation_matrix = get_translate_matrix(
            RUBIK_LENGTH * (percent_x / 100),
            0,
            RUBIK_LENGTH * (percent_z / 100),
        );
        
        let inverse_translation_matrix = get_inversed_matrix( translation_matrix );

        let base_matrix = string_matrix_to_array_matrix(
            cubies_list[i].style.transform
        );

        let result_matrix;

        for (let j = 0; j <= 90; j += 0.5) {
            let rotation_y_matrix = get_rotation_y_matrix(j);

            let matrix_1 = matrix_multiply_matrix(
                inverse_translation_matrix,
                rotation_y_matrix
            );

            let matrix_2 = matrix_multiply_matrix(
                matrix_1,
                translation_matrix
            );

            result_matrix = matrix_multiply_matrix(
                matrix_2,
                base_matrix
            );

            // cubies_list[i].style.transform = array_matrix_to_string_matrix(
            //     result_matrix
            // );

            const anim = cubies_list[i].animate(
                [
                //   { transform: base_matrix, offset: 0.0 }, 
                    { transform: array_matrix_to_string_matrix( result_matrix ), offset: 1.0 }
                ],
                {
                    duration: 10000, 
                    easing: "ease-in",
                    fill: "forwards",
                }
            );

            anim.play();
        }
    }
}