const router = require('express').Router();
const mysql = require('mysql');

var conexionBD = mysql.createConnection({
    host: "fifafut21.cxoyamjuaana.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "lLGDHxlQPEjW8vKZcHTi",
    database: "FifaFut21"
  });

router.route('/').get(async(req, res) => {
    nombre = req.query.search
    if(req.query.page) {
        pagina = Number(req.query.page)
    } else {
        pagina = 1
    }
    order = 'rating DESC'
    var peticion = 'SELECT * FROM `jugadores` '
    if (req.query.search) {
        if(req.query.order == 'ASC' || req.query.order == 'DESC' || req.query.order == 'desc' || req.query.order == 'asc')  {
            order =  'nombre_jugador ' + req.query.order
        } else {
            order = 'nombre_jugador ASC'
        }
        peticion+= ' WHERE nombre_jugador LIKE "%' + nombre + '%" '
    }
    const rows = await query(peticion)
    limit = 'LIMIT  10 offset ' + (pagina-1)*10
    peticion+= ' ORDER BY ' + order + ' ' + limit
    const jugadores = await query(peticion)
    res.json({
        Page: pagina,
        TotalPages: Math.ceil(rows.length/10),
        items: jugadores.length,
        totalItems: rows.length,
        players: jugadores
    })
})

router.route('/edit').post(async(req, res) => {
    if (req.body.id_jugador && (req.body.club || req.body.rating || req.body.position || req.body.pierna)) {
        var edicion = 'UPDATE `jugadores` SET '
        if (req.body.club) {
            edicion+= " club = '" + req.body.club + "' "
        }
        if (req.body.rating) {
            edicion+= " rating = '" + req.body.rating + "' "
        }
        if (req.body.position) {
            edicion+= " posicion = '" + req.body.position + "' "
        }
        if (req.body.pierna) {
            edicion+= " pierna = '" + req.body.pierna + "' "
        }
        edicion+= " WHERE id_jugador = " + req.body.id_jugador

        const edit = await query(edicion)
        res.json(edit)
    } else {
        res.json({
            message:'No se enviaron datos',
            status: 'error'
        })
    }
    
})

let query = function( sql, values ) {
    // devolver una promesa
 return new Promise(( resolve, reject ) => {
    conexionBD.query(sql, values, ( err, rows) => {
        if ( err ) {
            reject( err )
        } else {
            resolve( rows )
        }
    })
 })
}
module.exports = router;