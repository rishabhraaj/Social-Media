import { useContext, useRef } from "react";
import { PostList } from "../store/post-list-store";

const CreatePost = () => {
  const { addPost } = useContext(PostList);

  const userIdElement = useRef();
  const postTitleElement = useRef();
  const postBodyElement = useRef();
  const reactionsElement = useRef();
  const hashtagsElement = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();
    const userId = userIdElement.current.value;
    const postTitle = postTitleElement.current.value;
    const postBody = postBodyElement.current.value;
    const reactions = reactionsElement.current.value;
    const hashtags = hashtagsElement.current.value.split(" ");

    userIdElement.current.value = "";
    postTitleElement.current.value = "";
    postBodyElement.current.value = "";
    reactionsElement.current.value = "";
    hashtagsElement.current.value = "";

    addPost(userId, postTitle, postBody, reactions, hashtags);
  };

  return (
    <form className="create-post" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="userID" className="form-label">
          Enter User Id
        </label>
        <input
          type="text"
          className="form-control"
          id="userId"
          placeholder="Your User ID"
          ref={userIdElement}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="body" className="form-label">
          Post Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          placeholder="How are you feeling today?"
          ref={postTitleElement}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Content
        </label>
        <textarea
          rows="4"
          type="text"
          className="form-control"
          id="title"
          placeholder="Tell us more about it"
          ref={postBodyElement}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="reactions" className="form-label">
          Number of reactions
        </label>
        <input
          type="text"
          className="form-control"
          id="reactions"
          placeholder="How many people reacted to this post?"
          ref={reactionsElement}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="tags" className="form-label">
          HashTags
        </label>
        <input
          type="text"
          className="form-control"
          id="Tags"
          placeholder="Enter you hashtags using space"
          ref={hashtagsElement}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Post
      </button>
    </form>
  );
};

export default CreatePost;
