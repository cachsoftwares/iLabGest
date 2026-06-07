export const authed = (req, res, next) => {

    if (req.isAuthenticated()) { return next() }

    req.flash('info_msg', 'Entre na sua Conta')
    res.redirect('/user/sign')
}

export const unAuthed = (req, res, next) => {

    if (!req.isAuthenticated()) { return next() }

    req.flash('info_msg', 'Saia da sua Conta')
    res.redirect('/user/profile')
}

export const employer = (req, res, next) => {

    if (req.isAuthenticated() && (req.user.role == 'Funcionário' || req.user.role == 'Administrador')) { return next() }

    req.flash('error_msg', 'Sem Acesso')
    res.redirect('/user/profile')
}

export const admin = (req, res, next) => {

    if (req.isAuthenticated && req.user.role == 'Administrador') { return next() }

    req.flash('error_msg', 'Acesso Negado')
    res.redirect('/user/profile')
}