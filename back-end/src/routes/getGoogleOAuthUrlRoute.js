import { getGoogleOAuthUrl } from "../util/getGoogleOAuthUrl";

export const getGoogleOAuthUrlRoute =  {
    path: "/auth/google/url",
    method: "get",
    handler: (req, res) => {
        const url = getGoogleOAuthUrl();
        res.status(200).json({ url });
    }
}