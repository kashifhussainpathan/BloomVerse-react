import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "Kashif ",
    lastName: "Pathan",
    username: "kashifpathan",
    password: "kashifpathan",
    bookmarks: [],
    bio: "Finding more of myself these days.",
    avatarUrl: "https://pbs.twimg.com/media/FjU2lkcWYAgNG6d.jpg",
    coverUrl:
      "https://i.pinimg.com/originals/db/1b/cd/db1bcdcc64d0e7a4e148ce51744316f4.jpg",
    website: "https://bookish-kp.vercel.app/",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Adarsh",
    lastName: "Balika",
    username: "adarshbalika",
    password: "adarshBalika123",
    bio: "Be yourself!",
    bookmarks: [],
    avatarUrl:
      "https://res.cloudinary.com/dtrjdcrme/image/upload/v1651473734/socialmedia/avatars/adarsh-balika_dct6gm.webp",
    coverUrl:
      "https://images.unsplash.com/photo-1529573813483-53bd9ede667e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80",
    website: "https://google.com/",
    createdAt: "2022-01-01T10:55:06+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    password: "johndoe123",
    bio: "Hello World",
    bookmarks: [],
    avatarUrl:
      "https://res.cloudinary.com/dtrjdcrme/image/upload/v1651554207/socialmedia/avatars/john-doe_gbkuda.webp",
    coverUrl:
      "https://images.unsplash.com/photo-1503437313881-503a91226402?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80",
    website: "https://google.com/",
    createdAt: "2022-01-02T10:55:06+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Jane",
    lastName: "Doe",
    username: "janedoe",
    password: "janedoe123",
    bio: "Whats in bio?",
    bookmarks: [],
    avatarUrl:
      "https://res.cloudinary.com/dtrjdcrme/image/upload/v1651554256/socialmedia/avatars/jane-doe_il3cvx.webp",
    coverUrl:
      "https://images.unsplash.com/photo-1522120691812-dcdfb625f397?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    website: "https://google.com/",
    createdAt: "2022-01-01T10:55:06+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    firstName: "Carl",
    lastName: "Smith",
    username: "carlsmith",
    password: "carlsmith123",
    bio: "Whats in bio?",
    avatarUrl:
      "https://th.bing.com/th/id/R.017aaab086a22dbf5cd8afe71e56ea42?rik=crDFO1eeIP9DFw&riu=http%3a%2f%2flist.lisimg.com%2fimage%2f8567816%2f740.jpg&ehk=lTyGN8Xt6TqCYgror3Dq5MGx6EBAghDNjliYTkiUKis%3d&risl=&pid=ImgRaw&r=0",
    coverUrl:
      "https://images.unsplash.com/photo-1553451166-232112bda6f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80",
    website: "https://google.com/",
    createdAt: "2022-01-03T10:55:06+05:30",
    updatedAt: formatDate(),
  },

  {
    _id: uuid(),
    firstName: "Alex",
    lastName: "Maxwell",
    username: "alexmaxwell",
    password: "alexmaxwell123",
    bio: "What's up?",
    bookmarks: [],
    avatarUrl:
      "https://res.cloudinary.com/dtrjdcrme/image/upload/v1652525373/socialmedia/avatars/alex-maxwell.webp",
    coverUrl:
      "https://images.unsplash.com/photo-1599837487527-e009248aa71b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    website: "https://google.com/",
    createdAt: "2022-01-05T10:55:06+05:30",
    updatedAt: formatDate(),
  },

  {
    _id: uuid(),
    firstName: "Sophia",
    lastName: "Jones",
    username: "sophiajones",
    password: "sophiajones123",
    bio: "Frontend Engineer",
    bookmarks: [],
    avatarUrl:
      "https://img.freepik.com/free-photo/horizontal-portrait-curly-mixed-race-beautiful-woman-with-dark-eyes-full-lips-dressed-casually-being-delightful_273609-8842.jpg?w=1060&t=st=1688494314~exp=1688494914~hmac=8ef862c385d7250bb71da7de2a6cafe355d75c08b5b9b745dab8adaf080d287a",
    coverUrl:
      "https://images.unsplash.com/photo-1504432842672-1a79f78e4084?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80",
    website: "https://google.com/",
    createdAt: "2022-01-06T10:55:06+05:30",
    updatedAt: formatDate(),
  },
];
