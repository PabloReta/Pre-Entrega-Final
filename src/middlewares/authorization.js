export const authorization = (role) => {
    return (req, res, next) => {
        
        
        if (!req.user) {
            return res.status(401).send("Unauthorized: User not logged in");
        }

        // Verificar si el rol del usuario coincide con el requerido
        if (req.user.role !== role) {
            console.error(`User role (${req.user.role}) does not match required role (${role})`)
            return res.status(403).send("Forbidden: Insufficient permissions");
        }

        // Continuar si el rol es válido
        next();
    };
};
