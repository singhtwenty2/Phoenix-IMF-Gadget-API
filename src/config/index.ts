export default {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || 'and0LWludGVybnNoaXAtYXQtaW50cmFrcmFmdA==%',
    jwtExpiresIn: '24h'
};