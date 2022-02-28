const router = require('express').Router();
const mysql = require('mysql');

var conexionBD = mysql.createConnection({
    host: "fifafut21.cxoyamjuaana.us-east-2.rds.amazonaws.com",
    user: "admin",
    password: "lLGDHxlQPEjW8vKZcHTi",
    database: "FifaFut21"
  });

router.route('/').post(async(req, res) => {
    equipo = req.body.name;
    if(req.body.page) {
        pagina = req.body.page
    } else {
        pagina = 1
    }
    const rows = await query('SELECT * FROM `jugadores` WHERE UPPER(club) = UPPER("' + equipo + '")')
    limit = 'LIMIT  10 offset ' + (pagina-1)*10
    const jugadores = await query('SELECT * FROM `jugadores` WHERE UPPER(club) = UPPER("' + equipo + '") ' + limit)
    res.json({
        Page: pagina,
        TotalPages: Math.ceil(rows.length/10),
        items: jugadores.length,
        totalItems: rows.length,
        players: jugadores
    })
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