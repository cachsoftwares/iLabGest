/* middlewares */
export const internal = (err, go, flash, rtrn) => {

    console.log(`Erro Interno: ${err}`)
    if (flash == true) { req.flash('error_msg', 'Erro Interno') }
    if (go) { res.redirect(go) }
    if (rtrn == true) { return }
}

export const fillFields = (go, rtrn) => {

    req.flash('error_msg', 'Preencha os Campos')
    res.redirect(go)
    if (rtrn == true) { return }
}

export const wrongPwd = (go, rtrn) => {

    req.flash('error_msg', 'Senha Errada')
    res.redirect(go)
    if (rtrn == true) { return }
}

export const general = (msg, go, flash, log, rtrn) => {

    if (log == true) { console.log(msg) }
    if (flash == true) { req.flash('error_msg', msg) }
    res.redirect(go)
    if (rtrn == true) { return }
}