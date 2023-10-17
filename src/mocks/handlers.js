import { rest } from "msw"

const baseURL = "https://fixit-drf-api-b3b58b2bc39c.herokuapp.com/"

export const handlers = [
  rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
    return res(ctx.json(
      {
        "pk": 2,
        "username": "Jeremy",
        "email": "",
        "first_name": "",
        "last_name": "",
        "profile_id": 2,
        "profile_image": "https://res.cloudinary.com/dpvq4invf/image/upload/v1/media/images/Xmas_pic_otwk8h"
      }
    ));
  }),
  rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];