import { createContext, useReducer } from "react";

const DEFAULT_CONTEXT = {
  postList: [],
  addPost: () => {},
  deletePost: () => {},
};
export const PostList = createContext(DEFAULT_CONTEXT);

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "ADD_POST") {
    newPostList = [action.payload, ...currPostList];
  }
  return newPostList;
};
const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    DEFAULT_POST_LIST
  );

  const addPost = (userId, postTitle, postBody, reactions, hashtags) => {
    let newItemAction = {
      type: "ADD_POST",
      payload: {
        id: Date.now(),
        title: postTitle,
        body: postBody,
        reactions: reactions,
        userId: userId,
        tags: hashtags,
      },
    };
    dispatchPostList(newItemAction);
  };

  const deletePost = (postId) => {
    const newItemAction = {
      type: "DELETE_POST",
      payload: {
        postId,
      },
    };
    dispatchPostList(newItemAction);
  };

  return (
    <PostList.Provider value={{ postList, addPost, deletePost }}>
      {children}
    </PostList.Provider>
  );
};

const DEFAULT_POST_LIST = [
  {
    id: "1",
    title: "Go to Mumbai",
    body: "HI Friends I am going to Mumbai for my vacations. Hope to get out of this  mess!!",
    reaction: 2,
    userId: "user-9",
    tags: ["vacation", "mumbai", "mess"],
  },
  {
    id: "2",
    title: "Pass hogaye bhai",
    body: "4saal ki masti ke bad bhi hogaye hai pass. Hard to beleive!!",
    reaction: 15,
    userId: "user-12",
    tags: ["pass", "college", "masti"],
  },
];

export default PostListProvider;
