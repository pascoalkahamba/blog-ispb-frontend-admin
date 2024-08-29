import { useState } from "react";

export default function useReactions(likes: number = 0, unlikes: number = 0) {
  const [reacted, setReacted] = useState({
    like: false,
    unlike: false,
  });
  const [reactions, setReactions] = useState({
    like: likes,
    unlike: unlikes,
  });

  function addLike() {
    setReacted((reacted) => ({ like: !reacted.like, unlike: false }));
    if (reacted.like) {
      setReactions((reactions) => ({
        like: reactions.like++,
        unlike: reactions.unlike,
      }));
    }
    if (!reacted.like) {
      setReactions((reactions) => ({
        like: reactions.like--,
        unlike: reactions.unlike,
      }));
    }
  }

  function addUnlike() {
    setReacted((reacted) => ({
      like: false,
      unlike: !reacted.unlike,
    }));

    if (reacted.unlike) {
      setReactions((reactions) => ({
        like: reactions.like,
        unlike: reactions.unlike++,
      }));
    } else {
      setReactions((reactions) => ({
        like: reactions.like,
        unlike: reactions.unlike--,
      }));
    }
  }

  return { reacted, reactions, addLike, addUnlike };
}
