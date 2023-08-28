import JWT from "passport-jwt";
import User from "../models/user.js";

const JwtStrategy = JWT.Strategy;
const ExtractJwt = JWT.ExtractJwt;

var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'tweettweet',
};

export const passportAuth = (passport) => {
    try {
        passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
            const user = await User.findById(jwt_payload.id);
            if (!user) {
                done(null, false);
            }
            else {
                done(null, user);
            }
        }));
    } catch (error) {
        throw error;
    }

}