const sleep = ms => new Promise(r => setTimeout(r, ms));

const zeroPad = (num, places) => String(num).padStart(places, '0');

const degrees_to_radians = degrees => degrees * (Math.PI / 180);

const multi = (a, b) => a * b;

const number_binary_matrix = (number, matrix, expression) => matrix.map(
    x => x.map(
        y => expression(y, number)
    )
)

const adding_matrix = (m1, m2) => {
    let m3 = [];        

    for (let i = 0; i < m1.length; i++) {
        m3[i] = [];

        for (let j = 0; j < m1[0].length; j++) {
            m3[i][j] = m1[i][j] + m2[i][j];
        }
    }

    return m3;
}

const matrix_multiply_matrix = (m1, m2) => {
    let m3 = [];

    for (let i = 0; i < m1.length; i++)
        m3[i] = []

    for (let i = 0; i < m1.length; i++)
        for (let j = 0; j < m2[0].length; j++) {
            let sum = 0;

            for (let k = 0; k < m2.length; k++)
                sum += m1[i][k] * m2[k][j];

            m3[i][j] = sum;
        }

    return m3;
}

const transpose_matrix = matrix => matrix[0].map(
    (_, colIndex) => matrix.map(
        row => row[colIndex]
    )
);

const smaller_matrix = (matrix, i, j) => {
    let matrix2 = [];

    matrix.map((row, x) => {
        if (x != i) {
            let rows = [];
            row.map((index, y) => {
                if (y != j)
                    rows.push(index);
            })
            matrix2.push(rows);
        }
    });

    return matrix2;
}

const get_determinant_of_matrix = matrix => {
    if (matrix.length == 1) return matrix[0][0];
    let sum = 0;

    for (let i = 0; i < matrix.length; i++)
        sum += Math.pow(-1, 1 + (i + 1)) * matrix[0][i] * get_determinant_of_matrix( smaller_matrix(matrix, 0, i) );

    return sum;
}

const get_cofactor_matrix = matrix => {
    let c = Array(matrix.length).fill(null).map( () => Array(matrix.length).fill(null));

    matrix.map((row, i) => {
        row.map((_, j) => {
            c[i][j] = Math.pow(-1, i + j) * get_determinant_of_matrix(smaller_matrix(matrix, i, j));
        })
    })
    
    return c;
}

const get_inversed_matrix = matrix => {
    if ( get_determinant_of_matrix(matrix) == 0 ) return null;

    return number_binary_matrix(
        1 / get_determinant_of_matrix(matrix), 
        transpose_matrix( get_cofactor_matrix(matrix) ), 
        multi
    )
}

const get_rotation_x_matrix = degree => {
    let radian = degrees_to_radians(degree);
    return [
        [1, 0, 0, 0],
        [0, Math.cos(radian), -Math.sin(radian), 0],
        [0, Math.sin(radian),  Math.cos(radian), 0],
        [0, 0, 0, 1],
    ];
}

const get_rotation_x_inverse_matrix = degree => {
    let radian = degrees_to_radians(degree);
    return [
        [1, 0, 0, 0],
        [0, +Math.cos(radian).toLocaleString(), Math.sin(radian).toLocaleString(), 0],
        [0, -Math.sin(radian).toLocaleString(), Math.cos(radian).toLocaleString(), 0],
        [0, 0, 0, 1],
    ];
}

const get_rotation_y_matrix = degree => {
    let radian = degrees_to_radians(degree);
    return [
        [ +Math.cos(radian).toLocaleString(), 0, +Math.sin(radian).toLocaleString(), 0],
        [0, 1, 0, 0],
        [ -Math.sin(radian).toLocaleString(), 0, +Math.cos(radian).toLocaleString(), 0],
        [0, 0, 0, 1],
    ];
}

const get_rotation_y_inverse_matrix = degree => {
    let radian = degrees_to_radians(degree);
    return [
        [+Math.cos(radian).toLocaleString(), 0, -Math.sin(radian).toLocaleString(), 0],
        [0, 1, 0, 0],
        [+Math.sin(radian).toLocaleString(), 0, +Math.cos(radian).toLocaleString(), 0],
        [0, 0, 0, 1],
    ];
}

const get_rotation_z_matrix = degree => {
    let radian = degrees_to_radians(degree);
    return [
        [+Math.cos(radian).toLocaleString(), -Math.sin(radian).toLocaleString(), 0, 0],
        [+Math.sin(radian).toLocaleString(), +Math.cos(radian).toLocaleString(), 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 0],
    ];
}

const get_rotation_z_inverse_matrix = degree => {
    let radian = degrees_to_radians(degree);
    return [
        [+Math.cos(radian).toLocaleString(), +Math.sin(radian).toLocaleString(), 0, 0],
        [-Math.sin(radian).toLocaleString(), +Math.cos(radian).toLocaleString(), 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 0],
    ];
}

const get_translate_matrix = (x, y, z) => [
    [ 1, 0, 0, 0 ], 
    [ 0, 1, 0, 0 ], 
    [ 0, 0, 1, 0 ], 
    [ x, y, z, 1 ], 
];

const get_identity_matrix = length => {
    let result = [];

    for (let i = 0; i < length; i++) {
        result[i] = [];

        for (let j = 0; j < length; j++)
            if (i == j) 
                result[i][j] = 1;
            else
                result[i][j] = 0;
    }

    return result;
}

const array_matrix_to_string_matrix = arr => {
    let result = `matrix3d(`;

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            result += `${arr[i][j]}, `;
        }
    }

    return result.slice(0, result.length - 2) + ")";
}

const string_matrix_to_array_matrix = (matrix3d) => {
    let regex = /-?\d+(?:\.\d+)?/g;
    let array_1d = matrix3d.match(regex).splice(1);
    let array_2d = [];

    for (let i = 0; i < 4; i++) {
        array_2d[i] = [];

        for (let j = 0; j < 4; j++) {
            array_2d[i][j] = +array_1d[i * 4 + j];
        }
    }
    
    return array_2d;
}