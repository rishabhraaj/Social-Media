import { createContext, useReducer } from "react";

const DEFAULT_CONTEXT = {
  postList: [],
  addPost: () => {},
  deletePost: () => {},
  addInitialPost: () => {},
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
  } else if (action.type === "ADD_INITIAL_POST") {
    newPostList = action.payload.posts;
  }
  return newPostList;
};
const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, []);

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

  const addInitialPost = (posts) => {
    let newItemAction = {
      type: "ADD_INITIAL_POST",
      payload: {
        posts,
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
    <PostList.Provider
      value={{ postList, addPost, deletePost, addInitialPost }}
    >
      {children}
    </PostList.Provider>
  );
};

export default PostListProvider;
