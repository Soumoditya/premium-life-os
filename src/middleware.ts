import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/login",
    },
});

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/ai/:path*",
        "/notes/:path*",
        "/calculator/:path*",
        "/wellbeing/:path*",
        "/settings/:path*"
    ]
};
