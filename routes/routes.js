const pool = require('../data/config');
const verificaNulos = require('./middlewares/valores');

const router = app => {

    // Ruta 1
    app.get('/', (request, response) => {
        response.send({
            message: 'Node.js and Express REST API'
        });
    });

    // Ruta 2, toda la lista
    app.get('/users', (request, response) => {
        pool.query('SELECT * FROM users', (error, result) => {
            if (error) {
                throw error;
            } else {
                response.send(result);
            }
        });
    });

    // Ruta 3, con filtro ID
    app.get('/users/:id', (request, response) => {
        const id = request.params.id;

        pool.query('SELECT * FROM users WHERE id = ?', id, (error, result) => {
            if (error) {
                throw error;
            } else {
                response.send(result);
            }
        });
    });

    // Ruta 4, insertar
    app.post('/users', (request, response) => {

        if ((request.body.name === undefined) || (request.body.email === undefined) || (request.body.name === '') || (request.body.email === '')) {

            console.log('Error, alguno de los valores no son validos');
            response.status(406).send('Error, alguno de los valores no son validos');

        } else {
            pool.query('INSERT INTO users SET ?', request.body, (error, result) => {
                if (error) {
                    throw error;
                } else {
                    response.status(201).send(`User added with ID: ${result.insertId}`);

                }
            });


        }

    });

    // Ruta 5, insertar/actualizar
    app.put('/users/:id', (request, response) => {

        if ((request.body.name === undefined) || (request.body.email === undefined) || (request.body.name === '') || (request.body.email === '')) {

            console.log('Error, alguno de los valores no son validos');
            response.status(406).send('Error, alguno de los valores no son validos');

        } else {

            const id = request.params.id;

            pool.query('UPDATE users SET ? WHERE id = ?', [request.body, id], (error, result) => {
                if (error) throw error;

                response.send('User updated successfully.');
            });
        }
    });

    // Ruta 6, Delete
    app.delete('/users/:id', (request, response) => {
        const id = request.params.id;

        pool.query('DELETE FROM users WHERE id = ?', id, (error, result) => {
            if (error) throw error;

            response.send('User deleted.');
        });
    });

}

// Export the router
module.exports = router;