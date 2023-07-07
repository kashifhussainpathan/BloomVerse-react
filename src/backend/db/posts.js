import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */
export const posts = [
  {
    _id: uuid(),
    content: "Books are a uniquely portable magic. - Stephen King",
    likes: {
      likeCount: 0,
      likedBy: [],
      dislikedBy: [],
    },
    username: "kashifpathan",
    mediaUrl:
      "https://image.freepik.com/free-photo/portrait-man-reading-book_23-2148228474.jpg",
    createdAt: "2023-06-30T16:13:08+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "I am a museum full of art but you had your eyes shut. 🖤",
    likes: {
      likeCount: 10,
      likedBy: [],
      dislikedBy: [],
    },
    username: "kashifpathan",
    mediaUrl: "",
    createdAt: "2023-06-24T16:13:08+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "A reader lives a thousand lives before he dies. The man who never reads lives only one. - George R.R. Martin",
    likes: {
      likeCount: 20,
      likedBy: [],
      dislikedBy: [],
    },
    username: "kashifpathan",
    mediaUrl: "",
    createdAt: "2023-06-24T16:13:08+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "⌚",
    likes: {
      likeCount: 5,
      likedBy: [],
      dislikedBy: [],
    },
    username: "kashifpathan",
    mediaUrl: "https://pbs.twimg.com/media/FYgBYRKUEAEeFre.jpg",
    createdAt: "2023-06-24T16:13:08+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "Reading time 🌃",
    likes: {
      likeCount: 4,
      likedBy: [],
      dislikedBy: [],
    },
    username: "adarshbalika",
    mediaUrl:
      "https://i.pinimg.com/736x/4f/d8/69/4fd8699a0aab36be9eb048f6e90390a0.jpg",
    createdAt: "2023-06-28T16:13:08+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "The books that the world calls immoral are the books that show the world its own shame. - Oscar Wilde",
    likes: {
      likeCount: 1,
      likedBy: [],
      dislikedBy: [],
    },
    username: "adarshbalika",
    mediaUrl: "",
    createdAt: "2023-06-28T16:13:08+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "The more that you read, the more things you will know. The more that you learn, the more places you'll go. - Dr. Seuss",
    likes: {
      likeCount: 12,
      likedBy: [],
      dislikedBy: [],
    },
    username: "johndoe",
    mediaUrl:
      "https://i.pinimg.com/originals/bd/e3/ee/bde3ee9ccfa8dd5d5fb6a2a34394e507.jpg",
    createdAt: "2023-02-26T16:13:08+05:30",
    updatedAt: formatDate(),
  },

  {
    _id: uuid(),
    content: "There is no friend as loyal as a book. - Ernest Hemingway",
    likes: {
      likeCount: 15,
      likedBy: [],
      dislikedBy: [],
    },
    username: "johndoe",
    mediaUrl: "",
    createdAt: "2023-06-11T16:13:08+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "The only thing you absolutely have to know is the location of the library. - Albert Einstein",
    likes: {
      likeCount: 24,
      likedBy: [],
      dislikedBy: [],
    },
    username: "carlsmith",
    mediaUrl:
      "https://th.bing.com/th/id/R.3b41d5c25e4dcf51de5eb83560da0810?rik=q8DBAUZ5Mf1o0Q&riu=http%3a%2f%2farchitecturesideas.com%2fwp-content%2fuploads%2f2017%2f08%2f8-8.jpg&ehk=TD2sqnvEvHn5U7NebiCXdG0wDhtNc4fD1qUYYeR1Sik%3d&risl=&pid=ImgRaw&r=0",
    createdAt: "2023-03-23T16:13:08+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "The person, be it gentleman or lady, who has not pleasure in a good novel, must be intolerably stupid. - Jane Austen",
    likes: {
      likeCount: 19,
      likedBy: [],
      dislikedBy: [],
    },
    username: "carlsmith",
    mediaUrl: "",
    createdAt: "2023-01-19T16:13:08+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "The book 📕 you don't read won't help. - Jim Rohn",
    likes: {
      likeCount: 6,
      likedBy: [],
      dislikedBy: [],
    },
    username: "alexmaxwell",
    mediaUrl: "",
    createdAt: "2023-04-12T16:13:08+05:30",
    updatedAt: formatDate(),
  },

  {
    _id: uuid(),
    content: "A book is a dream that you hold in your hand. - Neil Gaiman",
    likes: {
      likeCount: 13,
      likedBy: [],
      dislikedBy: [],
    },
    username: "alexmaxwell",
    mediaUrl:
      "https://images.thestarimages.com/kkUZdB-qn7zTRX-LFK_a3tExIJc=/1086x889/smart/filters:cb(1551905881017):format(webp)/https://www.thestar.com/content/dam/thestar/entertainment/television/2019/03/08/neil-gaiman-on-taking-charge-of-american-gods-and-more/gaiman_glasses.jpg",
    createdAt: "2023-05-29T16:13:08+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "A great book should leave you with many experiences, and slightly exhausted at the end. - William Styron",
    likes: {
      likeCount: 17,
      likedBy: [],
      dislikedBy: [],
    },
    username: "janedoe",
    mediaUrl: "",
    createdAt: "2023-05-15T16:13:08+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content: "🙂",
    likes: {
      likeCount: 25,
      likedBy: [],
      dislikedBy: [],
    },
    username: "janedoe",
    mediaUrl:
      "https://i.pinimg.com/736x/62/44/41/62444100ec2a5b35a0d716cdc6994f76.jpg",
    createdAt: "2023-04-28T16:13:08+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "A reader lives a thousand lives before he dies, said Jojen. The man who never reads lives only one. - George R.R. Martin",
    likes: {
      likeCount: 11,
      likedBy: [],
      dislikedBy: [],
    },
    username: "sophiajones",
    mediaUrl: "",
    createdAt: "2023-04-05T16:13:08+05:30",
    updatedAt: formatDate(),
  },
  {
    _id: uuid(),
    content:
      "You can never get a cup of tea large enough or a book long enough to suit me. - C.S. Lewis",
    likes: {
      likeCount: 2,
      likedBy: [],
      dislikedBy: [],
    },
    username: "sophiajones",
    mediaUrl: "",
    createdAt: "2023-06-30T16:13:08+05:30",
    updatedAt: formatDate(),
  },
];
