import {Router } from 'express';
/** Nota: si se levanta con nodemon de resetea el arrar de usuarios */
const usuarios = [];
const router = Router();

router.get('/registro', (req, res) => {
    res.render('registro');
});

router.post('/registro', (req, res) => {
    const usuario = req.body;
    console.log('nuevo usuario', usuario);
    const userSaved = usuarios.some(usuario => usuario.nombre === req.body.nombre);
    if (userSaved) {
        res.render('error', {
            error: 'El usuario ya existe'
        });
    }
    usuarios.push(req.body);
    console.log('usuarios', usuarios);
    res.render('login');
});

router.get('/info', (req, res) => {
    if(req.session.nombre) {
        res.render('info', {
            nombre: req.session.nombre
        });
    }else {
        res.render('login');
    }
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    const { nombre, password } = req.body;
    const userSaved = usuarios.find(usuario => usuario.nombre === nombre && usuario.password === password);

    if (userSaved) {
        //guardar datos de usuario en sesion
        for (const key in req.body) {
            req.session[key] = req.body[key];
        }
        res.render('info', {
            nombre: req.body.nombre
        });
    }else {
        res.render('error', {
            error: 'Usuario o password incorrecto'
        });
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(
        () => {
            res.render('login');
        }
    );
});

router.get('/', (req, res) => {
   res.redirect('login'); 
});


export default router;