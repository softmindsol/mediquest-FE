import Comment from "./Comment";
import ShowComment from "./ShowComment";

const DiscussionDrawer = () => {
  return (
    <div className="">
      <Comment />
      <div className="mt-8">
        <ShowComment />
      </div>
    </div>
  );
};

export default DiscussionDrawer;
