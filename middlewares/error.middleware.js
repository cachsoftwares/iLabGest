/* middlewares */
export const internalError = (err, go, flash, rtrn) => {

    console.log(`Erro Interno: ${err}`)
    if (flash == true) { req.flash('error_msg', 'Erro Interno') }
    res.redirect(go)
    if(rtrn == true) {return}
}