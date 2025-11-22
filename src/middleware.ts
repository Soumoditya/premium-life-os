import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/login",
    },
});

export const config = {
    matcher: [
        "/ai/:path*",
        "/notes/:path*",
        "/calculator/:path*",
        "/wellbeing/:path*",
        "/settings/:path*"
    ]
};
